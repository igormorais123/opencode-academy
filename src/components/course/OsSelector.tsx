'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OsSelectorProps {
  value: 'windows' | 'mac'
  onChange: (os: 'windows' | 'mac') => void
  className?: string
}

export function OsSelector({ value, onChange, className }: OsSelectorProps) {
  return (
    <div className={cn("flex gap-3 sm:gap-4", className)}>
      <button
        onClick={() => onChange('windows')}
        className={cn(
          "flex-1 flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl border-2 transition-all duration-200",
          value === 'windows'
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        <span className="text-4xl sm:text-5xl">🪟</span>
        <div className="text-center">
          <div className="font-semibold text-lg sm:text-xl text-gray-900">WINDOWS</div>
          <div className="text-gray-500 mt-1 text-xs sm:text-base">Windows 10 ou 11</div>
        </div>
      </button>

      <button
        onClick={() => onChange('mac')}
        className={cn(
          "flex-1 flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl border-2 transition-all duration-200",
          value === 'mac'
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        <span className="text-4xl sm:text-5xl">🍎</span>
        <div className="text-center">
          <div className="font-semibold text-lg sm:text-xl text-gray-900">MAC</div>
          <div className="text-gray-500 mt-1 text-xs sm:text-base">MacBook ou iMac</div>
        </div>
      </button>
    </div>
  )
}
