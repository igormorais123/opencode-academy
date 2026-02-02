// Funcoes de verificacao de acesso a cursos
import { prisma } from '@/lib/prisma'

export type AccessResult = {
  hasAccess: boolean
  reason: 'owner' | 'admin' | 'purchased' | 'free' | 'no_access'
}

/**
 * Verifica se um usuario tem acesso a um curso
 * @param userId - ID do usuario
 * @param courseId - ID do curso
 * @returns Resultado com status e motivo do acesso
 */
export async function hasAccessToCourse(
  userId: string | null | undefined,
  courseId: string
): Promise<AccessResult> {
  // Buscar curso
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { price: true },
  })

  if (!course) {
    return { hasAccess: false, reason: 'no_access' }
  }

  // Curso gratuito - todos tem acesso
  if (course.price === 0) {
    return { hasAccess: true, reason: 'free' }
  }

  // Usuario nao logado nao tem acesso a cursos pagos
  if (!userId) {
    return { hasAccess: false, reason: 'no_access' }
  }

  // Verificar se e admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  if (user?.role === 'ADMIN') {
    return { hasAccess: true, reason: 'admin' }
  }

  // Verificar se comprou o curso
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    select: { status: true },
  })

  if (purchase?.status === 'completed') {
    return { hasAccess: true, reason: 'purchased' }
  }

  return { hasAccess: false, reason: 'no_access' }
}

/**
 * Verifica se um usuario tem acesso a um curso pelo slug
 * @param userId - ID do usuario
 * @param courseSlug - Slug do curso
 * @returns Resultado com status e motivo do acesso
 */
export async function hasAccessToCourseBySlug(
  userId: string | null | undefined,
  courseSlug: string
): Promise<AccessResult & { courseId?: string }> {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true, price: true },
  })

  if (!course) {
    return { hasAccess: false, reason: 'no_access' }
  }

  const access = await hasAccessToCourse(userId, course.id)
  return { ...access, courseId: course.id }
}

/**
 * Busca todos os cursos que um usuario tem acesso
 * @param userId - ID do usuario
 * @returns Lista de IDs dos cursos
 */
export async function getUserAccessibleCourses(
  userId: string | null | undefined
): Promise<string[]> {
  // Cursos gratuitos
  const freeCourses = await prisma.course.findMany({
    where: { price: 0, published: true },
    select: { id: true },
  })

  const accessibleIds = freeCourses.map((c) => c.id)

  if (!userId) {
    return accessibleIds
  }

  // Verificar se e admin (acesso total)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  if (user?.role === 'ADMIN') {
    const allCourses = await prisma.course.findMany({
      select: { id: true },
    })
    return allCourses.map((c) => c.id)
  }

  // Cursos comprados
  const purchases = await prisma.purchase.findMany({
    where: { userId, status: 'completed' },
    select: { courseId: true },
  })

  const purchasedIds = purchases.map((p) => p.courseId)

  // Combinar e remover duplicatas
  return [...new Set([...accessibleIds, ...purchasedIds])]
}
