-- CreateTable
CREATE TABLE "WithdrawalPenalty" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "percentage" DECIMAL(5,2) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "appliedByAdminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WithdrawalPenalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WithdrawalPenalty_transactionId_key" ON "WithdrawalPenalty"("transactionId");

-- CreateIndex
CREATE INDEX "WithdrawalPenalty_transactionId_idx" ON "WithdrawalPenalty"("transactionId");

-- AddForeignKey
ALTER TABLE "WithdrawalPenalty" ADD CONSTRAINT "WithdrawalPenalty_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawalPenalty" ADD CONSTRAINT "WithdrawalPenalty_appliedByAdminId_fkey" FOREIGN KEY ("appliedByAdminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
