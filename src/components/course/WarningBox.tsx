import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WarningBoxProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function WarningBox({ children, title = "IMPORTANTE", className }: WarningBoxProps) {
  return (
    <div className={cn(
      "bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6",
      className
    )}>
      <div className="flex items-center gap-2 text-orange-700 font-semibold mb-2">
        <AlertTriangle className="w-5 h-5" />
        <span>{title}</span>
      </div>
      <div className="text-gray-700 text-lg leading-relaxed">
        {children}
      </div>
    </div>
  )
}
