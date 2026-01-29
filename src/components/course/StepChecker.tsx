'use client'

import { useState } from 'react'
import { Check, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

interface StepCheckerProps {
  content?: string
  isComplete?: boolean
  onSuccess: () => void
  onNeedHelp?: () => void
  successText?: string
  helpText?: string
  className?: string
}

export function StepChecker({
  content,
  isComplete = false,
  onSuccess,
  onNeedHelp,
  successText = "Consegui!",
  helpText = "Preciso de ajuda",
  className
}: StepCheckerProps) {
  const [selected, setSelected] = useState<'success' | 'help' | null>(
    isComplete ? 'success' : null
  )

  const handleSuccess = () => {
    if (selected) return
    setSelected('success')
    // Mini confete
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#007AFF', '#34C759', '#5856D6']
    })
    onSuccess()
  }

  const handleHelp = () => {
    if (selected) return
    setSelected('help')
    onNeedHelp?.()
  }

  return (
    <div className={cn("space-y-3", className)}>
      {content && (
        <p className="text-zinc-300 font-medium text-[15px] sm:text-[16px]">{content}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <button
          onClick={handleSuccess}
          disabled={selected !== null}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 h-[52px] sm:h-14 px-5 rounded-[14px] font-semibold text-[16px] transition-all duration-200",
            selected === 'success'
              ? "bg-emerald-500 text-white shadow-[0_2px_8px_rgba(52,199,89,0.3)]"
              : selected === null
              ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 active:bg-emerald-500/35 active:scale-[0.98] border border-emerald-500/25"
              : "bg-zinc-800/50 text-zinc-500 cursor-not-allowed"
          )}
        >
          <Check className="w-5 h-5" />
          {successText}
        </button>

        {onNeedHelp && (
          <button
            onClick={handleHelp}
            disabled={selected !== null}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 h-[52px] sm:h-14 px-5 rounded-[14px] font-semibold text-[16px] transition-all duration-200",
              selected === 'help'
                ? "bg-orange-500 text-white shadow-[0_2px_8px_rgba(255,159,10,0.3)]"
                : selected === null
                ? "bg-orange-500/15 text-orange-400 hover:bg-orange-500/25 active:bg-orange-500/35 active:scale-[0.98] border border-orange-500/25"
                : "bg-zinc-800/50 text-zinc-500 cursor-not-allowed"
            )}
          >
            <HelpCircle className="w-5 h-5" />
            {helpText}
          </button>
        )}
      </div>
    </div>
  )
}

export default StepChecker
