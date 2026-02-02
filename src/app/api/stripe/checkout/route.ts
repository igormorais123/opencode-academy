// POST /api/stripe/checkout - Criar sessao de checkout Stripe
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, isStripeConfigured } from '@/lib/stripe'
import { hasAccessToCourse } from '@/lib/access'

export async function POST(request: NextRequest) {
  try {
    // Verificar se Stripe esta configurado
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json(
        { error: 'Pagamentos não estão configurados' },
        { status: 503 }
      )
    }

    // Verificar autenticacao
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const userId = session.user.id
    const userEmail = session.user.email
    const body = await request.json()
    const { courseSlug } = body

    if (!courseSlug) {
      return NextResponse.json(
        { error: 'courseSlug é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar curso
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
    })

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 })
    }

    if (!course.published) {
      return NextResponse.json(
        { error: 'Curso não está disponível' },
        { status: 400 }
      )
    }

    if (course.price === 0) {
      return NextResponse.json(
        { error: 'Este curso é gratuito' },
        { status: 400 }
      )
    }

    // Verificar se ja tem acesso
    const access = await hasAccessToCourse(userId, course.id)
    if (access.hasAccess) {
      return NextResponse.json(
        { error: 'Você já tem acesso a este curso' },
        { status: 400 }
      )
    }

    // Verificar se ja tem uma compra pendente
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    })

    if (existingPurchase?.status === 'completed') {
      return NextResponse.json(
        { error: 'Você já comprou este curso' },
        { status: 400 }
      )
    }

    // Criar sessao de checkout Stripe
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: course.title,
              description: course.description,
              images: course.thumbnail ? [course.thumbnail] : [],
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        courseId: course.id,
        courseSlug: course.slug,
      },
      success_url: `${baseUrl}/cursos/${course.slug}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cursos/${course.slug}`,
    })

    // Criar ou atualizar registro de compra
    await prisma.purchase.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
      update: {
        stripeSessionId: checkoutSession.id,
        amount: course.price,
        status: 'pending',
      },
      create: {
        userId,
        courseId: course.id,
        stripeSessionId: checkoutSession.id,
        amount: course.price,
        status: 'pending',
      },
    })

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao criar checkout' },
      { status: 500 }
    )
  }
}
