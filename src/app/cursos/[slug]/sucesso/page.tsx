'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight, Loader2, PartyPopper } from 'lucide-react'
import { lessonCelebration } from '@/components/course/Confetti'

export default function SuccessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const slug = params.slug as string
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [courseTitle, setCourseTitle] = useState('')

  useEffect(() => {
    // Disparar confetti
    lessonCelebration()

    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setCourseTitle(data.course.title)
        }
      } catch (error) {
        console.error('Erro ao buscar curso:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [slug])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <PartyPopper className="w-10 h-10 text-emerald-500" />
          </div>
          <CardTitle className="text-2xl text-white">
            Compra Confirmada!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-zinc-400">
            Parabéns! Você agora tem acesso completo ao curso{' '}
            <span className="text-white font-semibold">{courseTitle}</span>.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-zinc-300">Acesso vitalício liberado</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-zinc-300">Todo o conteúdo disponível</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-zinc-300">Suporte via Coach IA</span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Link href={`/aprender/${slug}`} className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                Começar a Aprender
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/cursos" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Ver Outros Cursos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
