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
import { MoreVertical, Eye, FileText, Download } from "lucide-react";
import { AdminTransactionRow } from "@/types/adminType";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TransactionTableProps {
  transactions: AdminTransactionRow[];
  loading: boolean;
  onViewDetails: (transaction: AdminTransactionRow) => void;
  onDownloadProof: (transaction: AdminTransactionRow) => void;
  onAction: (
    transaction: AdminTransactionRow,
    action: "APPROVE" | "REJECT" | "PAID"
  ) => void;
  isAdmin?: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  onViewDetails,
  onDownloadProof,
  onAction,
  isAdmin = false,
}) => {
  // Status badge styling
  const getStatusBadgeVariant = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return {
          className:
            "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
          label: "Approved",
        };
      case TransactionStatus.PENDING:
        return {
          className:
            "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
          label: "Pending",
        };
      case TransactionStatus.PAID:
        return {
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: "Paid",
        };
      case TransactionStatus.REJECTED:
        return {
          className:
            "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30",
          label: "Rejected",
        };
      default:
        return {
          className:
            "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
          label: status,
        };
    }
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

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-wg-accent/10 flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-wg-accent" />
        </div>
        <h3 className="text-lg font-semibold text-wg-primary mb-2">
          No transactions found
        </h3>
        <p className="text-wg-primary/60">
          No deposit transactions match your current filters.
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
              Transaction ID
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              User ID
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Amount
            </TableHead>
            <TableHead className="text-wg-primary font-medium">Type</TableHead>
            <TableHead className="text-wg-primary font-medium">
              Status
            </TableHead>
            <TableHead className="text-wg-primary font-medium">
              Created
            </TableHead>
            <TableHead className="text-wg-primary font-medium text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const statusBadge = getStatusBadgeVariant(transaction.status);

            return (
              <TableRow
                key={transaction.id}
                className="border-b-wg-accent/10 hover:bg-wg-primary/10"
              >
                <TableCell className="font-medium text-wg-primary">
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {transaction.id.substring(0, 8)}...
                    </span>
                    {transaction.description && (
                      <span className="text-xs text-wg-primary/60 truncate max-w-[200px]">
                        {transaction.description}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-wg-primary/80">
                  {transaction.userId}
                </TableCell>
                <TableCell className="text-wg-primary font-medium flex-col">
                  {formatCurrency(transaction.amount)} <br />
                  {transaction.type === TransactionType.WITHDRAWAL &&
                    transaction.earlyWithdrawal && (
                      <span className="bg-wg-secondary/20 border border-wg-secondary text-wg-primary text-[10px] px-2 py-0.5 rounded-full">
                        {transaction.withdrawalPenalty?.percentage}% penalty{" "}
                        {formatCurrency(
                          transaction?.withdrawalPenalty?.amount!
                        )}
                      </span>
                    )}
                </TableCell>
                <TableCell className="text-wg-primary/80 capitalize">
                  {transaction.type.toLowerCase()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusBadge.className}>
                    {statusBadge.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-wg-primary/80 text-sm">
                  {formatDate(transaction.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(transaction)}
                      className="h-8 w-8 hover:bg-wg-accent/20"
                    >
                      <Eye className="h-4 w-4 text-wg-primary" />
                    </Button>

                    {transaction.proofUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDownloadProof(transaction)}
                        className="h-8 w-8 hover:bg-wg-accent/20"
                      >
                        <Download className="h-4 w-4 text-wg-primary" />
                      </Button>
                    )}

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
                          className="bg-wg-neutral border-wg-secondary/20 w-48"
                        >
                          {/* <DropdownMenuLabel className="text-wg-primary">
                            Admin Actions
                          </DropdownMenuLabel> */}
                          <DropdownMenuSeparator className="bg-wg-accent/20" />

                          {transaction.status === "PENDING" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onAction(transaction, "APPROVE")}
                                className="text-green-400 hover:bg-green-500/20 cursor-pointer"
                              >
                                <span className="mr-2">✓</span>
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onAction(transaction, "REJECT")}
                                className="text-red-400 hover:bg-red-500/20 cursor-pointer"
                              >
                                <span className="mr-2">✗</span>
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onAction(transaction, "PAID")}
                                className="text-blue-400 hover:bg-blue-500/20 cursor-pointer"
                              >
                                <span className="mr-2">✗</span>
                                Paid
                              </DropdownMenuItem>
                            </>
                          )}

                          {/* {(transaction.status === TransactionStatus.APPROVED || transaction.status === TransactionStatus.PENDING) && (
                            <DropdownMenuItem 
                              onClick={() => onAction(transaction, 'APPROVE')}
                              className="text-gray-400 hover:bg-gray-500/20 cursor-pointer"
                            >
                              <span className="mr-2">⊖</span>
                              Cancel Transaction
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator className="bg-wg-accent/20" />
                          <DropdownMenuItem 
                            onClick={() => onAction(transaction, 'REJECT')}
                            className="text-yellow-400 hover:bg-yellow-500/20 cursor-pointer"
                          >
                            <span className="mr-2">↺</span>
                            Process Refund
                          </DropdownMenuItem> */}
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

export default TransactionTable;
