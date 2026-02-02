// POST /api/stripe/webhook - Processar eventos do Stripe
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// Desabilitar body parser padrao do Next.js para webhooks
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe não configurado' },
      { status: 503 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET não configurada')
    return NextResponse.json(
      { error: 'Webhook não configurado' },
      { status: 503 }
    )
  }

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Assinatura ausente' },
        { status: 400 }
      )
    }

    // Verificar assinatura do webhook
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Erro ao verificar assinatura:', err)
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 400 }
      )
    }

    // Processar eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        const { userId, courseId } = session.metadata || {}

        if (!userId || !courseId) {
          console.error('Metadata incompleta:', session.metadata)
          break
        }

        // Atualizar compra para completada
        await prisma.purchase.update({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
          data: {
            status: 'completed',
            stripePaymentId: session.payment_intent as string,
          },
        })

        // Criar progresso inicial
        await prisma.courseProgress.upsert({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
          update: {},
          create: {
            userId,
            courseId,
          },
        })

        console.log(`✅ Compra completada: User ${userId}, Course ${courseId}`)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session

        const { userId, courseId } = session.metadata || {}

        if (userId && courseId) {
          // Marcar compra como expirada/falha
          await prisma.purchase.update({
            where: {
              userId_courseId: {
                userId,
                courseId,
              },
            },
            data: {
              status: 'failed',
            },
          })

          console.log(`⚠️ Checkout expirado: User ${userId}, Course ${courseId}`)
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntent = charge.payment_intent as string

        if (paymentIntent) {
          // Buscar compra pelo payment intent
          const purchase = await prisma.purchase.findFirst({
            where: { stripePaymentId: paymentIntent },
          })

          if (purchase) {
            await prisma.purchase.update({
              where: { id: purchase.id },
              data: { status: 'refunded' },
            })

            console.log(`💰 Reembolso processado: ${purchase.id}`)
          }
        }
        break
      }

      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}
