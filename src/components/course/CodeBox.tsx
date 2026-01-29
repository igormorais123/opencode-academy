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
        <p className="text-zinc-400 text-[14px] sm:text-[15px]">{description}</p>
      )}
      <div className="relative rounded-[14px] bg-[#1C1C1E] text-[#F5F5F7] p-4 sm:p-5 font-mono">
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-medium transition-all duration-200",
            copied
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/10 text-white/70 hover:bg-white/15 active:bg-white/25"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copiar</span>
            </>
          )}
        </button>
        <pre className="overflow-x-auto pr-12 sm:pr-20 text-[13px] sm:text-[14px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBox
