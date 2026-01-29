'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lock,
  Play,
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
  price: number
  thumbnail: string | null
  published: boolean
  featured: boolean
  stats: {
    modules: number
    lessons: number
    steps: number
    students: number
  }
  modules: Module[]
}

interface AccessInfo {
  hasAccess: boolean
  reason: string
}

function formatPrice(priceInCents: number): string {
  if (priceInCents === 0) return 'Gratuito'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100)
}

export default function CoursePage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [access, setAccess] = useState<AccessInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            router.push('/cursos')
            return
          }
          throw new Error('Erro ao buscar curso')
        }
        const data = await res.json()
        setCourse(data.course)
        setAccess(data.access)
      } catch (error) {
        console.error('Erro ao buscar curso:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCourse()
    }
  }, [slug, router])

  const handlePurchase = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setPurchasing(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug: slug }),
      })

      const data = await res.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert(data.error || 'Erro ao criar checkout')
      }
    } catch (error) {
      console.error('Erro ao iniciar compra:', error)
      alert('Erro ao iniciar compra')
    } finally {
      setPurchasing(false)
    }
  }

  const handleStartLearning = () => {
    router.push(`/aprender/${slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Curso não encontrado</p>
      </div>
    )
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
            Voltar ao catálogo
          </Link>
          {authStatus === 'authenticated' ? (
            <span className="text-sm text-zinc-400">{session?.user?.name}</span>
          ) : (
            <Link href="/login">
              <Button size="sm">Entrar</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                {course.price === 0 && (
                  <Badge className="bg-emerald-500 text-white">Gratuito</Badge>
                )}
                {course.featured && (
                  <Badge className="bg-amber-500 text-black">Destaque</Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 mb-4 sm:mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  <span>{course.stats.modules} módulos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-emerald-500" />
                  <span>{course.stats.lessons} lições</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span>{course.stats.students} alunos</span>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {formatPrice(course.price)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {access?.hasAccess ? (
                    <Button
                      onClick={handleStartLearning}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      Continuar Aprendendo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : course.price === 0 ? (
                    <Button
                      onClick={handleStartLearning}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      Começar Agora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePurchase}
                      disabled={purchasing}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      {purchasing ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Lock className="w-4 h-4 mr-2" />
                      )}
                      {purchasing ? 'Processando...' : 'Comprar Curso'}
                    </Button>
                  )}

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Acesso vitalício
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Certificado de conclusão
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Suporte via Coach IA
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Conteúdo do Curso
          </h2>

          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <Card key={module.id} className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg">
                        {module.badgeIcon}
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          Módulo {index}: {module.title}
                        </CardTitle>
                        <p className="text-sm text-zinc-400">
                          {module.lessons.length} lições • {module.duration}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-zinc-400">
                      {module.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 mb-4">{module.description}</p>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50"
                      >
                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                          {lessonIndex + 1}
                        </div>
                        <span className="text-zinc-300">{lesson.title}</span>
                        <span className="text-xs text-zinc-500 ml-auto">
                          {lesson.stepsCount} passos
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
