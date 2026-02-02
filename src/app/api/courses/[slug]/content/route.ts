// GET /api/courses/[slug]/content - Conteudo completo do curso (com verificacao de acesso)
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hasAccessToCourse } from '@/lib/access'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    // Buscar curso
    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true, title: true, published: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Verificar acesso
    const access = await hasAccessToCourse(userId, course.id)

    if (!access.hasAccess) {
      return NextResponse.json(
        {
          error: 'Acesso negado',
          message: 'Você precisa adquirir este curso para acessar o conteúdo.',
          courseId: course.id,
        },
        { status: 403 }
      )
    }

    // Buscar conteudo completo
    const modules = await prisma.courseModule.findMany({
      where: { courseId: course.id },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            steps: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    })

    // Formatar resposta
    const formattedModules = modules.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      duration: m.duration,
      badge: m.badge,
      badgeIcon: m.badgeIcon,
      order: m.order,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        order: l.order,
        steps: l.steps.map((s) => ({
          id: s.id,
          type: s.type,
          content: s.content,
          codeContent: s.codeContent,
          options: s.options ? JSON.parse(s.options) : null,
          osSpecific: s.osSpecific,
          order: s.order,
        })),
      })),
    }))

    return NextResponse.json({
      courseId: course.id,
      courseTitle: course.title,
      modules: formattedModules,
    })
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar conteúdo' },
      { status: 500 }
    )
  }
}
