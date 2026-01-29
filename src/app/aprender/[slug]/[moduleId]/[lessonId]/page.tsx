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
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-zinc-800 rounded-lg"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-[280px] sm:w-80 bg-zinc-900 border-r border-zinc-800 transform transition-transform lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-zinc-800">
          <Link
            href={`/aprender/${slug}`}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao curso
          </Link>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          {modules.map((mod) => (
            <div key={mod.id} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{mod.badgeIcon}</span>
                <span className="font-medium text-white text-sm">
                  {mod.title}
                </span>
              </div>
              <div className="space-y-1 pl-6">
                {mod.lessons.map((les) => {
                  const isComplete = progress?.completedLessons?.includes(les.id)
                  const isCurrent = les.id === lessonId

                  return (
                    <Link
                      key={les.id}
                      href={`/aprender/${slug}/${mod.id}/${les.id}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2 py-1.5 px-2 rounded text-sm transition-colors ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isComplete
                          ? 'text-zinc-500'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-zinc-600" />
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
        <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur border-b border-zinc-800 p-3 sm:p-4">
          <div className="max-w-3xl mx-auto pl-10 lg:pl-0">
            <div className="flex items-center justify-between mb-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500 truncate">
                  Módulo {currentModule.order}: {currentModule.title}
                </p>
                <h1 className="text-base sm:text-lg font-semibold text-white truncate">
                  {currentLesson.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <button
                  onClick={() => setUserOs(userOs === 'windows' ? 'mac' : 'windows')}
                  className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  {userOs === 'windows' ? '🪟 Win' : '🍎 Mac'}
                </button>
              </div>
            </div>
            <Progress value={lessonProgress} className="h-1" />
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
          <div className="mt-8 sm:mt-12 flex items-center justify-between gap-3">
            {prevLesson ? (
              <Link
                href={`/aprender/${slug}/${prevLesson.moduleId}/${prevLesson.lessonId}`}
              >
                <Button variant="outline" className="text-sm sm:text-base">
                  <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Ant.</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Button
              onClick={handleLessonComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-sm sm:text-base"
            >
              {nextLesson ? (
                <>
                  <span className="hidden sm:inline">Próxima Lição</span>
                  <span className="sm:hidden">Próxima</span>
                  <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Concluir Curso</span>
                  <span className="sm:hidden">Concluir</span>
                  <CheckCircle className="w-4 h-4 ml-1 sm:ml-2" />
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
      />
    </div>
  )
}
