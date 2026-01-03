import { prisma } from './prisma';

export const db = {
  user: prisma.user,
  admin: prisma.admin,
  investmentCategory: prisma.investmentCategory,
  investment: prisma.investment,
  transaction: prisma.transaction,
  platformBankAccount: prisma.platformBankAccount,
  investorBalance: prisma.investorBalance,
  withdrawalDetail: prisma.withdrawalDetail,
  $transaction : prisma.$transaction
};

export type DB = typeof db;
