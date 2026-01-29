import { Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TipBoxProps {
  content?: string
  children?: React.ReactNode
  title?: string
  className?: string
}

export function TipBox({ content, children, title = "DICA", className }: TipBoxProps) {
  return (
    <div className={cn(
      "bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl p-4 sm:p-6",
      className
    )}>
      <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm sm:text-base">
        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{title}</span>
      </div>
      <div className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
        {content || children}
      </div>
    </div>
  )
}

export default TipBox
