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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40",
            "flex items-center justify-center gap-2",
            "w-14 h-14 sm:w-auto sm:h-auto sm:px-5 sm:py-3",
            "rounded-full shadow-[0_2px_12px_rgba(0,122,255,0.35)]",
            "bg-[#007AFF] text-white",
            "hover:bg-[#0062CC] active:bg-[#004EA6] active:scale-95",
            "transition-all duration-200 safe-bottom"
          )}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-[15px] hidden sm:inline">Precisa de ajuda?</span>
        </button>
      )}

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
