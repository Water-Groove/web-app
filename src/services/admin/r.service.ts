import prisma from "@/lib/prisma"
import { Prisma, TransactionStatus, TransactionType } from "@prisma/client"
import { AdminDashboardOverview, AdminUserQueryParams, AdminUserRow, AdminInvestmentQueryParams, AdminInvestmentRow, AdminTransactionQueryParams, AdminTransactionRow, PaginatedResponse, AdminPenaltiesQueryParams, AdminPenaltyRow } from "@/types/adminType"
import { ApiResponse } from "@/types/type"
import { buildDateFilter, buildOrder, buildPaginationMeta, paginate } from "@/lib/utils"
import { resolveServerAuth } from "@/lib/server/auth0-server"
import { mapInvestmentToAdminRow, mapPeneltyToAdminRow, mapTransactionToAdminRow, mapUserToAdminRow } from "@/utils/mapper"

async function authorizeAdmin(adminId: string) {
  const authAdmin = await resolveServerAuth()
  if (authAdmin.user.id !== adminId) throw new Error("Unauthorized")
}

export async function getTransactions(
  adminId: string,
  type: TransactionType,
  params: AdminTransactionQueryParams & { page?: number; limit?: number }
) {
  await authorizeAdmin(adminId)

  let page = params.page ?? 1
  let limit = params.limit ?? 20

  const where: AdminTransactionQueryParams = {
    type,
    ...(params.status && { status: params.status }),
    ...(params.transactionId && { id: params.transactionId }),
    ...(params.date && { createdAt: buildDateFilter(params.date) }),
  }

  const [total, transactions] = await prisma.$transaction([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      orderBy: buildOrder(params.order),
      skip: (page - 1) * limit,
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
  ]);

  const txns = transactions.map(mapTransactionToAdminRow);


  return {
    success: true,
    data: {
      data: txns,
      ...buildPaginationMeta(total, page, limit)
    }
  }
}

export async function getAllInvestments(
  adminId: string,
  params: AdminInvestmentQueryParams & { page?: number; limit?: number }
): Promise<ApiResponse<PaginatedResponse<AdminInvestmentRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const where = {
      ...(params.userId && { userId: params.userId }),
      ...(params.categoryId && { categoryId: params.categoryId }),
      ...(params.status && { status: params.status }),
      startDate: params.startDate ? { gte: params.startDate } : undefined,
      endDate: params.endDate ? { lte: params.endDate } : undefined
    }

    const [total, investments] = await prisma.$transaction([
      prisma.investment.count({ where }),
      prisma.investment.findMany({
        where,
        orderBy: buildOrder(params.order),
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          categoryId: true,
          principalAmount: true,
          roiRateSnapshot: true,
          durationMonths: true,
          status: true,
          startDate: true,
          endDate: true,
          createdAt: true
        }
      })
    ])

    return {
      success: true,
      data: {
        data: investments.map(mapInvestmentToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}

export async function getAllUsers(
  adminId: string,
  params: AdminUserQueryParams
): Promise<ApiResponse<PaginatedResponse<AdminUserRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const where: Prisma.UserWhereInput = {
      ...(params.fullName && {
        fullName: { contains: params.fullName, mode: "insensitive" },
      }),
      ...(params.email && {
        email: { contains: params.email, mode: "insensitive" },
      }),
      ...(params.isActive !== undefined && params.isActive !== null && {
        isActive: params.isActive,
      }),
      ...(params.investmentCategoryId && {
        investmentCategoryId: params.investmentCategoryId,
      }),
    }


    const [total, users] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          investmentCategoryId: true
        }
      })
    ])

    return {
      success: true,
      data: {
        data: users.map(mapUserToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}

export async function getAdminDashboardOverview(
  adminId: string
): Promise<ApiResponse<AdminDashboardOverview | null>> {
  try {
    
   await authorizeAdmin(adminId)

    const [
      users,
      investments,
      transactions
    ] = await prisma.$transaction([
      prisma.user.count(),

      prisma.investment.aggregate({
        _sum: { principalAmount: true },
        _count: {
          _all: true
        }
      }),
      prisma.transaction.groupBy({
        by: ["type", "status"],
        orderBy: {
          type: "asc"
        },
        _sum: {
          amount: true
        },
        _count: {
          _all: true
        }
      })
    ])

    const totalDeposit = transactions.find(t => t.type === TransactionType.DEPOSIT)
    const totalWithdrawal = transactions.find(t => t.type === TransactionType.WITHDRAWAL)
    const totalRoi = transactions.find(t => t.type === TransactionType.INTEREST)

    const totalDepositCount =
      typeof totalDeposit?._count === "object"
        ? totalDeposit._count._all ?? 0
        : 0

    const totalWithdrawalCount =
      typeof totalWithdrawal?._count === "object"
        ? totalWithdrawal._count._all ?? 0
        : 0


    const data: AdminDashboardOverview = {
      totalPrincipalAmount: Number(investments._sum.principalAmount ?? 0),
      totalInvestment: investments._count?._all,
      totalUsers: users,

      totalDepositAmount: Number(totalDeposit?._sum?.amount ?? 0),
      totalWithdrawalAmount: Number(totalWithdrawal?._sum?.amount ?? 0),
      totalRoiPaidAmount: Number(totalRoi?._sum?.amount ?? 0),

      totalDeposit: totalDepositCount,
      totalWithdrawal: totalWithdrawalCount,

      totalPendingDeposit: transactions.filter(
        t =>
          t.type === TransactionType.DEPOSIT &&
          t.status === TransactionStatus.PENDING
      ).length,

      totalPendingWithdrawal: transactions.filter(
        t =>
          t.type === TransactionType.WITHDRAWAL &&
          t.status === TransactionStatus.PENDING
      ).length,

      totalActiveInvestment: 0,
      totalPendingInvestment: 0,

      systemHealth: "HEALTHY"
    }




    return { success: true, message: "", data }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message, data: null }
  }
}

export async function getAllPenalties(
  adminId: string,
  params: AdminPenaltiesQueryParams & { page?: number; limit?: number }
): Promise<ApiResponse<PaginatedResponse<AdminPenaltyRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const where = {
      ...(params.transactionId && { transactionId: params.transactionId }),
    }

    const [total, penaties] = await prisma.$transaction([
      prisma.withdrawalPenalty.count({ where }),
      prisma.withdrawalPenalty.findMany({
        where,
        orderBy: buildOrder(params.order),
        skip: (page - 1) * limit,
        take: limit,
      })
    ])

    return {
      success: true,
      data: {
        data: penaties.map(mapPeneltyToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}