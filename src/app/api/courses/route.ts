// GET /api/courses - Listar cursos publicados
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getUserAccessibleCourses } from '@/lib/access'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    // Buscar cursos publicados
    const courses = await prisma.course.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: {
        _count: {
          select: {
            modules: true,
          },
        },
        modules: {
          select: {
            duration: true,
          },
        },
      },
    })

    // Verificar acesso do usuario
    const accessibleIds = await getUserAccessibleCourses(userId)

    // Formatar resposta
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: course.thumbnail,
      featured: course.featured,
      modulesCount: course._count.modules,
      // Calcular duracao total estimada
      totalDuration: course.modules.reduce((acc, m) => {
        const match = m.duration.match(/(\d+)/)
        return acc + (match ? parseInt(match[1]) : 0)
      }, 0),
      hasAccess: accessibleIds.includes(course.id),
      isFree: course.price === 0,
    }))

    return NextResponse.json({ courses: formattedCourses })
  } catch (error) {
    console.error('Erro ao listar cursos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar cursos' },
      { status: 500 }
    )
  }
}
