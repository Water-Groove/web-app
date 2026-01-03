import prisma from "@/lib/prisma"

export async function acquireCronLock(name: string, ttlMs = 10 * 60 * 1000) {
  const now = new Date()
  const expires = new Date(now.getTime() - ttlMs)

  return prisma.$transaction(async (tx) => {
    const existing = await tx.cronLock.findUnique({ where: { name } })

    if (existing && existing.lockedAt > expires) {
      return false // lock is active
    }

    await tx.cronLock.upsert({
      where: { name },
      create: { name, lockedAt: now },
      update: { lockedAt: now },
    })

    return true
  })
}

export async function releaseCronLock(name: string) {
  await prisma.cronLock.delete({ where: { name } }).catch(() => {})
}

export function calculateRoiPeriod(startDate: Date, now: Date): number {
  const years = now.getFullYear() - startDate.getFullYear()
  const months = now.getMonth() - startDate.getMonth()
  const totalMonths = years * 12 + months

  if (now.getDate() < startDate.getDate()) {
    return Math.max(0, totalMonths - 1)
  }

  return Math.max(0, totalMonths)
}
