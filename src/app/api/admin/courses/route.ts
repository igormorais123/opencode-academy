// GET/POST /api/admin/courses - Listar e criar cursos
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Listar todos os cursos
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            modules: true,
            progresses: true,
          },
        },
      },
    })

    return NextResponse.json({
      courses: courses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        price: c.price,
        thumbnail: c.thumbnail,
        published: c.published,
        featured: c.featured,
        modulesCount: c._count.modules,
        studentsCount: c._count.progresses,
        createdAt: c.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Erro ao listar cursos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar cursos' },
      { status: 500 }
    )
  }
}

// POST - Criar novo curso
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { slug, title, description, price, thumbnail, published, featured } = body

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'Slug e título são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se slug já existe
    const existing = await prisma.course.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Já existe um curso com este slug' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        slug,
        title,
        description: description || '',
        price: price || 0,
        thumbnail: thumbnail || null,
        published: published || false,
        featured: featured || false,
      },
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao criar curso' },
      { status: 500 }
    )
  }
}
