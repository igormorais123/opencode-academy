'use client'

import { useState } from 'react'
import { Check, X, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

interface StepCheckerProps {
  onSuccess: () => void
  onNeedHelp: () => void
  successText?: string
  helpText?: string
  className?: string
}

export function StepChecker({ 
  onSuccess, 
  onNeedHelp,
  successText = "Consegui!",
  helpText = "Preciso de ajuda",
  className 
}: StepCheckerProps) {
  const [selected, setSelected] = useState<'success' | 'help' | null>(null)

  const handleSuccess = () => {
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
    setSelected('help')
    onNeedHelp()
  }

  return (
    <div className={cn("flex gap-4 mt-8", className)}>
      <button
        onClick={handleSuccess}
        disabled={selected !== null}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200",
          selected === 'success'
            ? "bg-green-500 text-white"
            : selected === null
            ? "bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        <Check className="w-5 h-5" />
        {successText}
      </button>
      
      <button
        onClick={handleHelp}
        disabled={selected !== null}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200",
          selected === 'help'
            ? "bg-orange-500 text-white"
            : selected === null
            ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border-2 border-orange-200"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
      >
        <HelpCircle className="w-5 h-5" />
        {helpText}
      </button>
    </div>
  )
}
