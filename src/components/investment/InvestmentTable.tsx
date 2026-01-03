import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Eye,
  Clock,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { AdminInvestmentRow } from "@/types/adminType";
import { InvestmentStatus } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvestmentTableProps {
  investments: AdminInvestmentRow[];
  loading: boolean;
  onViewDetails: (investment: AdminInvestmentRow) => void;
  onAction: (investment: AdminInvestmentRow, action: string) => void;
  isAdmin?: boolean;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({
  investments,
  loading,
  onViewDetails,
  onAction,
  isAdmin = false,
}) => {
  // Status badge styling
  const getStatusBadgeVariant = (status: InvestmentStatus) => {
    switch (status) {
      case "ACTIVE":
        return {
          className:
            "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
          label: "Active",
          icon: PlayCircle,
        };
      case "PENDING_PAYMENT":
        return {
          className:
            "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
          label: "Pending Payment",
          icon: Clock,
        };
      case "PAUSED":
        return {
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: "Paused",
          icon: PauseCircle,
        };
      case "COMPLETED":
        return {
          className:
            "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
          label: "Completed",
          icon: CheckCircle,
        };
      case "CANCELLED":
        return {
          className:
            "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30",
          label: "Cancelled",
          icon: XCircle,
        };
      case "REJECTED":
        return {
          className:
            "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
          label: "Rejected",
          icon: XCircle,
        };
      default:
        return {
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: status,
          icon: AlertCircle,
        };
    }
  };

  // Calculate ROI
  const calculateROI = (principal: number, rate: number, months: number) => {
    const annualROI = (principal * rate * months) / 12;
    return formatCurrency(annualROI);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 bg-wg-primary2/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (investments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-wg-accent/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-wg-accent" />
        </div>
        <h3 className="text-lg font-semibold text-wg-primary mb-2">
          No investments found
        </h3>
        <p className="text-wg-primary/60">
          No investments match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-wg-accent/20 overflow-hidden grid">
      <Table>
        <TableHeader>
          <TableRow className="border-b-wg-accent/20 hover:bg-transparent">
            <TableHead className="text-wg-primary font-medium">
              Investment ID
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              User ID
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Principal
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              ROI Rate
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Duration
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Status
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Start Date
            </TableHead>
            <TableHead className="text-wg-primary font-medium text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => {
            const statusBadge = getStatusBadgeVariant(investment.status);
            const Icon = statusBadge.icon;

            return (
              <TableRow
                key={investment.id}
                className="border-b-wg-accent/10 hover:bg-wg-primary/10"
              >
                <TableCell className="font-medium text-wg-primary">
                  <div className="text-sm">
                    {investment.id.substring(0, 8)}...
                  </div>
                  <div className="text-xs text-wg-primary/60">
                    Category: {investment.categoryId.slice(0, 8)}...
                  </div>
                </TableCell>
                <TableCell className="text-wg-primary/80">
                  {investment.userId.slice(0, 8)}...
                </TableCell>
                <TableCell className="text-wg-primary font-medium">
                  {formatCurrency(investment.principalAmount)}
                </TableCell>
                <TableCell className="text-wg-primary/80">
                  <span className="font-medium">
                    {(investment.roiRateSnapshot * 100).toFixed(2)}%
                  </span>
                  <div className="text-xs text-wg-primary/60">
                    ROI:{" "}
                    {calculateROI(
                      investment.principalAmount,
                      investment.roiRateSnapshot,
                      investment.durationMonths
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-wg-primary/80">
                  {investment.durationMonths} months
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusBadge.className}>
                    <Icon className="mr-1 h-3 w-3" />
                    {statusBadge.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-wg-primary/80 text-sm">
                  {formatDate(investment.startDate)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(investment)}
                      className="h-8 w-8 hover:bg-wg-accent/20"
                    >
                      <Eye className="h-4 w-4 text-wg-primary" />
                    </Button>

                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-wg-accent/20"
                          >
                            <MoreVertical className="h-4 w-4 text-wg-primary" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-wg-neutral border-wg-accent/20 w-48"
                        >
                          {investment.status === "PENDING_PAYMENT" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onAction(investment, "ACTIVE")}
                                className="text-green-400 hover:bg-green-500/20 cursor-pointer"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Investment
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onAction(investment, "REJECTED")}
                                className="text-red-400 hover:bg-red-500/20 cursor-pointer"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Investment
                              </DropdownMenuItem>
                            </>
                          )}

                          {investment.status === "ACTIVE" && (
                            <DropdownMenuItem
                              onClick={() => onAction(investment, "PAUSED")}
                              className="text-blue-400 hover:bg-blue-500/20 cursor-pointer"
                            >
                              <PauseCircle className="mr-2 h-4 w-4" />
                              Pause Investment
                            </DropdownMenuItem>
                          )}

                          {investment.status === "PAUSED" && (
                            <DropdownMenuItem
                              onClick={() => onAction(investment, "ACTIVE")}
                              className="text-green-400 hover:bg-green-500/20 cursor-pointer"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Resume Investment
                            </DropdownMenuItem>
                          )}

                          {(investment.status === "ACTIVE" ||
                            investment.status === "PAUSED" ||
                            investment.status === "PENDING_PAYMENT") && (
                            <DropdownMenuItem
                              onClick={() => onAction(investment, "CANCELLED")}
                              className="text-gray-400 hover:bg-gray-500/20 cursor-pointer"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Investment
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvestmentTable;
