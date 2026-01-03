import prisma from "@/lib/prisma"
import { InvestmentStatus, TransactionStatus, TransactionType } from "@prisma/client"
import { calculateRoiPeriod } from "./cron.helper"

export async function processRoiPayouts() {
  const now = new Date()

  const investments = await prisma.investment.findMany({
    where: {
      status: InvestmentStatus.ACTIVE,
      startDate: { not: null },
      endDate: { gt: now },
    },
    include: {
      investorBalance: true,
    },
  })

  for (const investment of investments) {
    if (!investment.startDate || !investment.investorBalance) continue

    const expectedPeriod = calculateRoiPeriod(investment.startDate, now)
    const lastPaid = investment.lastRoiPeriodPaid

    if (expectedPeriod <= lastPaid) continue

    for (let period = lastPaid + 1; period <= expectedPeriod; period++) {
      await paySingleRoiPeriod(investment.id, period)
    }
  }
}

export async function paySingleRoiPeriod(investmentId: string, period: number) {
  await prisma.$transaction(async (tx) => {
    const investment = await tx.investment.findUnique({
      where: { id: investmentId },
      include: { investorBalance: true },
    })

    if (!investment || !investment.investorBalance) return
    if (investment.lastRoiPeriodPaid >= period) return

    const principal = Number(investment.investorBalance.principalLocked)
    if (principal <= 0) return

    const roiRate = Number(investment.roiRateSnapshot)
    const roiAmount = Number((principal * roiRate).toFixed(2))

    if (roiAmount <= 0) return

    // 1️⃣ Create ROI transaction
    const txn = await tx.transaction.create({
      data: {
        userId: investment.userId,
        investmentId: investment.id,
        type: TransactionType.INTEREST,
        status: TransactionStatus.PAID,
        amount: roiAmount,
        description: `ROI payout for period ${period}`,
        processedAt: new Date(),
      },
    })

    // 2️⃣ Update balance snapshot
    await tx.investorBalance.update({
      where: { investmentId: investment.id },
      data: {
        availableBalance: { increment: roiAmount },
        roiAccrued: { increment: roiAmount },
        lastComputedAt: new Date(),
      },
    })

    // 3️⃣ Mark period as paid
    await tx.investment.update({
      where: { id: investment.id },
      data: {
        lastRoiPeriodPaid: period,
      },
    })
  })
}
