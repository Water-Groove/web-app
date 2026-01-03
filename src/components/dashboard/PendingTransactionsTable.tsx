import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { DashboardOverviewData } from "@/types/type";
import { TransactionStatus, TransactionType } from "@prisma/client";
import Link from "next/link";

// Memoized helper functions
const getStatusIcon = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.APPROVED:
    case TransactionStatus.PAID:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case TransactionStatus.PENDING:
      return <Clock className="h-4 w-4 text-amber-500" />;
    case TransactionStatus.REJECTED:
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export const PendingTransactionsTable = ({
  transactions,
}: {
  transactions: DashboardOverviewData["pendingTransactions"];
}) => (
  <Card>
   
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    transaction.type === TransactionType.DEPOSIT
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  <Badge
                    variant="secondary"
                    className={getStatusColor(transaction.status)}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 pb-5">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-muted-foreground">
          Showing {transactions.length} pending transactions
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs">Rejected</span>
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
);
