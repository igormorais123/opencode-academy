'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TheoryBoxProps {
  children: React.ReactNode
  title?: string
  className?: string
  defaultOpen?: boolean
}

export function TheoryBox({ 
  children, 
  title = "ENTENDA MELHOR (opcional)", 
  className,
  defaultOpen = false 
}: TheoryBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn(
      "bg-gray-50 rounded-xl overflow-hidden",
      className
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-600 font-semibold">
          <BookOpen className="w-5 h-5" />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 text-lg leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}
