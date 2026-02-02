'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react'

import CodeBox from '@/components/course/CodeBox'
import StepChecker from '@/components/course/StepChecker'
import TheoryBox from '@/components/course/TheoryBox'
import TipBox from '@/components/course/TipBox'
import WarningBox from '@/components/course/WarningBox'
import { CoachButton } from '@/components/coach/CoachButton'
import { lessonCelebration, microCelebration } from '@/components/course/Confetti'

interface Step {
  id: string
  type: string
  content: string
  codeContent?: string
  options?: { label: string; correct?: boolean }[]
  osSpecific?: string
  order: number
}

interface Lesson {
  id: string
  title: string
  order: number
  steps: Step[]
}

interface Module {
  id: string
  title: string
  description: string
  duration: string
  badge: string
  badgeIcon: string
  order: number
  lessons: Lesson[]
}

interface UserProgress {
  currentModuleId: string | null
  currentLessonId: string | null
  currentStepId: string | null
  completedModules: string[]
  completedLessons: string[]
  completedSteps: string[]
  badges: string[]
  quizScores: Record<string, number>
  totalTimeMinutes: number
}

export default function LessonPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()

  const slug = params.slug as string
  const moduleId = params.moduleId as string
  const lessonId = params.lessonId as string

  const [modules, setModules] = useState<Module[]>([])
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userOs, setUserOs] = useState<'windows' | 'mac'>('windows')

  // Encontrar módulo e lição atual
  const currentModule = useMemo(
    () => modules.find((m) => m.id === moduleId),
    [modules, moduleId]
  )
  const currentLesson = useMemo(
    () => currentModule?.lessons.find((l) => l.id === lessonId),
    [currentModule, lessonId]
  )

  // Filtrar steps por OS
  const filteredSteps = useMemo(() => {
    if (!currentLesson) return []
    return currentLesson.steps.filter((step) => {
      if (!step.osSpecific || step.osSpecific === 'both') return true
      return step.osSpecific === userOs
    })
  }, [currentLesson, userOs])

  // Encontrar próxima e anterior lição
  const { prevLesson, nextLesson } = useMemo(() => {
    let prev: { moduleId: string; lessonId: string } | null = null
    let next: { moduleId: string; lessonId: string } | null = null
    let foundCurrent = false

    for (const mod of modules) {
      for (const les of mod.lessons) {
        if (foundCurrent && !next) {
          next = { moduleId: mod.id, lessonId: les.id }
          break
        }
        if (mod.id === moduleId && les.id === lessonId) {
          foundCurrent = true
        } else if (!foundCurrent) {
          prev = { moduleId: mod.id, lessonId: les.id }
        }
      }
      if (next) break
    }

    return { prevLesson: prev, nextLesson: next }
  }, [modules, moduleId, lessonId])

  // Detectar OS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOs = localStorage.getItem('preferredOs')
      if (savedOs === 'mac' || savedOs === 'windows') {
        setUserOs(savedOs)
      } else if (navigator.platform.toLowerCase().includes('mac')) {
        setUserOs('mac')
      }
    }
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar conteúdo
        const contentRes = await fetch(`/api/courses/${slug}/content`)
        if (!contentRes.ok) {
          if (contentRes.status === 403) {
            router.push(`/cursos/${slug}`)
          }
          return
        }
        const contentData = await contentRes.json()
        setModules(contentData.modules)

        // Buscar progresso
        const progressRes = await fetch(`/api/progress/${slug}`)
        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setProgress(progressData.progress)
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug && status === 'authenticated') {
      fetchData()
    }
  }, [slug, status, router])

  // Atualizar posição atual
  useEffect(() => {
    if (progress && moduleId && lessonId) {
      saveProgress({
        currentModuleId: moduleId,
        currentLessonId: lessonId,
      })
    }
  }, [moduleId, lessonId])

  const saveProgress = async (updates: Partial<UserProgress>) => {
    try {
      const res = await fetch(`/api/progress/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        const data = await res.json()
        setProgress(data.progress)
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error)
    }
  }

  const handleStepComplete = async (stepId: string) => {
    if (!progress) return

    const newCompletedSteps = [...(progress.completedSteps || []), stepId]
    microCelebration()

    await saveProgress({ completedSteps: newCompletedSteps })
  }

  const handleLessonComplete = async () => {
    if (!progress || !lessonId) return

    const newCompletedLessons = [...(progress.completedLessons || []), lessonId]

    // Verificar se completou o módulo
    const allLessonsInModule = currentModule?.lessons.map((l) => l.id) || []
    const allComplete = allLessonsInModule.every(
      (id) => newCompletedLessons.includes(id)
    )

    const updates: Partial<UserProgress> = {
      completedLessons: newCompletedLessons,
    }

    if (allComplete && moduleId) {
      updates.completedModules = [...(progress.completedModules || []), moduleId]
      updates.badges = [
        ...(progress.badges || []),
        currentModule?.badge || '',
      ].filter(Boolean)
    }

    lessonCelebration()
    await saveProgress(updates)

    // Ir para próxima lição ou dashboard
    if (nextLesson) {
      router.push(`/aprender/${slug}/${nextLesson.moduleId}/${nextLesson.lessonId}`)
    } else {
      router.push(`/aprender/${slug}`)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!currentModule || !currentLesson) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Lição não encontrada</p>
      </div>
    )
  }

  // Calcular progresso da lição
  const completedStepsCount = filteredSteps.filter((s) =>
    progress?.completedSteps?.includes(s.id)
  ).length
  const lessonProgress = (completedStepsCount / filteredSteps.length) * 100

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 flex items-center justify-center bg-zinc-800/90 backdrop-blur-sm rounded-[10px] active:bg-zinc-700 transition-colors"
      >
        {sidebarOpen ? (
          <X className="w-[18px] h-[18px] text-white" />
        ) : (
          <Menu className="w-[18px] h-[18px] text-white" />
        )}
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-[280px] sm:w-80 bg-zinc-900 border-r border-zinc-800/60 transform transition-transform duration-300 ease-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-zinc-800/60 safe-top">
          <Link
            href={`/aprender/${slug}`}
            className="flex items-center gap-1.5 text-[#007AFF] text-[15px] font-medium hover:text-[#0062CC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao curso
          </Link>
        </div>

        <div className="p-3 overflow-y-auto h-[calc(100vh-60px)]">
          {modules.map((mod) => (
            <div key={mod.id} className="mb-5">
              <div className="flex items-center gap-2 mb-1.5 px-2">
                <span className="text-[15px]">{mod.badgeIcon}</span>
                <span className="font-semibold text-white text-[13px] uppercase tracking-wide opacity-70">
                  {mod.title}
                </span>
              </div>
              <div className="space-y-0.5 pl-2">
                {mod.lessons.map((les) => {
                  const isComplete = progress?.completedLessons?.includes(les.id)
                  const isCurrent = les.id === lessonId

                  return (
                    <Link
                      key={les.id}
                      href={`/aprender/${slug}/${mod.id}/${les.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 py-2 px-2.5 rounded-[10px] text-[14px] transition-colors ${
                        isCurrent
                          ? 'bg-[#007AFF]/15 text-[#007AFF]'
                          : isComplete
                          ? 'text-zinc-500'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 active:bg-zinc-800'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-[#007AFF] flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-600 flex-shrink-0" />
                      )}
                      <span className="truncate">{les.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 px-4 py-3 safe-top">
          <div className="max-w-3xl mx-auto pl-10 lg:pl-0">
            <div className="flex items-center justify-between mb-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-zinc-500 truncate uppercase tracking-wider font-medium">
                  Módulo {currentModule.order}: {currentModule.title}
                </p>
                <h1 className="text-[16px] sm:text-[18px] font-semibold text-white truncate tracking-tight mt-0.5">
                  {currentLesson.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <button
                  onClick={() => setUserOs(userOs === 'windows' ? 'mac' : 'windows')}
                  className="text-[12px] px-2.5 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white active:bg-zinc-700 transition-colors"
                >
                  {userOs === 'windows' ? '🪟 Win' : '🍎 Mac'}
                </button>
              </div>
            </div>
            <Progress value={lessonProgress} className="h-[3px]" />
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8 pb-32">
          <div className="space-y-6">
            {filteredSteps.map((step) => {
              const isComplete = progress?.completedSteps?.includes(step.id)

              return (
                <div
                  key={step.id}
                  className={`transition-opacity ${
                    isComplete ? 'opacity-60' : 'opacity-100'
                  }`}
                >
                  {step.type === 'text' && (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-zinc-300 whitespace-pre-line">
                        {step.content}
                      </p>
                    </div>
                  )}

                  {step.type === 'code' && (
                    <CodeBox
                      code={step.codeContent || ''}
                      description={step.content}
                    />
                  )}

                  {step.type === 'tip' && <TipBox content={step.content} />}

                  {step.type === 'warning' && (
                    <WarningBox content={step.content} />
                  )}

                  {step.type === 'theory' && (
                    <TheoryBox content={step.content} />
                  )}

                  {step.type === 'checker' && (
                    <StepChecker
                      content={step.content}
                      isComplete={isComplete}
                      onSuccess={() => handleStepComplete(step.id)}
                    />
                  )}

                  {step.type === 'quiz' && step.options && (
                    <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                      <p className="text-white font-medium mb-4">{step.content}</p>
                      <div className="space-y-2">
                        {step.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (option.correct) {
                                handleStepComplete(step.id)
                              }
                            }}
                            className="w-full text-left p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="mt-10 sm:mt-14 flex items-center justify-between gap-3 safe-bottom pb-4">
            {prevLesson ? (
              <Link
                href={`/aprender/${slug}/${prevLesson.moduleId}/${prevLesson.lessonId}`}
              >
                <Button variant="outline" className="h-11 sm:h-12 text-[14px] sm:text-[15px] rounded-[12px] border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 active:bg-zinc-800 transition-all">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Ant.</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Button
              onClick={handleLessonComplete}
              className="h-11 sm:h-12 text-[14px] sm:text-[15px] font-semibold rounded-[12px] bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#004EA6] active:scale-[0.98] shadow-[0_2px_8px_rgba(0,122,255,0.3)] transition-all duration-200"
            >
              {nextLesson ? (
                <>
                  <span className="hidden sm:inline">Próxima Lição</span>
                  <span className="sm:hidden">Próxima</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Concluir Curso</span>
                  <span className="sm:hidden">Concluir</span>
                  <CheckCircle className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Coach Button */}
      <CoachButton
        currentModule={currentModule.order}
        currentLesson={currentLesson.title}
        userOs={userOs}
        courseSlug={slug}
      />
    </div>
  )
}
