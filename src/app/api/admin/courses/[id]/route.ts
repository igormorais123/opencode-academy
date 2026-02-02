// GET/PATCH/DELETE /api/admin/courses/[id] - Operações em curso específico
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Buscar curso por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
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

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Erro ao buscar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar curso' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar curso
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { slug, title, description, price, thumbnail, published, featured } = body

    // Verificar se curso existe
    const existing = await prisma.course.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Verificar se novo slug já existe (se estiver sendo alterado)
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Já existe um curso com este slug' },
          { status: 400 }
        )
      }
    }

    // Preparar dados para update
    const updateData: Record<string, unknown> = {}
    if (slug !== undefined) updateData.slug = slug
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = price
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail
    if (published !== undefined) updateData.published = published
    if (featured !== undefined) updateData.featured = featured

    const course = await prisma.course.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Erro ao atualizar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar curso' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar curso
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Verificar se existe
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        _count: {
          select: { purchases: true },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Verificar se tem compras
    if (course._count.purchases > 0) {
      return NextResponse.json(
        { error: 'Não é possível deletar um curso com compras. Despublique-o.' },
        { status: 400 }
      )
    }

    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar curso' },
      { status: 500 }
    )
  }
}
