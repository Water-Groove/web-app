import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AdminTransactionRow } from "@/types/adminType";
import {
  Calendar,
  DollarSign,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Banknote,
} from "lucide-react";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: AdminTransactionRow | null;
  onAction: (
    transaction: AdminTransactionRow,
    action: "APPROVE" | "REJECT"
  ) => void;
  isAdmin?: boolean;
}

type StatusCongigProps = {
  icon?: React.ElementType;
  className: string;
  label: string;
};

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onAction,
  isAdmin = false,
}) => {
  if (!transaction) return null;

  // Status configuration
  const getStatusConfig = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return {
          icon: CheckCircle,
          className:
            "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
          label: "Completed",
        };
      case TransactionStatus.PENDING:
        return {
          icon: Clock,

          className:
            "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
          label: "Pending",
        };
      case TransactionStatus.PAID:
        return {
          icon: Banknote,
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: "Paid",
        };
      case TransactionStatus.REJECTED:
        return {
          icon: XCircle,
          className:
            "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30",
          label: "Cancelled",
        };
      default:
        return {
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: status,
        };
    }
  };

  const statusConfig = getStatusConfig(transaction.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-wg-neutral border-wg-accent/20 text-wg-primary max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Transaction Details</DialogTitle>
          <DialogDescription className="text-wg-primary/60">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={statusConfig.className}>
              {statusConfig.icon && <statusConfig.icon className="h-4 w-4" />}
              <span>{statusConfig.label}</span>
            </Badge>
            <span className="text-sm text-wg-primary/60 capitalize">
              {transaction.type.toLowerCase()} Transaction
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-wg-primary/60 capitalize">
              {formatCurrency(transaction.amount)} <br />
            </span>
            <Badge variant="outline">
              {transaction.type === TransactionType.WITHDRAWAL &&
                transaction.earlyWithdrawal && (
                  <span className="bg-wg-secondary/20 border border-wg-secondary text-wg-primary text-[10px] px-2 py-0.5 rounded-full">
                    {transaction.withdrawalPenalty?.percentage}% penalty for early withdrawal (Inmature Investment){" "}
                    {formatCurrency(transaction?.withdrawalPenalty?.amount!)}
                  </span>
                )}
            </Badge>
            
          </div>

          <Separator className="bg-wg-accent/20" />
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Amount:</span>
              </div>
              <p className="text-2xl font-bold text-wg-primary">
                {formatCurrency(transaction.amount)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">User ID:</span>
              </div>
              <p className="font-medium text-wg-primary">
                {transaction.userId}
              </p>
            </div>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Created:</span>
              </div>
              <p className="text-wg-primary">
                {formatDate(transaction.createdAt)}
              </p>
            </div>

            {transaction.processedAt && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-wg-accent" />
                  <span className="text-sm text-wg-primary/60">Processed:</span>
                </div>
                <p className="text-wg-primary">
                  {formatDate(transaction.processedAt)}
                </p>
              </div>
            )}
          </div>
          {/* Investment ID */}
          {transaction.investmentId && (
            <div className="space-y-2">
              <span className="text-sm text-wg-primary/60">Investment ID:</span>
              <p className="text-wg-primary font-mono text-sm bg-wg-primary/10 p-2 rounded">
                {transaction.investmentId}
              </p>
            </div>
          )}
          {/* Description */}
          {transaction.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Description:</span>
              </div>
              <p className="text-wg-primary bg-wg-primary/10 p-3 rounded">
                {transaction.description}
              </p>
            </div>
          )}
          {/* Proof URL */}
          {transaction.proofUrl && (
            <div className="space-y-2">
              <span className="text-sm text-wg-primary/60">
                Proof Document:
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(transaction.proofUrl, "_blank")}
                  className="border-wg-accent/30 text-wg-accent hover:bg-wg-accent/10"
                >
                  View Proof
                </Button>
                <span className="text-xs text-wg-primary/40">
                  Click to open in new tab
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-wg-accent/30 text-wg-primary hover:bg-wg-accent/10"
          >
            Close
          </Button>

          {isAdmin && transaction.status === "PENDING" && (
            <>
              <Button
                onClick={() => {
                  onAction(transaction, "APPROVE");
                  onClose();
                }}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Approve Deposit
              </Button>
              <Button
                onClick={() => {
                  onAction(transaction, "REJECT");
                  onClose();
                }}
                variant="destructive"
              >
                Reject Deposit
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
