// GET /api/courses/[slug] - Detalhes do curso
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

    // Buscar curso com modulos
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                order: true,
                _count: {
                  select: { steps: true },
                },
              },
            },
          },
        },
        _count: {
          select: {
            purchases: true,
            progresses: true,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Verificar acesso
    const access = await hasAccessToCourse(userId, course.id)

    // Buscar progresso do usuario se logado
    let userProgress = null
    if (userId) {
      const progress = await prisma.courseProgress.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          },
        },
      })
      if (progress) {
        userProgress = {
          currentModuleId: progress.currentModuleId,
          currentLessonId: progress.currentLessonId,
          completedModules: JSON.parse(progress.completedModules),
          completedLessons: JSON.parse(progress.completedLessons),
          completedSteps: JSON.parse(progress.completedSteps),
          totalTimeMinutes: progress.totalTimeMinutes,
        }
      }
    }

    // Calcular estatisticas
    const totalLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.length,
      0
    )
    const totalSteps = course.modules.reduce(
      (acc, m) =>
        acc + m.lessons.reduce((acc2, l) => acc2 + l._count.steps, 0),
      0
    )

    return NextResponse.json({
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnail: course.thumbnail,
        published: course.published,
        featured: course.featured,
        stats: {
          modules: course.modules.length,
          lessons: totalLessons,
          steps: totalSteps,
          students: course._count.progresses,
        },
        modules: course.modules.map((m) => ({
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
            stepsCount: l._count.steps,
          })),
        })),
      },
      access: {
        hasAccess: access.hasAccess,
        reason: access.reason,
      },
      userProgress,
    })
  } catch (error) {
    console.error('Erro ao buscar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar curso' },
      { status: 500 }
    )
  }
}
