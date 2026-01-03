-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "lastRoiPeriodPaid" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CronLock" (
    "name" TEXT NOT NULL,
    "lockedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CronLock_pkey" PRIMARY KEY ("name")
);
