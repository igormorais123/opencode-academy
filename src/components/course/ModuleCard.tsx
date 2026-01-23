'use client'

import Link from 'next/link'
import { Lock, CheckCircle, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModuleCardProps {
  id: number
  title: string
  description: string
  duration: string
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  progress?: number
  className?: string
}

export function ModuleCard({ 
  id, 
  title, 
  description, 
  duration,
  status, 
  progress = 0,
  className 
}: ModuleCardProps) {
  const isLocked = status === 'locked'
  
  const statusConfig = {
    locked: {
      icon: Lock,
      badge: 'Bloqueado',
      badgeClass: 'bg-gray-100 text-gray-500',
    },
    available: {
      icon: Play,
      badge: 'Disponivel',
      badgeClass: 'bg-blue-100 text-blue-700',
    },
    in_progress: {
      icon: Play,
      badge: 'Em andamento',
      badgeClass: 'bg-orange-100 text-orange-700',
    },
    completed: {
      icon: CheckCircle,
      badge: 'Concluido',
      badgeClass: 'bg-green-100 text-green-700',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  const content = (
    <div className={cn(
      "relative p-6 rounded-2xl border-2 transition-all duration-200",
      isLocked 
        ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg cursor-pointer",
      className
    )}>
      {/* Badge de status */}
      <div className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4",
        config.badgeClass
      )}>
        <Icon className="w-4 h-4" />
        {config.badge}
      </div>

      {/* Numero e titulo */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
          {id}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-1">{description}</p>
          <p className="text-sm text-gray-400 mt-2">{duration}</p>
        </div>
      </div>

      {/* Barra de progresso */}
      {(status === 'in_progress' || status === 'completed') && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                status === 'completed' ? "bg-green-500" : "bg-blue-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return content
  }

  return (
    <Link href={`/curso/modulo/${id}`}>
      {content}
    </Link>
  )
}
