// GET/POST /api/progress/[slug] - Progresso do usuario em um curso
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hasAccessToCourse } from '@/lib/access'

interface RouteParams {
  params: Promise<{ slug: string }>
}

// GET - Buscar progresso
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const userId = session.user.id

    // Buscar curso
    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Buscar progresso
    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    })

    if (!progress) {
      return NextResponse.json({
        progress: {
          currentModuleId: null,
          currentLessonId: null,
          currentStepId: null,
          completedModules: [],
          completedLessons: [],
          completedSteps: [],
          badges: [],
          quizScores: {},
          totalTimeMinutes: 0,
        },
      })
    }

    return NextResponse.json({
      progress: {
        currentModuleId: progress.currentModuleId,
        currentLessonId: progress.currentLessonId,
        currentStepId: progress.currentStepId,
        completedModules: JSON.parse(progress.completedModules),
        completedLessons: JSON.parse(progress.completedLessons),
        completedSteps: JSON.parse(progress.completedSteps),
        badges: JSON.parse(progress.badges),
        quizScores: JSON.parse(progress.quizScores),
        totalTimeMinutes: progress.totalTimeMinutes,
        lastActivityAt: progress.lastActivityAt,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar progresso:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar progresso' },
      { status: 500 }
    )
  }
}

// POST - Atualizar progresso
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()

    // Buscar curso
    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    // Verificar acesso
    const access = await hasAccessToCourse(userId, course.id)
    if (!access.hasAccess) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // Preparar dados para upsert
    const updateData: {
      currentModuleId?: string
      currentLessonId?: string
      currentStepId?: string
      completedModules?: string
      completedLessons?: string
      completedSteps?: string
      badges?: string
      quizScores?: string
      totalTimeMinutes?: number
      lastActivityAt: Date
    } = {
      lastActivityAt: new Date(),
    }

    if (body.currentModuleId !== undefined) {
      updateData.currentModuleId = body.currentModuleId
    }
    if (body.currentLessonId !== undefined) {
      updateData.currentLessonId = body.currentLessonId
    }
    if (body.currentStepId !== undefined) {
      updateData.currentStepId = body.currentStepId
    }
    if (body.completedModules !== undefined) {
      updateData.completedModules = JSON.stringify(body.completedModules)
    }
    if (body.completedLessons !== undefined) {
      updateData.completedLessons = JSON.stringify(body.completedLessons)
    }
    if (body.completedSteps !== undefined) {
      updateData.completedSteps = JSON.stringify(body.completedSteps)
    }
    if (body.badges !== undefined) {
      updateData.badges = JSON.stringify(body.badges)
    }
    if (body.quizScores !== undefined) {
      updateData.quizScores = JSON.stringify(body.quizScores)
    }
    if (body.totalTimeMinutes !== undefined) {
      updateData.totalTimeMinutes = body.totalTimeMinutes
    }

    // Upsert progresso
    const progress = await prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
      update: updateData,
      create: {
        userId,
        courseId: course.id,
        currentModuleId: body.currentModuleId || null,
        currentLessonId: body.currentLessonId || null,
        currentStepId: body.currentStepId || null,
        completedModules: JSON.stringify(body.completedModules || []),
        completedLessons: JSON.stringify(body.completedLessons || []),
        completedSteps: JSON.stringify(body.completedSteps || []),
        badges: JSON.stringify(body.badges || []),
        quizScores: JSON.stringify(body.quizScores || {}),
        totalTimeMinutes: body.totalTimeMinutes || 0,
      },
    })

    return NextResponse.json({
      success: true,
      progress: {
        currentModuleId: progress.currentModuleId,
        currentLessonId: progress.currentLessonId,
        currentStepId: progress.currentStepId,
        completedModules: JSON.parse(progress.completedModules),
        completedLessons: JSON.parse(progress.completedLessons),
        completedSteps: JSON.parse(progress.completedSteps),
        badges: JSON.parse(progress.badges),
        quizScores: JSON.parse(progress.quizScores),
        totalTimeMinutes: progress.totalTimeMinutes,
        lastActivityAt: progress.lastActivityAt,
      },
    })
  } catch (error) {
    console.error('Erro ao salvar progresso:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar progresso' },
      { status: 500 }
    )
  }
}
