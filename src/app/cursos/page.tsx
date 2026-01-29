'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Users, Star, ArrowRight, Loader2 } from 'lucide-react'

interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  thumbnail: string | null
  featured: boolean
  modulesCount: number
  totalDuration: number
  hasAccess: boolean
  isFree: boolean
}

function formatPrice(priceInCents: number): string {
  if (priceInCents === 0) return 'Gratuito'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100)
}

export default function CatalogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses')
        const data = await res.json()
        setCourses(data.courses || [])
      } catch (error) {
        console.error('Erro ao buscar cursos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-bold text-white">
            INTEIA Academy
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            {status === 'authenticated' ? (
              <Link href="/cursos">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  Meus Cursos
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" className="text-xs sm:text-sm">Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 sm:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Aprenda com os melhores cursos
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Cursos práticos e direto ao ponto para você dominar novas habilidades
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-12 sm:pb-16 px-3 sm:px-4">
        <div className="container mx-auto">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">Nenhum curso disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-zinc-800">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-zinc-600" />
                      </div>
                    )}
                    {course.featured && (
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
                      </Badge>
                    )}
                    {course.hasAccess && (
                      <Badge className="absolute top-3 left-3 bg-emerald-500 text-white">
                        Adquirido
                      </Badge>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-white">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.modulesCount} módulos
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ~{course.totalDuration} min
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div className="text-lg font-bold text-white">
                      {course.isFree ? (
                        <span className="text-emerald-400">Gratuito</span>
                      ) : (
                        formatPrice(course.price)
                      )}
                    </div>
                    {course.hasAccess ? (
                      <Link href={`/aprender/${course.slug}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Continuar
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/cursos/${course.slug}`}>
                        <Button variant="outline">
                          Ver Curso
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
