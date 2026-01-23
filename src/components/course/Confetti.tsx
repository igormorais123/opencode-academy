'use client'

import confetti from 'canvas-confetti'

// Funcoes de celebracao para diferentes momentos

// Mini celebracao - ao completar um passo
export function microCelebration() {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { y: 0.8 },
    colors: ['#007AFF', '#34C759', '#5856D6']
  })
}

// Celebracao de licao completa
export function lessonCelebration() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#007AFF', '#34C759', '#5856D6']
  })
}

// Celebracao de modulo completo
export function moduleCelebration() {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#007AFF', '#34C759', '#FF9500', '#5856D6']
  })
}

// Celebracao final - dourada
export function finalCelebration() {
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

// Array de mensagens de encorajamento
export const encouragements = [
  "Otimo!",
  "Perfeito!",
  "Isso ai!",
  "Muito bem!",
  "Excelente!",
  "Voce conseguiu!",
  "Continua assim!",
  "Mandou bem!"
]

export function getRandomEncouragement() {
  return encouragements[Math.floor(Math.random() * encouragements.length)]
}
