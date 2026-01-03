import { prisma } from "@/lib/prisma"
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { DashboardOverviewData, CategoryDto, BankDetails, ApiResponse, TransactionResponse, TransactionQueryParams, InvestmentDto } from "@/types/type"
import { mapCategoryToDto, mapInvestmentToDto, mapInvestmentWithCategoryToDto, mapTransactionToAdminRow, mapTransactionToDto, mapUserProfileToDto, mapUserToDto } from '@/utils/mapper';
import { InvestmentStatus, Prisma, TransactionStatus, TransactionType } from "@prisma/client"

async function authorizeUser(userId: string) {
  const authUser = await resolveServerAuth()
  if (authUser.user.id !== userId) throw new Error("Unauthorized")
}

export async function getDashboardOverview(
  userId: string
): Promise<DashboardOverviewData> {
  // 🔐 Auth must never crash dashboard
  try {
    await authorizeUser(userId);
  } catch {
    throw new Error("Unauthorized");
  }

  // ---------------------------
  // 1️⃣ User (safe)
  // ---------------------------
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // ---------------------------
  // 2️⃣ Active investments (safe select)
  // ---------------------------
  let investments: any[] = [];

  try {
    investments = await prisma.investment.findMany({
      where: {
        userId,
        status: InvestmentStatus.ACTIVE,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        category: true,
        investorBalance: {
          select: {
            roiAccrued: true,
            availableBalance: true,
            principalLocked: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("Investment query failed:", err);
    investments = [];
  }

  // ---------------------------
  // 3️⃣ Wallet aggregation (fully guarded)
  // ---------------------------
  let walletAgg = {
    totalDeposited: 0,
    totalWithdrawn: 0,
    roiAccrued: 0,
    availableBalance: 0,
  };

  let walletStats: {
    availableBalance: Prisma.Decimal | null;
    principalLocked: Prisma.Decimal | null;
  } | null = null;

  try {
    const agg = await prisma.investorBalance.aggregate({
      where: {
        investment: { userId },
      },
      _sum: {
        totalDeposited: true,
        totalWithdrawn: true,
        roiAccrued: true,
        availableBalance: true,
      },
    });

    walletAgg = {
      totalDeposited: Number(agg._sum.totalDeposited ?? 0),
      totalWithdrawn: Number(agg._sum.totalWithdrawn ?? 0),
      roiAccrued: Number(agg._sum.roiAccrued ?? 0),
      availableBalance: Number(agg._sum.availableBalance ?? 0),
    };

    walletStats = await prisma.investorBalance.findFirst({
      where: {
        investment: { userId },
      },
      select: {
        availableBalance: true,
        principalLocked: true,
      },
    });
  } catch (err) {
    console.error("Wallet aggregation failed:", err);
  }

  // ---------------------------
  // 4️⃣ Transactions (parallel + safe)
  // ---------------------------
  let transactions: any[] = [];
  let pendingWithdrawals = 0;
  let pendingDeposits = 0;

  try {
    const [
      txs,
      pendingWithdrawalsAgg,
      pendingDepositsAgg,
    ] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.WITHDRAWAL,
          status: TransactionStatus.PENDING,
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.DEPOSIT,
          status: TransactionStatus.PENDING,
        },
        _sum: { amount: true },
      }),
    ]);

    transactions = txs;
    pendingWithdrawals = Number(pendingWithdrawalsAgg._sum.amount ?? 0);
    pendingDeposits = Number(pendingDepositsAgg._sum.amount ?? 0);
  } catch (err) {
    console.error("Transaction queries failed:", err);
  }

  // ---------------------------
  // 5️⃣ Category (safe)
  // ---------------------------
  const category =
    investments.length > 0 ? investments[0].category : null;

  // ---------------------------
  // ✅ Final safe response
  // ---------------------------
  return {
    user: mapUserToDto(user),

    category: category ? mapCategoryToDto(category) : null,

    wallet: {
      totalDeposits: walletAgg.totalDeposited,
      totalWithdrawals: walletAgg.totalWithdrawn,
      totalInterest: walletAgg.roiAccrued,
      availableBalance: Number(walletStats?.availableBalance ?? 0),
      principalBalance: Number(walletStats?.principalLocked ?? 0),
      pendingWithdrawals,
      pendingDeposits,
    },

    activeInvestments: investments.map(inv =>
      mapInvestmentWithCategoryToDto(
        inv,
        Number(inv.investorBalance?.roiAccrued ?? 0)
      )
    ),

    pendingTransactions: transactions
      .filter(t => t.status === TransactionStatus.PENDING)
      .map(mapTransactionToDto),
  };
}


export async function getAllInvestmentCategory(): Promise<
  ApiResponse<CategoryDto[]>
> {
  const ic = await prisma.investmentCategory.findMany()

  return {
    success: true,
    message: "Investment categories retrieved successfully",
    data: ic.map(mapCategoryToDto)
  }
}

export async function getPlatformBankDetails(): Promise<BankDetails | null> {
  const details = await prisma.platformBankAccount.findFirst({
    where: {
      isActive: true,
      isDefault: true,
    },
  })

  if (!details) {
    return null
  }

  return {
    bankName: details.bankName,
    accountHolderName: details.accountHolderName,
    accountNumber: details.accountNumber,
    reference: `REF-WG-${Date.now()}`,
  }
}

export async function getTransactions(
  userId: string,
  query?: TransactionQueryParams
): Promise<ApiResponse<TransactionResponse>> {

  await authorizeUser(userId)

  const page = Math.max(Number(query?.page) || 1, 1);
  const limit = Math.min(Number(query?.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(query?.type && { type: query?.type }),
    ...(query?.status && { status: query?.status }),
    ...(query?.from || query?.to
      ? {
        createdAt: {
          ...(query?.from && { gte: new Date(query?.from) }),
          ...(query?.to && { lte: new Date(query?.to) }),
        },
      }
      : {}),
  };

  const orderBy = {
    [query?.sortBy ?? "createdAt"]: query?.sortOrder ?? "desc",
  } as const;

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        userId: true,
        investmentId: true,
        type: true,
        status: true,
        amount: true,
        proofUrl: true,
        description: true,
        processedAt: true,
        createdAt: true,
        earlyWithdrawal: true,
        withdrawalPenalty: {
          select: {
            id: true,
            amount: true,
            percentage: true,
          },
        },
      },
    }),
    prisma.transaction.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const txns = transactions.map(mapTransactionToAdminRow);

  return {
    success: true,
    message: "Transactions retrieved successfully",
    data: {
      transactions: txns,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }
  };
}

export async function getInvestments(
  userId: string,
): Promise<ApiResponse<InvestmentDto[] | null>> {
  try {
    await authorizeUser(userId)
    const ivst = await prisma.investment.findMany({
      where: {
        userId: userId
      }
    })

    return {
      success: true,
      message: "Transactions retrieved successfully",
      data: ivst.map(mapInvestmentToDto)
    };

  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null
    }
  }

}

export async function getProfile(userId: string) {
  try {

    if (!userId) {
      return {
        success: false,
        message: "UserId is required",
        data: null
      }
    }

    const data = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        investmentCategory: true
      }
    })
    console.log(data)

    if (!data) {
      return {
        success: false,
        message: "User not found",
        data: null
      }
    }

    return {
      success: true,
      message: "Profile retrieved",
      data: mapUserProfileToDto(data)
    }
  } catch (error: any) {
    console.log(error.message)
    return {
      sucess: false,
      message: error.massage
    }
  }
}