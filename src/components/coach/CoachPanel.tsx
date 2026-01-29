'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface CoachPanelProps {
  onClose: () => void
  currentModule?: number
  currentLesson?: string
  userOs?: 'windows' | 'mac'
}

export function CoachPanel({ onClose, currentModule, currentLesson, userOs }: CoachPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Ola! Sou o Guia, seu assistente neste curso. ${
        currentModule !== undefined
          ? `Vi que voce esta no Modulo ${currentModule}. `
          : ''
      }Posso ajudar com algo?`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          currentModule,
          currentLesson,
          userOs,
          history: messages.slice(-6)
        })
      })

      const data = await response.json()

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Desculpe, tive um problema. Tente novamente.'
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, nao consegui responder agora. Tente novamente em alguns segundos.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-[85vh] sm:h-[520px] bg-white sm:rounded-2xl rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden sm:border sm:border-gray-200/60">
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-2 pb-0 sm:hidden">
          <div className="w-9 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[16px]">
              🤖
            </div>
            <div>
              <span className="font-semibold text-[16px] text-gray-900">Guia</span>
              <p className="text-[11px] text-gray-400">Assistente do curso</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-[18px] h-[18px] text-gray-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[82%] px-4 py-2.5 text-[15px] leading-relaxed",
                  msg.role === 'user'
                    ? "bg-[#007AFF] text-white rounded-[18px] rounded-br-[6px]"
                    : "bg-[#F5F5F7] text-gray-800 rounded-[18px] rounded-bl-[6px]"
                )}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#F5F5F7] px-4 py-3 rounded-[18px] rounded-bl-[6px]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 safe-bottom">
          <div className="flex gap-2 items-end">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1 min-w-0 px-4 py-3 rounded-full bg-[#F5F5F7] border-0 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 text-[16px] text-gray-900 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200",
                input.trim() && !isLoading
                  ? "bg-[#007AFF] text-white active:bg-[#004EA6] active:scale-95 shadow-sm"
                  : "bg-gray-100 text-gray-300"
              )}
            >
              <Send className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
