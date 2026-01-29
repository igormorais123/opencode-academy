'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBoxProps {
  code: string
  description?: string
  language?: string
  className?: string
}

export function CodeBox({ code, description, language = 'bash', className }: CodeBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {description && (
        <p className="text-zinc-400 text-sm">{description}</p>
      )}
      <div className="relative rounded-xl bg-[#1D1D1F] text-[#F5F5F7] p-4 sm:p-6 font-mono text-sm sm:text-base">
        <button
        onClick={handleCopy}
        className={cn(
          "absolute top-2 right-2 sm:top-4 sm:right-4 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
          copied
            ? "bg-green-500/20 text-green-400"
            : "bg-white/10 text-white/80 hover:bg-white/20"
        )}
      >
        {copied ? (
          <span className="flex items-center gap-1 sm:gap-2">
            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Copiado!</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 sm:gap-2">
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Copiar</span>
          </span>
        )}
      </button>
        <pre className="overflow-x-auto pr-10 sm:pr-24 text-xs sm:text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBox
