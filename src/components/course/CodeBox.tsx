'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBoxProps {
  code: string
  language?: string
  className?: string
}

export function CodeBox({ code, language = 'bash', className }: CodeBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      "relative rounded-xl bg-[#1D1D1F] text-[#F5F5F7] p-6 font-mono text-base",
      className
    )}>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          copied 
            ? "bg-green-500/20 text-green-400" 
            : "bg-white/10 text-white/80 hover:bg-white/20"
        )}
      >
        {copied ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Copiado!
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copiar
          </span>
        )}
      </button>
      <pre className="overflow-x-auto pr-24">
        <code>{code}</code>
      </pre>
    </div>
  )
}
