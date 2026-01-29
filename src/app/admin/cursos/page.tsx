'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Loader2,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  published: boolean
  featured: boolean
  modulesCount: number
  studentsCount: number
  createdAt: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses')
      if (res.ok) {
        const data = await res.json()
        setCourses(data.courses)
      }
    } catch (error) {
      console.error('Erro ao buscar cursos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleTogglePublish = async (courseId: string, published: boolean) => {
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      })
      if (res.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error('Erro ao atualizar curso:', error)
    }
  }

  const handleDelete = async (courseId: string, title: string) => {
    if (!confirm(`Deletar o curso "${title}"? Esta ação não pode ser desfeita.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error('Erro ao deletar curso:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Cursos</h1>
          <p className="text-zinc-400 text-sm sm:text-base">Gerencie os cursos da plataforma</p>
        </div>
        <Link href="/admin/cursos/novo">
          <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Curso
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="py-12 text-center">
            <p className="text-zinc-400 mb-4">Nenhum curso cadastrado</p>
            <Link href="/admin/cursos/novo">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Criar Primeiro Curso
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {course.title}
                      </h3>
                      {course.featured && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          Destaque
                        </Badge>
                      )}
                      <Badge
                        className={
                          course.published
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-zinc-700 text-zinc-400 border-zinc-600'
                        }
                      >
                        {course.published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>{course.modulesCount} módulos</span>
                      <span>{course.studentsCount} alunos</span>
                      <span>
                        {course.price === 0
                          ? 'Gratuito'
                          : new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(course.price / 100)}
                      </span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/cursos/${course.id}`}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTogglePublish(course.id, course.published)}
                        className="flex items-center gap-2"
                      >
                        {course.published ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Despublicar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publicar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id, course.title)}
                        className="flex items-center gap-2 text-red-400 focus:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
