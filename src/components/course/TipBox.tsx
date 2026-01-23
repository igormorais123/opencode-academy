import { Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TipBoxProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function TipBox({ children, title = "DICA", className }: TipBoxProps) {
  return (
    <div className={cn(
      "bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6",
      className
    )}>
      <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
        <Lightbulb className="w-5 h-5" />
        <span>{title}</span>
      </div>
      <div className="text-gray-700 text-lg leading-relaxed">
        {children}
      </div>
    </div>
  )
}
