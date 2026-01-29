'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Loader2,
  RefreshCw,
} from 'lucide-react'

interface Stats {
  totalCourses: number
  publishedCourses: number
  totalStudents: number
  totalRevenue: number
  recentPurchases: {
    id: string
    userName: string
    courseTitle: string
    amount: number
    createdAt: string
  }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erro ao buscar stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSeed = async () => {
    if (!confirm('Migrar conteúdo do modules.ts para o banco?')) return

    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        alert(`Migração concluída!\n\nMódulos: ${data.stats.modules}\nLições: ${data.stats.lessons}\nSteps: ${data.stats.steps}`)
        fetchStats()
      } else {
        alert('Erro: ' + data.error)
      }
    } catch (error) {
      alert('Erro ao migrar: ' + error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 text-sm sm:text-base">Visão geral da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <RefreshCw className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Atualizar</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleSeed}>
            <span className="hidden sm:inline">Migrar Conteúdo</span>
            <span className="sm:hidden">Migrar</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total de Cursos
            </CardTitle>
            <BookOpen className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.totalCourses || 0}
            </div>
            <p className="text-xs text-zinc-500">
              {stats?.publishedCourses || 0} publicados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total de Alunos
            </CardTitle>
            <Users className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats?.totalStudents || 0}
            </div>
            <p className="text-xs text-zinc-500">usuários cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Receita Total
            </CardTitle>
            <DollarSign className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format((stats?.totalRevenue || 0) / 100)}
            </div>
            <p className="text-xs text-zinc-500">de vendas</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Taxa de Conclusão
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">-</div>
            <p className="text-xs text-zinc-500">em breve</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Compras Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentPurchases && stats.recentPurchases.length > 0 ? (
            <div className="space-y-4">
              {stats.recentPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                >
                  <div>
                    <p className="font-medium text-white">{purchase.userName}</p>
                    <p className="text-sm text-zinc-400">{purchase.courseTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-emerald-400">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(purchase.amount / 100)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(purchase.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400 text-center py-8">
              Nenhuma compra ainda
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
