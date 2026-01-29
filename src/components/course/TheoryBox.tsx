'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TheoryBoxProps {
  content?: string
  children?: React.ReactNode
  title?: string
  className?: string
  defaultOpen?: boolean
}

export function TheoryBox({
  content,
  children,
  title = "ENTENDA MELHOR",
  className,
  defaultOpen = true
}: TheoryBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn(
      "bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700",
      className
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 text-zinc-300 font-semibold">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-zinc-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-zinc-400 leading-relaxed whitespace-pre-line">
          {content || children}
        </div>
      )}
    </div>
  )
}

export default TheoryBox
