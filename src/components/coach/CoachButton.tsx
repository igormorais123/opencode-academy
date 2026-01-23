'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CoachPanel } from './CoachPanel'

interface CoachButtonProps {
  currentModule?: number
  currentLesson?: string
  userOs?: 'windows' | 'mac'
}

export function CoachButton({ currentModule, currentLesson, userOs = 'windows' }: CoachButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botao flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-200",
          "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
        )}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Precisa de ajuda?</span>
      </button>

      {/* Painel do coach */}
      {isOpen && (
        <CoachPanel
          onClose={() => setIsOpen(false)}
          currentModule={currentModule}
          currentLesson={currentLesson}
          userOs={userOs}
        />
      )}
    </>
  )
}
