import { InvestmentDto } from "@/types/type";
import { Prisma, TransactionStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "Not Set";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatCurrency = (amount: number): string => {
  const absAmount = Math.abs(amount);

  const format = (value: number, suffix: string) =>
    `₦${Number(value.toFixed(2))}${suffix}`;

  if (absAmount >= 1_000_000_000) {
    return format(amount / 1_000_000_000, "B");
  }

  if (absAmount >= 1_000_000) {
    return format(amount / 1_000_000, "M");
  }

  if (absAmount >= 1_000) {
    return format(amount / 1_000, "K");
  }

  // Less than 1k → normal currency format
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};


export const getStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.APPROVED:
    case TransactionStatus.PAID:
      return "bg-green-100 text-green-800";
    case TransactionStatus.PENDING:
      return "bg-amber-100 text-amber-800";
    case TransactionStatus.REJECTED:
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

// Utility functions for investment calculations
export function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function calculateEstimatedROI(
  principal: number,
  annualRate: number,
  months: number
): { total: number; monthly: number } {
  const monthlyRate = annualRate / 12 / 100;
  const total = principal * monthlyRate * months;
  const monthly = principal * monthlyRate;

  return {
    total: Number(total.toFixed(2)),
    monthly: Number(monthly.toFixed(2)),
  };
}

export const calculateEstimatedReturns = (investment: InvestmentDto) => {
  const monthlyReturn = (investment.principalAmount * investment.roiRateSnapshot) / 100;
  const totalReturn = monthlyReturn * investment.durationMonths;
  return totalReturn;
};


export function buildOrder(
  order?: Prisma.SortOrder
): Prisma.InvestmentOrderByWithRelationInput {
  return {
    createdAt: order ?? "desc"
  }
}

export function buildDateFilter(date?: Date) {
  if (!date) return undefined

  const start = new Date(date)
  start.setHours(0, 0, 0, 0)

  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  return { gte: start, lte: end }
}

export function paginate(page = 1, limit = 20) {
  return {
    skip: (page - 1) * limit,
    take: limit
  }
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit)

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  }
}

export const calculateROI = (principal: number, rate: number, months: number) => {
  const annualROI = (principal * rate * months) / 12;
  return formatCurrency(annualROI);
};