"use client";

import { InvestmentDto } from "@/types/type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  formatDate,
  formatCurrency,
  calculateEstimatedReturns,
} from "@/lib/utils";
import {
  TrendingUp,
  Calendar,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  PauseCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  Eye,
  History,
  Plus,
} from "lucide-react";
import { InvestmentStatus } from "@prisma/client";

interface InvestmentClientProps {
  investments: InvestmentDto[] | null;
  onCreateInvestment?: () => void;
  onViewDetails?: (investment: InvestmentDto) => void;
}

const InvestmentClient = ({
  investments,
  onCreateInvestment,
  onViewDetails,
}: InvestmentClientProps) => {
  const getStatusConfig = (status: InvestmentStatus) => {
    const configs = {
      [InvestmentStatus.PENDING_PAYMENT]: {
        label: "Pending Payment",
        color: "bg-amber-500 text-amber-50",
        icon: Clock,
        bgColor: "bg-amber-50",
        textColor: "text-amber-800",
        description: "Awaiting payment confirmation",
      },
      [InvestmentStatus.ACTIVE]: {
        label: "Active",
        color: "bg-emerald-500 text-emerald-50",
        icon: Zap,
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-800",
        description: "Currently earning returns",
      },
      [InvestmentStatus.PAUSED]: {
        label: "Paused",
        color: "bg-slate-500 text-slate-50",
        icon: PauseCircle,
        bgColor: "bg-slate-50",
        textColor: "text-slate-800",
        description: "Investment temporarily paused",
      },
      [InvestmentStatus.COMPLETED]: {
        label: "Completed",
        color: "bg-blue-500 text-blue-50",
        icon: CheckCircle,
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        description: "Successfully completed",
      },
      [InvestmentStatus.CANCELLED]: {
        label: "Cancelled",
        color: "bg-rose-500 text-rose-50",
        icon: XCircle,
        bgColor: "bg-rose-50",
        textColor: "text-rose-800",
        description: "Investment cancelled",
      },
      [InvestmentStatus.REJECTED]: {
        label: "Rejected",
        color: "bg-red-500 text-red-50",
        icon: AlertCircle,
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        description: "Investment rejected",
      },
    };

    return configs[status];
  };

  const calculateProgress = (investment: InvestmentDto) => {
    if (!investment.startDate || !investment.endDate) return 0;

    const start = new Date(investment.startDate);
    const end = new Date(investment.endDate);
    const now = new Date();

    if (now >= end) return 100;
    if (now <= start) return 0;

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();

    return Math.min(Math.round((elapsed / totalDuration) * 100), 100);
  };

  const formatInvestmentId = (id: string) => {
    return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
  };

  if (!investments || investments.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="border border-wg-primary/10 shadow-lg max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-wg-primary/10 to-wg-accent/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-10 w-10 text-wg-primary/60" />
            </div>
            <CardTitle className="text-wg-primary">
              No Investments Yet
            </CardTitle>
            <CardDescription className="text-wg-primary/60">
              Start your investment journey today and watch your money grow
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-wg-primary/50 mb-6">
              Create your first investment to start earning returns
            </p>
            {onCreateInvestment && (
              <Button
                onClick={onCreateInvestment}
                className="bg-gradient-to-r from-wg-accent to-wg-accent/90 hover:from-wg-accent/90 hover:to-wg-accent shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Investment
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Group investments by status
  const activeInvestments = investments.filter(
    (i) => i.status === InvestmentStatus.ACTIVE
  );
  const pendingInvestments = investments.filter(
    (i) => i.status === InvestmentStatus.PENDING_PAYMENT
  );
  const completedInvestments = investments.filter(
    (i) => i.status === InvestmentStatus.COMPLETED
  );
  const includedStatuses: readonly InvestmentStatus[] = [
    InvestmentStatus.ACTIVE,
    InvestmentStatus.PENDING_PAYMENT,
    InvestmentStatus.COMPLETED,
  ];

  const otherInvestments = investments.filter(
    (i) => !includedStatuses.includes(i.status)
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-wg-primary to-wg-primary2 rounded-2xl p-6 text-wg-neutral shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              My Investments
            </h1>
            <p className="text-wg-neutral/80">
              Track and manage all your investment portfolios in one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {activeInvestments.length}
              </div>
              <div className="text-sm text-wg-neutral/80">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{investments.length}</div>
              <div className="text-sm text-wg-neutral/80">Total</div>
            </div>
            {onCreateInvestment && (
              <Button
                onClick={onCreateInvestment}
                className="bg-gradient-to-r from-wg-secondary to-wg-secondary/90 hover:from-wg-secondary/90 hover:to-wg-secondary text-wg-primary shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Investment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-wg-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-wg-primary/60">
                  Total Invested
                </div>
                <div className="text-2xl font-bold text-wg-primary mt-2">
                  {formatCurrency(
                    investments.reduce(
                      (sum, inv) => sum + inv.principalAmount,
                      0
                    )
                  )}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-wg-primary/10 to-wg-primary/5 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-wg-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-wg-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-wg-primary/60">
                  Monthly Active Returns
                </div>
                <div className="text-2xl font-bold text-emerald-600 mt-2">
                  {formatCurrency(
                    activeInvestments.reduce(
                      (sum, inv) => sum + calculateEstimatedReturns(inv),
                      0
                    )
                  )}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-wg-primary/10 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-wg-primary/60">
                  Completion Rate
                </div>
                <div className="text-2xl font-bold text-wg-accent mt-2">
                  {Math.round(
                    (completedInvestments.length / investments.length) * 100
                  )}
                  %
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-wg-accent/10 to-wg-accent/5 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-wg-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Investments */}
      {activeInvestments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-wg-primary flex items-center gap-2">
              <Zap className="h-5 w-5 text-wg-secondary" />
              Active Investments
            </h2>
            <Badge className="bg-wg-secondary text-wg-primary hover:bg-wg-secondary/90">
              {activeInvestments.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeInvestments.map((investment) => {
              const statusConfig = getStatusConfig(investment.status);
              const progress = calculateProgress(investment);
              const estimatedReturns = calculateEstimatedReturns(investment);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={investment.id}
                  className="border border-wg-primary/10 shadow-md hover:shadow-lg transition-shadow duration-200 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-wg-primary flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-wg-accent/20 to-wg-accent/5 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-wg-accent" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">
                              {formatCurrency(investment.principalAmount)}
                            </div>
                            <div className="text-xs text-wg-primary/50 font-mono mt-1">
                              ID: {formatInvestmentId(investment.id)}
                            </div>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-wg-primary/60 mt-2">
                          {investment.durationMonths} months •{" "}
                          {investment.roiRateSnapshot}% ROI
                        </CardDescription>
                      </div>
                      <Badge className={`${statusConfig.color} gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-wg-primary/70">
                          Investment Progress
                        </span>
                        <span className="font-medium text-wg-primary">
                          {progress}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-wg-primary/50">
                          Start Date
                        </div>
                        <div className="text-sm font-medium text-wg-primary flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {investment.startDate
                            ? formatDate(investment.startDate)
                            : "Not started"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-wg-primary/50">
                          End Date
                        </div>
                        <div className="text-sm font-medium text-wg-primary flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {investment.endDate
                            ? formatDate(investment.endDate)
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Returns Preview */}
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-emerald-800/70">
                            Monthly Estimated Returns
                          </div>
                          <div className="text-lg font-bold text-emerald-700">
                            +{formatCurrency(estimatedReturns)}
                          </div>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-wg-primary/5 p-2">
                    <Button
                      onClick={() => onViewDetails?.(investment)}
                      variant="outline"
                      className="w-full border-wg-primary/20 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-accent/30 group-hover:border-wg-accent/50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Pending Investments */}
      {pendingInvestments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-wg-primary flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Investments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingInvestments.map((investment) => {
              const statusConfig = getStatusConfig(investment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={investment.id}
                  className="border border-amber-200 bg-gradient-to-br from-amber-50/30 to-amber-50/10"
                >
                  <CardHeader>
                    <CardTitle className="text-wg-primary flex items-center justify-between">
                      <span>{formatCurrency(investment.principalAmount)}</span>
                      <Badge className="bg-amber-500 text-amber-50 gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-wg-primary/60">
                      {investment.durationMonths} months •{" "}
                      {investment.roiRateSnapshot}% ROI
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-amber-700 bg-amber-100/50 p-3 rounded-lg">
                      Please complete your payment to activate this investment
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Investments */}
      {otherInvestments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-wg-primary flex items-center gap-2">
            <History className="h-5 w-5 text-wg-primary/60" />
            Other Investments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherInvestments.map((investment) => {
              const statusConfig = getStatusConfig(investment.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={investment.id}
                  className="border border-wg-primary/10"
                >
                  <CardHeader>
                    <CardTitle className="text-wg-primary flex items-center justify-between">
                      <span>{formatCurrency(investment.principalAmount)}</span>
                      <Badge className={`${statusConfig.color} gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-wg-primary/60">
                      {investment.durationMonths} months •{" "}
                      {investment.roiRateSnapshot}% ROI
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="text-sm text-wg-primary/70">
                      {statusConfig.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Investments */}
      {completedInvestments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-wg-primary flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            Completed Investments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedInvestments.map((investment) => {
              const statusConfig = getStatusConfig(investment.status);
              const StatusIcon = statusConfig.icon;
              const estimatedReturns = calculateEstimatedReturns(investment);

              return (
                <Card
                  key={investment.id}
                  className="border border-emerald-200 bg-gradient-to-br from-emerald-50/30 to-emerald-50/10"
                >
                  <CardHeader>
                    <CardTitle className="text-wg-primary flex items-center justify-between">
                      <span>{formatCurrency(investment.principalAmount)}</span>
                      <Badge className="bg-emerald-500 text-emerald-50 gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-wg-primary/60">
                      Completed • {investment.durationMonths} months
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-emerald-800/70">
                            Total Returns Earned
                          </div>
                          <div className="text-lg font-bold text-emerald-700">
                            +{formatCurrency(estimatedReturns)}
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>

                    {investment.endDate && (
                      <div className="text-sm text-wg-primary/70">
                        Completed on {formatDate(investment.endDate)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentClient;
