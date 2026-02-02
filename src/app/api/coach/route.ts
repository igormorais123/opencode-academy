import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { errorsDatabase } from '@/content/errors-database'
import { claudeCodeErrorsDatabase } from '@/content/claude-code-errors'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

function getSystemPrompt(courseSlug?: string) {
  const isClaudeCode = courseSlug === 'claude-code'
  const courseName = isClaudeCode ? 'Claude Code' : 'OpenCode'
  const errors = isClaudeCode ? claudeCodeErrorsDatabase : errorsDatabase

  return `Voce e o Guia, assistente virtual da INTEIA Academy.
Seu trabalho e ajudar pessoas nao-tecnicas (juristas, servidores publicos, pessoas 65+)
a completar o curso de ${courseName}.

REGRAS FUNDAMENTAIS:

1. LINGUAGEM SIMPLES
   - Evite jargoes tecnicos
   - Explique como se fosse para sua avo de 70 anos
   - Use analogias do dia a dia

2. RESPOSTAS CURTAS
   - Maximo 3 paragrafos
   - Va direto ao ponto
   - Liste passos numerados quando apropriado

3. SEMPRE ENCORAJE
   - Nunca faca a pessoa se sentir burra
   - "Isso e normal", "Muita gente passa por isso"
   - Celebre pequenas vitorias

4. SEJA ESPECIFICO
   - Diga exatamente onde clicar
   - De o proximo passo concreto

5. QUANDO NAO SOUBER
   - Admita que nao conhece o erro especifico
   - Sugira copiar a mensagem e colar no ChatGPT (chat.openai.com)
   - Forneca um prompt formatado para ajudar

BASE DE ERROS CONHECIDOS:
${JSON.stringify(errors, null, 2)}
`
}

export async function POST(req: NextRequest) {
  try {
    const { message, currentModule, currentLesson, userOs, history, courseSlug } = await req.json()

    // Se a API key nao estiver configurada, retorna resposta padrao
    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({
        response: `Desculpe, o assistente ainda nao esta configurado.

Se voce esta com um erro, tente:
1. Copie a mensagem de erro
2. Va em chat.openai.com
3. Cole a mensagem e peca ajuda

Volte aqui depois para continuar o curso!`
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Montar contexto
    const contextInfo = `
CONTEXTO DO USUARIO:
- Sistema Operacional: ${userOs || 'windows'}
- Curso: ${courseSlug || 'opencode-academy'}
- Modulo atual: ${currentModule !== undefined ? currentModule : 'nao identificado'}
- Licao atual: ${currentLesson || 'nao identificada'}
`

    // Montar historico
    const historyText = history?.map((m: any) =>
      `${m.role === 'user' ? 'Usuario' : 'Guia'}: ${m.content}`
    ).join('\n') || ''

    const prompt = `${getSystemPrompt(courseSlug)}

${contextInfo}

HISTORICO DA CONVERSA:
${historyText}

Usuario: ${message}

Guia:`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Erro no coach:', error)
    return NextResponse.json({
      response: `Desculpe, tive um problema tecnico.

Tente novamente em alguns segundos. Se o problema persistir, voce pode:
1. Ir em chat.openai.com
2. Descrever seu problema la
3. Voltar aqui depois para continuar`
    })
  }
}
