import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WarningBoxProps {
  content?: string
  children?: React.ReactNode
  title?: string
  className?: string
}

export function WarningBox({ content, children, title = "IMPORTANTE", className }: WarningBoxProps) {
  return (
    <div className={cn(
      "bg-orange-500/10 border-l-4 border-orange-500 rounded-r-xl p-4 sm:p-6",
      className
    )}>
      <div className="flex items-center gap-2 text-orange-400 font-semibold mb-2 text-sm sm:text-base">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>{title}</span>
      </div>
      <div className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
        {content || children}
      </div>
    </div>
  )
}

export default WarningBox
