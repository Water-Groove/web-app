import { prisma } from '@/lib/prisma';
import { Admin, Investment, InvestorBalance, InvestmentCategory, PlatformBankAccount, Transaction, User } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { AdminDto, BankDetails, InvestmenCrontDto, InvestorBalanceDto, CategoryDto, InvestmentDto, InvestmentWithCategoryDto, TransactionDto, UserDto, UserProfileSettings } from "@/types/type"
import {
  AdminTransactionRow,
  AdminInvestmentRow,
  AdminUserRow,
  AdminPenaltyRow
} from "@/types/adminType"

export const decimalToNumber = (
  value?: Prisma.Decimal | null
): number | undefined =>
  value !== null && value !== undefined ? value.toNumber() : undefined

export const dateToISOString = (
  value?: Date | null
): string | undefined =>
  value ? value.toISOString() : undefined


export const mapUserToDto = (user: User): UserDto => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone ?? undefined,
  isActive: user.isActive,
  createdAt: dateToISOString(user.createdAt)!,
  investmentCategoryId: user.investmentCategoryId! ?? undefined,
})

export const mapUserProfileToDto = (
  user: User & { investmentCategory: InvestmentCategory | null }
): UserProfileSettings => ({
  id: user.id,
  auth_id: user.auth_Id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone ?? '',
  picture: user.picture ?? '',
  isActive: user.isActive,
  createdAt: user.createdAt,
  investmentCategory: user.investmentCategory
    ? mapCategoryToDto(user.investmentCategory)
    : undefined
})



export const mapAdminToDto = (admin: Admin): AdminDto => ({
  id: admin.id,
  fullName: admin.fullName,
  email: admin.email,
  role: admin.role,
  isActive: admin.isActive,
  lastLoginAt: dateToISOString(admin.lastLoginAt),
})

export const mapInvestmentToDto = (
  investment: Investment
): InvestmentDto => ({
  id: investment.id,
  userId: investment.userId,
  categoryId: investment.categoryId,

  principalAmount: decimalToNumber(investment.principalAmount)!,
  roiRateSnapshot: decimalToNumber(investment.roiRateSnapshot)!,
  durationMonths: investment.durationMonths,

  status: investment.status,
  startDate: dateToISOString(investment.startDate),
  endDate: dateToISOString(investment.endDate),

  createdAt: dateToISOString(investment.createdAt)!,
})

export const mapInvestmentWithCategoryToDto = (
  investment: Investment & { category: InvestmentCategory },
  totalInterestEarned: number
): InvestmentWithCategoryDto => ({
  ...mapInvestmentToDto(investment),
  category: mapCategoryToDto(investment.category),
  totalInterestEarned,
})

export const mapTransactionToDto = (
  tx: Transaction
): TransactionDto => ({
  id: tx.id,
  userId: tx.userId,
  investmentId: tx.investmentId ?? undefined,

  type: tx.type,
  status: tx.status,
  amount: decimalToNumber(tx.amount)!,

  proofUrl: tx.proofUrl ?? undefined,
  description: tx.description ?? undefined,

  processedAt: dateToISOString(tx.processedAt),
  createdAt: dateToISOString(tx.createdAt)!,
})

export const mapBankDetailsToDto = (
  bankDetails: PlatformBankAccount
): BankDetails => ({
  bankName: bankDetails.bankName,
  accountNumber: bankDetails.accountNumber,
  accountHolderName: bankDetails.accountHolderName,
})

export function mapCategoryToDto(
  category: InvestmentCategory
): CategoryDto {
  return {
    id: category.id,
    code: category.code,
    name: category.name,
    priority: category.priority,

    minAmount: category.minAmount.toNumber(),
    maxAmount: Number(category.maxAmount) ?? null,
    monthlyRoiRate: category.monthlyRoiRate.toNumber(),

    durationMonths: category.durationMonths,
    description: String(category.description) ?? null,
    isActive: category.isActive,
  };
}

function toNumber(value: Prisma.Decimal | number | null | undefined): number {
  return value ? Number(value) : 0;
}

function mapInvestorBalance(
  balance: InvestorBalance
): InvestorBalanceDto {
  return {
    id: balance.id,
    principalLocked: toNumber(balance.principalLocked),
    roiAccrued: toNumber(balance.roiAccrued),
    totalDeposited: toNumber(balance.totalDeposited),
    totalWithdrawn: toNumber(balance.totalWithdrawn),
    availableBalance: toNumber(balance.availableBalance),
    lastComputedAt: balance.lastComputedAt,
    createdAt: balance.createdAt,
    updatedAt: balance.updatedAt,
  };
}

export function mapInvestmentToCronDto(
  investment: Investment & { investorBalance: InvestorBalance | null }
): InvestmenCrontDto {

  if (!investment.investorBalance) {
    throw new Error(`InvestorBalance missing for investment ${investment.id}`);
  }

  // Example ROI calculation (adjust if your logic differs)
  const roiAmount =
    (toNumber(investment.principalAmount) *
      toNumber(investment.roiRateSnapshot)) /
    100;

  return {
    id: investment.id,
    userId: investment.userId,
    processedByAdminId: investment.approvedByAdminId ?? "",
    categoryId: investment.categoryId,
    principalAmount: toNumber(investment.principalAmount),
    roiRateSnapshot: toNumber(investment.roiRateSnapshot),
    roiAmount,
    durationMonths: investment.durationMonths,
    status: investment.status,
    startDate: investment.startDate?.toISOString(),
    endDate: investment.endDate?.toISOString(),
    createdAt: investment.createdAt.toISOString(),
    investorBalance: mapInvestorBalance(investment.investorBalance),
  };
}

/* ---------------- TRANSACTION ---------------- */
export const adminTransactionSelect = {
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
} satisfies Prisma.TransactionSelect


export type AdminTransactionSelected =
  Prisma.TransactionGetPayload<{
    select: typeof adminTransactionSelect
  }>


export function mapTransactionToAdminRow(
  tx: AdminTransactionSelected
): AdminTransactionRow {
  return {
    id: tx.id,
    userId: tx.userId,
    investmentId: tx.investmentId ?? undefined,
    type: tx.type,
    status: tx.status,
    amount: Number(tx.amount),
    proofUrl: tx.proofUrl ?? undefined,
    earlyWithdrawal: tx.earlyWithdrawal,
    description: tx.description ?? undefined,
    processedAt: tx.processedAt ?? undefined,
    createdAt: tx.createdAt,

    withdrawalPenalty:
      tx.earlyWithdrawal && tx.withdrawalPenalty
        ? {
          id: tx.withdrawalPenalty.id,
          amount: Number(tx.withdrawalPenalty.amount),
          percentage: Number(tx.withdrawalPenalty.percentage),
        }
        : undefined,
  }
}



/* ---------------- INVESTMENT ---------------- */
export const adminInvestmentSelect = {
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
} satisfies Prisma.InvestmentSelect

export type AdminInvestmentSelected =
  Prisma.InvestmentGetPayload<{
    select: typeof adminInvestmentSelect
  }>

export function mapInvestmentToAdminRow(
  investment: AdminInvestmentSelected
): AdminInvestmentRow {
  return {
    id: investment.id,
    userId: investment.userId,
    categoryId: investment.categoryId,
    principalAmount: decimalToNumber(investment.principalAmount) ?? 0,
    roiRateSnapshot: decimalToNumber(investment.roiRateSnapshot) ?? 0,
    durationMonths: investment.durationMonths,
    status: investment.status,
    startDate: investment.startDate ?? undefined,
    endDate: investment.endDate ?? undefined,
    createdAt: investment.createdAt
  }
}

/* ---------------- USER ---------------- */

const adminUserSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  isActive: true,
  createdAt: true,
  investmentCategoryId: true
} satisfies Prisma.UserSelect

type AdminUserSelected = Prisma.UserGetPayload<{
  select: typeof adminUserSelect
}>

export function mapUserToAdminRow(
  user: AdminUserSelected
): AdminUserRow {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? undefined,
    isActive: user.isActive,
    investmentCategoryId: user.investmentCategoryId ?? "",
    createdAt: user.createdAt
  }
}


/* ---------------- Penaty ---------------- */

const adminPenaltySelect = {
  id: true,
  transactionId: true,
  percentage: true,
  amount: true,
  reason: true,
  createdAt: true,
} satisfies Prisma.WithdrawalPenaltySelect

type AdminPenaltySelect = Prisma.WithdrawalPenaltyGetPayload<{
  select: typeof adminPenaltySelect
}>

export function mapPeneltyToAdminRow(
  penalty: AdminPenaltySelect
): AdminPenaltyRow {
  return {
    id: penalty.id,
    transactionId: penalty.transactionId,
    percentage: Number(penalty.percentage),
    amount: Number(penalty.amount),
    reason: penalty.reason ?? "",
    createdAt: penalty.createdAt
  }
}