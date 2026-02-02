// API para migrar conteudo para o banco de dados
// Acesse: http://localhost:3000/api/admin/seed
// APENAS para administradores

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { modules } from '@/content/modules'
import { claudeCodeModules } from '@/content/claude-code-modules'
import type { Module } from '@/content/modules'

async function seedCourse(
  slug: string,
  title: string,
  description: string,
  price: number,
  courseModules: Module[],
  published: boolean = true,
  featured: boolean = true
) {
  console.log(`📚 Criando curso ${title}...`)

  const course = await prisma.course.upsert({
    where: { slug },
    update: { title, description, price, published, featured },
    create: { slug, title, description, price, published, featured },
  })

  console.log(`✅ Curso criado: ${course.title} (${course.id})\n`)

  // Limpar módulos existentes
  console.log('🧹 Limpando módulos existentes...')
  await prisma.courseModule.deleteMany({
    where: { courseId: course.id },
  })

  // Criar módulos, lições e steps
  console.log('📝 Criando módulos, lições e steps...\n')

  for (const moduleData of courseModules) {
    console.log(`  📦 Módulo ${moduleData.id}: ${moduleData.title}`)

    const courseModule = await prisma.courseModule.create({
      data: {
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        duration: moduleData.duration,
        badge: moduleData.badge,
        badgeIcon: moduleData.badgeIcon,
        order: moduleData.id,
      },
    })

    for (let lessonIndex = 0; lessonIndex < moduleData.lessons.length; lessonIndex++) {
      const lessonData = moduleData.lessons[lessonIndex]
      console.log(`    📄 Lição ${lessonData.id}: ${lessonData.title}`)

      const lesson = await prisma.lesson.create({
        data: {
          moduleId: courseModule.id,
          title: lessonData.title,
          order: lessonIndex,
        },
      })

      for (let stepIndex = 0; stepIndex < lessonData.steps.length; stepIndex++) {
        const stepData = lessonData.steps[stepIndex]

        await prisma.step.create({
          data: {
            lessonId: lesson.id,
            type: stepData.type,
            content: stepData.content,
            codeContent: stepData.codeContent || null,
            options: stepData.options ? JSON.stringify(stepData.options) : null,
            osSpecific: stepData.osSpecific || null,
            order: stepIndex,
          },
        })
      }
    }
  }

  const stats = {
    modules: await prisma.courseModule.count({ where: { courseId: course.id } }),
    lessons: await prisma.lesson.count({
      where: { module: { courseId: course.id } },
    }),
    steps: await prisma.step.count({
      where: { lesson: { module: { courseId: course.id } } },
    }),
  }

  return { course, stats }
}

export async function POST(request: Request) {
  try {
    // Verificar se é admin (sessão ou seed secret)
    const authHeader = request.headers.get('authorization')
    const seedSecret = process.env.SEED_SECRET
    const isSecretAuth = seedSecret && authHeader === `Bearer ${seedSecret}`

    if (!isSecretAuth) {
      const session = await getServerSession(authOptions)
      if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
      }
    }

    console.log('🚀 Iniciando migração de conteúdo...\n')

    // Seed OpenCode Academy
    const opencode = await seedCourse(
      'opencode-academy',
      'OpenCode Academy',
      'Aprenda a usar IA no terminal para automatizar seu trabalho. Curso completo para não-programadores.',
      0,
      modules
    )

    // Seed Claude Code
    const claudeCode = await seedCourse(
      'claude-code',
      'Claude Code',
      'Aprenda a programar com o Claude Code, a ferramenta de IA da Anthropic que trabalha direto no seu terminal.',
      0,
      claudeCodeModules
    )

    console.log('\n✨ Migração concluída!')

    return NextResponse.json({
      success: true,
      message: 'Migração concluída com sucesso!',
      courses: [
        { id: opencode.course.id, title: opencode.course.title, slug: opencode.course.slug, stats: opencode.stats },
        { id: claudeCode.course.id, title: claudeCode.course.title, slug: claudeCode.course.slug, stats: claudeCode.stats },
      ],
    })
  } catch (error) {
    console.error('❌ Erro na migração:', error)
    return NextResponse.json(
      { error: 'Erro na migração', details: String(error) },
      { status: 500 }
    )
  }
}

// GET para verificar status
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            modules: true,
            purchases: true,
            progresses: true,
          },
        },
      },
    })

    return NextResponse.json({
      courses: courses.map((course) => ({
        id: course.id,
        slug: course.slug,
        title: course.title,
        published: course.published,
        modules: course._count.modules,
        purchases: course._count.purchases,
        students: course._count.progresses,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar cursos', details: String(error) },
      { status: 500 }
    )
  }
}
