'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle,
  Play,
  Lock,
} from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  duration: string
  badge: string
  badgeIcon: string
  order: number
  lessons: {
    id: string
    title: string
    order: number
    stepsCount: number
  }[]
}

interface Course {
  id: string
  slug: string
  title: string
  description: string
  modules: Module[]
}

interface UserProgress {
  currentModuleId: string | null
  currentLessonId: string | null
  completedModules: string[]
  completedLessons: string[]
  completedSteps: string[]
  totalTimeMinutes: number
}

export default function LearnDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar curso
        const courseRes = await fetch(`/api/courses/${slug}`)
        if (!courseRes.ok) {
          router.push('/cursos')
          return
        }
        const courseData = await courseRes.json()
        setCourse(courseData.course)
        setHasAccess(courseData.access.hasAccess)
        setProgress(courseData.userProgress)

        if (!courseData.access.hasAccess) {
          router.push(`/cursos/${slug}`)
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

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!course || !hasAccess) {
    return null
  }

  // Calcular progresso
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = progress?.completedLessons?.length || 0
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  // Encontrar próxima lição
  let nextLesson: { moduleId: string; lessonId: string } | null = null
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (!progress?.completedLessons?.includes(lesson.id)) {
        nextLesson = { moduleId: module.id, lessonId: lesson.id }
        break
      }
    }
    if (nextLesson) break
  }

  // Se completou tudo, ir para a primeira lição
  if (!nextLesson && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
    nextLesson = {
      moduleId: course.modules[0].id,
      lessonId: course.modules[0].lessons[0].id,
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/cursos"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Meus Cursos
          </Link>
          <span className="text-sm text-zinc-400">{session?.user?.name}</span>
        </div>
      </header>

      {/* Course Header */}
      <section className="py-6 sm:py-8 px-3 sm:px-4 bg-zinc-900/50">
        <div className="container mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            {course.title}
          </h1>
          <p className="text-zinc-400 mb-4 sm:mb-6 text-sm sm:text-base">{course.description}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                <span>Progresso</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            {nextLesson && (
              <Link href={`/aprender/${slug}/${nextLesson.moduleId}/${nextLesson.lessonId}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {completedLessons > 0 ? 'Continuar' : 'Começar'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{completedLessons} de {totalLessons} lições</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{progress?.totalTimeMinutes || 0} min estudados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="space-y-6">
            {course.modules.map((module, moduleIndex) => {
              const isModuleComplete = module.lessons.every((l) =>
                progress?.completedLessons?.includes(l.id)
              )
              const lessonsComplete = module.lessons.filter((l) =>
                progress?.completedLessons?.includes(l.id)
              ).length

              return (
                <Card key={module.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                            isModuleComplete
                              ? 'bg-emerald-500/20'
                              : 'bg-zinc-800'
                          }`}
                        >
                          {isModuleComplete ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            module.badgeIcon
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-white">
                            Módulo {moduleIndex}: {module.title}
                          </CardTitle>
                          <p className="text-sm text-zinc-400">
                            {lessonsComplete}/{module.lessons.length} lições •{' '}
                            {module.duration}
                          </p>
                        </div>
                      </div>
                      {isModuleComplete && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {module.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isComplete = progress?.completedLessons?.includes(
                          lesson.id
                        )
                        const isCurrent =
                          progress?.currentLessonId === lesson.id

                        return (
                          <Link
                            key={lesson.id}
                            href={`/aprender/${slug}/${module.id}/${lesson.id}`}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              isCurrent
                                ? 'bg-emerald-500/10 border border-emerald-500/30'
                                : 'hover:bg-zinc-800/50'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isComplete
                                  ? 'bg-emerald-500/20'
                                  : 'bg-zinc-800'
                              }`}
                            >
                              {isComplete ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Play className="w-3 h-3 text-zinc-400" />
                              )}
                            </div>
                            <span
                              className={`flex-1 ${
                                isComplete ? 'text-zinc-400' : 'text-zinc-300'
                              }`}
                            >
                              {lesson.title}
                            </span>
                            <span className="text-xs text-zinc-500">
                              {lesson.stepsCount} passos
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
