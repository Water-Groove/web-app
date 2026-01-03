/*
  Warnings:

  - You are about to drop the column `investorTier` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `InvestmentCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `InvestmentCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `InvestmentCategory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `InvestmentCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "InvestmentCategory_name_key";

-- AlterTable
ALTER TABLE "InvestmentCategory" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "investorTier",
ADD COLUMN     "investmentCategoryId" TEXT;

-- CreateTable
CREATE TABLE "InvestorBalance" (
    "id" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "principalLocked" DECIMAL(15,2) NOT NULL,
    "roiAccrued" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalDeposited" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "totalWithdrawn" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "availableBalance" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "lastComputedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestorBalance_investmentId_key" ON "InvestorBalance"("investmentId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentCategory_code_key" ON "InvestmentCategory"("code");

-- CreateIndex
CREATE INDEX "InvestmentCategory_priority_idx" ON "InvestmentCategory"("priority");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_investmentCategoryId_fkey" FOREIGN KEY ("investmentCategoryId") REFERENCES "InvestmentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorBalance" ADD CONSTRAINT "InvestorBalance_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
