import {
  AdminRole,
  InvestorTier,
  InvestmentStatus,
  TransactionType,
  TransactionStatus,
  Prisma,
} from "@prisma/client"

// ==============================
// ADMIN CONTEXT
// ==============================

export interface AdminSession {
  adminId: string
  role: AdminRole
  email: string
}

export interface PaginatedResponse<T> {
  data: T
  total: number // Total number of transactions matching filter (without pagination)
  page: number // Current page number
  limit: number // Number of items per page
  totalPages: number // Total number of pages
  hasNextPage: boolean // Whether there's a next page
  hasPreviousPage: boolean // Whether there's a previous page
}

export interface AdminDashboardOverview {
  totalPrincipalAmount: number
  totalRoiPaidAmount: number
  totalDepositAmount: number
  totalWithdrawalAmount: number
  totalUsers: number
  totalInvestment: number
  totalPendingInvestment: number
  totalActiveInvestment: number
  totalDeposit: number
  totalPendingDeposit: number
  totalWithdrawal: number
  totalPendingWithdrawal: number
  systemHealth: "HEALTHY" | "WARNING" | "CRITICAL"
}

export interface AdminUserRow {
  id: string
  fullName: string
  email: string
  phone?: string
  isActive: boolean
  createdAt: Date
  investmentCategoryId: string
}

export interface AdminUserDetail {
  user: AdminUserRow
  investments: AdminInvestmentRow[]
  transactions: AdminTransactionRow[]
}

export interface AdminInvestmentRow {
  id: string
  userId: string
  categoryId: string

  principalAmount: number
  roiRateSnapshot: number
  durationMonths: number

  status: InvestmentStatus
  startDate?: Date
  endDate?: Date

  createdAt: Date
}

export interface AdminTransactionRow {
  id: string
  userId: string
  investmentId?: string

  type: TransactionType
  status: TransactionStatus
  amount: number

  proofUrl?: string
  description?: string
  earlyWithdrawal: boolean;
  processedAt?: Date
  createdAt: Date

  withdrawalPenalty?: WithdrawalPenaltyRow
}

export interface AdminPenaltyRow {
  id: string
  transactionId: string
  percentage: number
  amount: number
  reason: string
  createdAt: Date
}

export interface WithdrawalPenaltyRow {
  id: string
  amount: number
  percentage: number
  reason?: string
  transactionId?: string
}

export interface ApproveTransactionPayload {
  transactionId: string
  action: "APPROVE" | "REJECT"
  note?: string
}

export interface RoiSummary {
  eligibleInvestments: number
  totalRoiToBeGenerated: number
  lastRunAt?: string
}

export interface TriggerRoiCronPayload {
  runForDate?: string
}

export interface ManualRoiCreditPayload {
  investmentId: string
  amount: number
  description?: string
}

export interface AdminInvestmentCategory {
  id: string
  name: string
  minAmount: number
  maxAmount?: number
  monthlyRoiRate: number
  durationMonths: number
  isActive: boolean
  createdAt: string
}

export interface CreateCategoryPayload {
  name: string
  minAmount: number
  maxAmount?: number
  monthlyRoiRate: number
  durationMonths: number
  description?: string
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  isActive?: boolean
}

export interface AdminPermission {
  canApproveTransactions: boolean
  canManageUsers: boolean
  canManageCategories: boolean
  canTriggerRoi: boolean
  canViewAuditLogs: boolean
}

export interface AdminAuditLog {
  id: string
  adminId: string
  action: string
  entity: "USER" | "INVESTMENT" | "TRANSACTION" | "CATEGORY"
  entityId: string
  metadata?: Record<string, any>
  createdAt: string
}

export interface AdminLayoutData {
  admin: {
    id: string
    fullName: string
    role: AdminRole
  }
  permissions: AdminPermission
  children: React.ReactNode
}

export interface AdminTransactionQueryParams {
  status?: TransactionStatus;
  order?: Prisma.SortOrder
  date?: Date;
  transactionId?: string
  page?: number
  limit?: number
  type?: TransactionType
}

export interface AdminInvestmentQueryParams {
  userId?: string
  categoryId?: string
  status?: InvestmentStatus
  startDate?: Date
  endDate?: Date
  order?: Prisma.SortOrder
  page?: number
  limit?: number
}

export interface AdminUserQueryParams {
  fullName?: string
  email?: string
  isActive?: boolean
  investmentCategoryId?: string
  page?: number
  limit?: number
}

export interface AdminPenaltiesQueryParams {
  transactionId?: string
  order?: Prisma.SortOrder
  page?: number
  limit?: number
}