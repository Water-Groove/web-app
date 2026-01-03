import { prisma } from "@/lib/prisma"
import { resolveServerAuth } from "@/lib/server/auth0-server"
import { ApiResponse, BankDetails, CreateDeposit, WithdrawalRequestDto } from "@/types/type"
import { TransactionStatus, TransactionType } from "@prisma/client"
import { getPlatformBankDetails } from "./r.service"

async function authorizeUser() {
  const authUser = await resolveServerAuth()
  if (!authUser.user) throw new Error("Unauthorized")
  return authUser.user.id
}

export async function validateTierAmount(amount: number, catId: string) {

  const ic = await prisma.investmentCategory.findFirst({
    where: {
      code: catId
    }
  })

  if (!ic) return {
    success: false,
    message: 'No investent category found',
    data: null
  };


  if (typeof amount !== 'number' || isNaN(amount)) {
    return {
      success: false,
      message: "Invalid amount. Must be a number.",
      data: null,
    }
  }

  if (amount < Number(ic?.minAmount)) {
    return {
      success: false,
      message: `Amount is too low. Minimum allowed is ${ic?.minAmount}.`,
      data: null
    }
  }

  if (amount > Number(ic?.maxAmount)) {
    return {
      success: false,
      message: `Amount is too high. Maximum allowed is ${ic?.maxAmount}.`,
      data: null
    };
  }

  return {
    success: true,
    message: '',
    data: ic
  }; // valid amount
}

export async function createDepositService({
  investmentCatId,
  amount,
  description,
}: CreateDeposit): Promise<ApiResponse<BankDetails | null>> {

  const userId = await authorizeUser()


  if (!userId) return {
    success: false,
    message: "Invalid userId",
    data: null
  }

  const { success, message, data } = await validateTierAmount(amount, investmentCatId)

  if (!success && data) return {
    success: false,
    message,
    data: null
  };

  try {
    await prisma.$transaction(async (tx) => {
      const ivst = await tx.investment.create({
        data: {
          userId,
          categoryId: data ? data?.id : '',
          principalAmount: amount,
          roiRateSnapshot: data?.monthlyRoiRate ?? 0,
          durationMonths: data?.durationMonths ?? 18,
        }
      })

      await tx.user.update({
        where: {
          id: userId
        },
        data: {
          investmentCategoryId: data?.id,
          updatedAt: new Date()
        }
      })

      await tx.transaction.create({
        data: {
          userId,
          investmentId: ivst?.id,
          type: TransactionType.DEPOSIT,
          status: TransactionStatus.PENDING,
          amount,
          description,
        }
      })

      await tx.investorBalance.create({
        data: {
          investmentId: ivst.id,
          principalLocked: amount,
          createdAt: new Date(),
        },
      })
    })

    const bds = await getPlatformBankDetails()

    return {
      success: true,
      message: "Transaction created successfully, upload proof of payment",
      data: bds
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: true,
      message: error.message || "Something went wrong",
    }
  }

}

export async function uploadDepositProofService(
  proofUrl?: string
): Promise<ApiResponse<null>> {

  const userId = await authorizeUser()

  if (!proofUrl) {
    return {
      success: false,
      message: "Proof Url must be provided",
      data: null
    }
  }

  const txn = await prisma.transaction.findFirst({
    where: {
      userId,
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.PENDING
    }
  })

  if (!txn) {
    return {
      success: false,
      message: "No transaction record found",
      data: null
    }
  }

  await prisma.transaction.update({
    where: {
      id: txn.id
    },
    data: {
      proofUrl,
      updatedAt: new Date()
    }
  })


  return {
    success: true,
    message: "Proof of paymnet uploaded successfully",
    data: null
  }
}


export async function withdrawalRequestService({
  bankName,
  accountNumber,
  accountHolderName,
  amount,
  earlyWithdrawal
}: WithdrawalRequestDto): Promise<ApiResponse<null>> {
  const userId = await authorizeUser()
  try {
    const inst = await prisma.investment.findFirst({
      where: { userId }
    });

    if (!inst) throw new Error("Investment not found");

    const balance = await prisma.investorBalance.findUniqueOrThrow({
      where: { investmentId: inst.id },
    });

    const available = Number(balance.availableBalance);
    const locked = Number(balance.principalLocked);
    const withdrawalAmount = Number(amount);

    const maxWithdrawable = earlyWithdrawal
      ? available + locked
      : available;

    if (withdrawalAmount > maxWithdrawable) {
      throw new Error("Insufficient balance");
    }

    const txn = await prisma.transaction.create({
      data: {
        userId,
        investmentId: inst.id,
        type: TransactionType.WITHDRAWAL,
        amount: withdrawalAmount,
        status: TransactionStatus.PENDING,
        earlyWithdrawal: !!earlyWithdrawal,
      },
    });

    await prisma.withdrawalDetail.create({
      data: {
        transactionId: txn.id,
        accountHolderName: String(accountHolderName),
        accountNumber: String(accountNumber),
        bankName: String(bankName),
      },
    });

    return {
      success: true,
      message: "Withdrawal request submitted successfully",
      data: null
    };

  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
}
