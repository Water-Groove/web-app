"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Upload,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  PieChart,
  TrendingUp,
  DollarSign,
  Wallet,
  BarChart3,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryDto, DashboardOverviewData } from "@/types/type";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OverviewItem } from "@/components/ui/overview-Item";
import Link from "next/link";
import { ActiveInvestmentsTable } from "@/components/dashboard/ActiveInvestmentsTable";
import { PendingTransactionsTable } from "@/components/dashboard/PendingTransactionsTable";
import { DepositModal } from "@/components/modals/deposit-modal";
import { WithdrawalModal } from "@/components/modals/withdrawal-modal";
import { UpgradeTierModal } from "@/components/modals/upgrade-tier-modal";

interface DashboardClientProps {
  data: DashboardOverviewData;
  categories: CategoryDto[] | [];
}

const formatTier = (tier?: string) => {
  if (!tier) return "Not Set";
  return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
};

export default function DashboardClient({
  data,
  categories,
}: DashboardClientProps) {
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showWithdrawalModal, setShowWithdrawalModal] =
    useState<boolean>(false);
  const [showUpgradeTierModal, setShowUpgradeTierModal] =
    useState<boolean>(false);

  const {
    user,
    category,
    wallet,
    activeInvestments,
    pendingTransactions,
    nextRoiDate,
  } = data;

  // Calculate derived values with useMemo for performance
  const calculatedValues = useMemo(() => {
    const totalInvested = activeInvestments.reduce(
      (sum, investment) => sum + investment.principalAmount,
      0
    );

    const totalInterestEarned = activeInvestments.reduce(
      (sum, investment) => sum + investment.totalInterestEarned,
      0
    );

    const memberSince = new Date();
    const today = new Date();
    const daysActive = Math.floor(
      (today.getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      totalInvested,
      totalInterestEarned,
      daysActive,
    };
  }, [activeInvestments, user.createdAt]);

  return (
    <div className="space-y-6">
      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Balance Card - Enhanced gradient with better colors */}
          <Card className="border-0 shadow-lg bg-wg-primary text-white overflow-hidden relative">
            {/* Subtle pattern overlay */}
            {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div> */}

            <CardHeader className="pb-3 relative z-10">
              {category?.code && (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {formatTier(category.code)} Investor
                  </CardTitle>
                  <Badge className="gap-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 text-white shadow-sm">
                    <Shield className="h-3 w-3" />
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              )}
              <CardDescription className="text-blue-100">
                Welcome back,{" "}
                <span className="text-wg-secondary font-bold">
                  {user.fullName}!
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-sm text-blue-100">
                <span>Current Balance</span>
                <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  NGN
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                  {viewBalance
                    ? formatCurrency(wallet.availableBalance)
                    : "₦ *******"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewBalance((p) => !p)}
                  className="text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  {viewBalance ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex flex-col gap-1 text-[10px] text-blue-100">
                <span>Principal</span>
                <span className="text-xs md:text-sm font-bold text-white drop-shadow-sm">
                  {viewBalance
                    ? formatCurrency(wallet.principalBalance)
                    : "₦ *******"}
                </span>
              </div>

              {nextRoiDate && (
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <Calendar className="h-4 w-4" />
                  <span>Next ROI: {formatDate(nextRoiDate)}</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="text-xs text-wg-secondary relative z-10 pb-5">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Member since {formatDate(user.createdAt)}</span>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions - Enhanced with cohesive design */}
          <Card className="border border-wg-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-wg-neutral to-wg-neutral/95 overflow-hidden group/card">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-accent via-wg-secondary to-wg-primary/0"></div>

            <CardHeader className="pb-3 pt-5 px-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-wg-primary flex items-center gap-3 text-xl font-bold">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-wg-accent/20 to-wg-accent/5 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-wg-accent" />
                    </div>
                    <div>
                      Quick Actions
                      <div className="text-sm font-normal text-wg-primary/60 mt-1">
                        Manage your investments swiftly
                      </div>
                    </div>
                  </CardTitle>
                </div>
                <div className="hidden sm:block">
                  <Badge className="bg-wg-accent/10 text-wg-accent hover:bg-wg-accent/20 border-0 px-3 py-1">
                    Fast Access
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2 px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                {/* Deposit Button */}
                <Button
                  className="h-28 sm:h-32 flex flex-col gap-3 p-4 bg-gradient-to-br from-wg-primary/95 to-wg-primary hover:from-wg-primary hover:to-wg-primary/90 text-wg-neutral transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-wg-accent/20 group/deposit"
                  onClick={() => setShowDepositModal(true)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover/deposit:bg-white/30 transition-all"></div>
                    <div className="relative p-3 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm">
                      <Upload className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-semibold tracking-wide">
                      Deposit
                    </span>{" "}
                    <br />
                    <span className="text-xs text-wg-neutral/80 group-hover/deposit:text-wg-neutral">
                      Add funds to wallet
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 opacity-0 group-hover/deposit:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 text-white/60" />
                  </div>
                </Button>

                {/* Withdraw Button */}
                <Button
                  className="h-28 sm:h-32 flex flex-col gap-3 p-4 bg-gradient-to-br from-wg-secondary/95 to-wg-secondary hover:from-wg-secondary hover:to-wg-secondary/90 text-wg-primary transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-wg-secondary/20 group/withdraw"
                  onClick={() => setShowWithdrawalModal(true)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-wg-primary/10 rounded-full blur-sm group-hover/withdraw:bg-wg-primary/20 transition-all"></div>
                    <div className="relative p-3 rounded-full bg-gradient-to-br from-wg-primary/20 to-wg-primary/10">
                      <Download className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-semibold tracking-wide">
                      Withdraw
                    </span>{" "}
                    <br />
                    <span className="text-xs text-wg-primary/70 group-hover/withdraw:text-wg-primary">
                      Withdraw funds
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 opacity-0 group-hover/withdraw:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 text-wg-primary/60" />
                  </div>
                </Button>

                {/* Upgrade Tier Button - Disabled with better styling */}
                <div className="relative group/upgrade">
                  <div className="absolute inset-0 bg-gradient-to-br from-wg-primary/5 to-wg-primary/0 rounded-lg border-2 border-dashed border-wg-primary/20 group-hover/upgrade:border-wg-primary/30 transition-all duration-300"></div>

                  <Button
                    className="h-28 sm:h-32 flex flex-col gap-3 p-4 w-full relative bg-gradient-to-br from-wg-neutral to-wg-neutral/50 text-wg-primary/60 transition-all duration-300 border-0 cursor-not-allowed group-hover/upgrade:bg-wg-neutral/70"
                    disabled
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-100/30 rounded-full blur-sm"></div>
                      <div className="relative p-3 rounded-full bg-gradient-to-br from-violet-200/50 to-violet-100/30">
                        <TrendingUp className="h-6 w-6 text-violet-500/70" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-sm font-semibold tracking-wide text-wg-primary/70">
                        Upgrade Tier
                      </span>{" "}
                      <br />
                      <span className="text-xs text-wg-primary/50">
                        Coming soon
                      </span>
                    </div>

                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500/20 to-violet-400/20 text-violet-600/80 border-0 text-xs px-2 py-0.5">
                      Soon
                    </Badge>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/upgrade:opacity-100 transition-opacity">
                      <div className="bg-wg-primary/10 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-xs font-medium text-wg-primary/70">
                          Feature in development
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Quick Stats Footer */}
              <div className="mt-6 pt-4 border-t border-wg-primary/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-wg-accent/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-wg-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-wg-primary/50">
                        Processing Time
                      </div>
                      <div className="text-sm font-medium text-wg-primary">
                        1-2 Hours
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-wg-secondary/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-wg-secondary" />
                    </div>
                    <div>
                      <div className="text-xs text-wg-primary/50">Security</div>
                      <div className="text-sm font-medium text-wg-primary">
                        Bank-Level
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Summary Card - Enhanced with cohesive design */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-blue-600" />
                  Wallet Summary
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Financial Overview
                </CardDescription>
              </div>
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-700">
                <Wallet className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 hover:bg-blue-100/70 transition-colors duration-150">
                <span className="text-slate-700 font-medium">
                  Total Deposits
                </span>
                <span className="font-semibold text-blue-700">
                  {formatCurrency(wallet.totalDeposits)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/50 hover:bg-amber-100/70 transition-colors duration-150">
                <span className="text-slate-700 font-medium">
                  Pending Deposits
                </span>
                <span className="font-semibold text-amber-700">
                  {formatCurrency(wallet.pendingDeposits)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-rose-50 to-rose-100/50 hover:bg-rose-100/70 transition-colors duration-150">
                <span className="text-slate-700 font-medium">
                  Total Withdrawals
                </span>
                <span className="font-semibold text-rose-700">
                  -{formatCurrency(wallet.totalWithdrawals)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/50 hover:bg-amber-100/70 transition-colors duration-150">
                <span className="text-slate-700 font-medium">
                  Pending Withdrawals
                </span>
                <span className="font-semibold text-amber-700">
                  {formatCurrency(wallet.pendingWithdrawals)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:bg-emerald-100/70 transition-colors duration-150">
                <span className="text-slate-700 font-medium">
                  Total Interest
                </span>
                <span className="font-semibold text-emerald-700">
                  +{formatCurrency(wallet.totalInterest)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Card - Enhanced with gradient header */}
        <Card className="lg:col-span-3 border border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-300" />
              Investment Overview
            </CardTitle>
            <CardDescription className="text-slate-300">
              Active investments summary
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <OverviewItem
                label="Active Investments"
                value={activeInvestments.length.toString()}
                icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:border-blue-300 transition-colors duration-200"
                // valueClassName="text-blue-700"
              />
              <OverviewItem
                label="Total Invested"
                value={formatCurrency(calculatedValues.totalInvested)}
                icon={<DollarSign className="h-4 w-4 text-emerald-600" />}
                className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 hover:border-emerald-300 transition-colors duration-200"
                // valueClassName="text-emerald-700"
              />
              <OverviewItem
                label="Total Interest Earned"
                value={`+${formatCurrency(
                  calculatedValues.totalInterestEarned
                )}`}
                positive
                icon={<TrendingUp className="h-4 w-4 text-violet-600" />}
                className="bg-gradient-to-br from-violet-50 to-white border border-violet-200 hover:border-violet-300 transition-colors duration-200"
                // valueClassName="text-violet-700"
              />
              <OverviewItem
                label="Active Days"
                value={calculatedValues.daysActive.toString()}
                icon={<Calendar className="h-4 w-4 text-amber-600" />}
                className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 hover:border-amber-300 transition-colors duration-200"
                // valueClassName="text-amber-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Investments Table */}
        {activeInvestments.length > 0 && (
          <Card className="lg:col-span-3 ">
            <CardHeader>
              <CardTitle>Active Investments</CardTitle>
              <CardDescription>Your current investment plans</CardDescription>
            </CardHeader>
            <ActiveInvestmentsTable investments={activeInvestments} />
          </Card>
        )}

        {/* Pending Transactions */}
        {pendingTransactions.length > 0 && (
          <Card className="lg:col-span-3 bg-wg-accent">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription className="text-white">
                  Transactions awaiting approval
                </CardDescription>
              </div>
              <Link href="/dashboard/transactions">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-wg-primary text-white hover:bg-wg-primary/50"
                >
                  View All
                </Button>
              </Link>
            </CardHeader>
            <PendingTransactionsTable transactions={pendingTransactions} />
          </Card>
        )}
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        investmentCategories={categories}
        onClose={() => setShowDepositModal(false)}
      />

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        availableBalance={wallet.availableBalance}
        principalLocked={wallet.principalBalance}
      />

      {category?.code && (
        <UpgradeTierModal
          isOpen={showUpgradeTierModal}
          onClose={() => setShowUpgradeTierModal(false)}
          investmentCategories={categories}
          currentTier={category?.code}
        />
      )}
    </div>
  );
}
