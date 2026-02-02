// GET /api/admin/stats - Estatísticas do dashboard
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar estatísticas
    const [
      totalCourses,
      publishedCourses,
      totalStudents,
      totalRevenueResult,
      recentPurchases,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { published: true } }),
      prisma.user.count(),
      prisma.purchase.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
      }),
      prisma.purchase.findMany({
        where: { status: 'completed' },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          course: { select: { title: true } },
        },
      }),
    ])

    return NextResponse.json({
      totalCourses,
      publishedCourses,
      totalStudents,
      totalRevenue: totalRevenueResult._sum.amount || 0,
      recentPurchases: recentPurchases.map((p) => ({
        id: p.id,
        userName: p.user.name || p.user.email,
        courseTitle: p.course.title,
        amount: p.amount,
        createdAt: p.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Erro ao buscar stats:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}
