/*
  Warnings:

  - Changed the type of `name` on the `InvestmentCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "InvestmentCategory" DROP COLUMN "name",
ADD COLUMN     "name" "InvestorTier" NOT NULL;

-- CreateTable
CREATE TABLE "PlatformBankAccount" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdByAdminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlatformBankAccount_isActive_idx" ON "PlatformBankAccount"("isActive");

-- CreateIndex
CREATE INDEX "PlatformBankAccount_isDefault_idx" ON "PlatformBankAccount"("isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentCategory_name_key" ON "InvestmentCategory"("name");

-- AddForeignKey
ALTER TABLE "PlatformBankAccount" ADD CONSTRAINT "PlatformBankAccount_createdByAdminId_fkey" FOREIGN KEY ("createdByAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
