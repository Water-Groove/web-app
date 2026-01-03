"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StatsCard } from "@/components/ui/StatsCard";
import {
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  AdminTransactionRow,
  AdminTransactionQueryParams,
  PaginatedResponse,
} from "@/types/adminType";
import { TransactionStatus, TransactionType } from "@prisma/client";
import TransactionTable from "@/components/transaction/TransactionTable";
import TransactionDetailsModal from "@/components/transaction/TransactionDetailsModal";
import { formatCurrency } from "@/lib/utils";
import { ApiResponse } from "@/types/type";
import { toast } from "react-toastify";

interface DepositClientProps {
  initialTransactions: AdminTransactionRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isAdmin: boolean;
  adminId: string;
}

// Stats Icons
const StatsIcons = {
  total: <TrendingUp className="w-6 h-6 text-wg-accent" />,
  pending: <AlertCircle className="w-6 h-6 text-yellow-500" />,
  completed: <CheckCircle className="w-6 h-6 text-green-500" />,
};

const DepositClient: React.FC<DepositClientProps> = ({
  initialTransactions,
  total: initialTotal,
  page: initialPage,
  limit: initialLimit,
  totalPages: initialTotalPages,
  isAdmin,
  adminId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transactions, setTransactions] =
    useState<AdminTransactionRow[]>(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<AdminTransactionRow | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const [currentTotal, setCurrentTotal] = useState(initialTotal);
  const [currentTotalPages, setCurrentTotalPages] = useState(initialTotalPages);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<AdminTransactionQueryParams>(() => {
    const params: AdminTransactionQueryParams = {
      page: initialPage,
      limit: initialLimit,
    };

    const status = searchParams.get("status");
    const order = searchParams.get("order");
    const date = searchParams.get("date");
    const transactionId = searchParams.get("transactionId");

    if (status && status !== "all") {
      params.status = status as TransactionStatus;
    }
    if (order === "asc" || order === "desc") {
      params.order = order;
    }
    if (date) {
      params.date = new Date(date);
    }
    if (transactionId) {
      params.transactionId = transactionId;
    }

    return params;
  });

  // Build query string from filters
  const buildQueryString = useCallback(
    (filterParams: AdminTransactionQueryParams) => {
      const params = new URLSearchParams();

      // Always include page and limit
      params.set("page", (filterParams.page || 1).toString());
      params.set("limit", (filterParams.limit || 20).toString());
      params.set("type", "DEPOSIT"); // Always filter by deposit type

      // Add optional filters
      if (filterParams.status && filterParams.status) {
        params.set("status", filterParams.status);
      }
      if (filterParams.order) {
        params.set("order", filterParams.order);
      }
      if (filterParams.date) {
        params.set("date", filterParams.date.toISOString());
      }
      if (filterParams.transactionId) {
        params.set("transactionId", filterParams.transactionId);
      }

      return params.toString();
    },
    []
  );

  // Update URL with filters
  const updateURL = useCallback(
    (filterParams: AdminTransactionQueryParams) => {
      const queryString = buildQueryString(filterParams);
      router.push(`/admin/deposits?${queryString}`);
    },
    [router, buildQueryString]
  );

  // Fetch deposits with filters
  const fetchDeposits = useCallback(async () => {
    setLoading(true);
    try {
      const queryString = buildQueryString(filters);
      const res = await fetch(`/api/admin/transactions?${queryString}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result: ApiResponse<PaginatedResponse<AdminTransactionRow[]>> =
        await res.json();

      if (result.success && result.data) {
        setTransactions(result.data.data || []);
        setCurrentPage(result.data.page);
        setCurrentLimit(result.data.limit);
        setCurrentTotal(result.data.total);
        setCurrentTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, buildQueryString]);

  // Initial fetch on mount if URL params differ from initial props
  useEffect(() => {
    const hasFilterParams =
      searchParams.get("status") ||
      searchParams.get("order") ||
      searchParams.get("date") ||
      searchParams.get("transactionId");

    if (hasFilterParams) {
      fetchDeposits();
    }
  }, []); // Empty dependency array for initial mount only

  // Fetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDeposits();
      updateURL(filters);
    }, 300); // Debounce API calls

    return () => clearTimeout(timer);
  }, [filters, fetchDeposits, updateURL]);

  // Calculate stats
  const stats = useMemo(() => {
    const pendingDeposits = transactions.filter(
      (t) => t.status === TransactionStatus.PENDING
    ).length;
    const completedDeposits = transactions.filter(
      (t) => t.status === TransactionStatus.APPROVED
    ).length;
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalDeposits: currentTotal,
      pendingDeposits,
      completedDeposits,
      totalAmount,
    };
  }, [transactions, currentTotal]);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof AdminTransactionQueryParams,
    value: any
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" || value === "all" ? undefined : value,
      page: 1, // Reset to first page when filters change
    }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: currentLimit,
    });
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setFilters((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }));
    setCurrentLimit(newLimit);
  };

  // Handle transaction actions
  const handleTransactionAction = async (
    transaction: AdminTransactionRow,
    action: "APPROVE" | "REJECT" | "PAID"
  ) => {
    try {
      console.log(`Action: ${action} on transaction: ${transaction.id}`);

      let newStatus: TransactionStatus;
      let endpoint: string;

      switch (action) {
        case "APPROVE":
          newStatus = TransactionStatus.APPROVED;
          endpoint = "approve";
          break;
        case "REJECT":
          newStatus = TransactionStatus.REJECTED;
          endpoint = "reject";
          break;
        default:
          return;
      }

      const res = await fetch(
        `/api/admin/transactions/deposit/${transaction.id}/${endpoint}`,
        { method: "PATCH" }
      );

      const result = await res.json()

      
      if (!res.ok) {
        return toast.error(result.message || "Failed to update transaction")
      }
  
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transaction.id
            ? { ...t, status: newStatus, processedAt: new Date() }
            : t
        )
      );

      toast.success(
        `Transaction ${transaction.id} ${
          action === "APPROVE" ? "approved" : "rejected"
        } successfully`
      );
    } catch (error) {
      console.error("Error processing action:", error);
      toast.error("Failed to process action");
    }
  };

  return (
    <div className="min-h-screen bg-wg-neutral">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Deposits"
          value={stats.totalDeposits.toString()}
          description="All deposit transactions"
          icon={StatsIcons.total}
        />
        <StatsCard
          title="Pending Deposits"
          value={stats.pendingDeposits.toString()}
          description="Awaiting approval"
          icon={StatsIcons.pending}
        />
        <StatsCard
          title="Completed Deposits"
          value={stats.completedDeposits.toString()}
          description="Successfully processed"
          icon={StatsIcons.completed}
        />
        <StatsCard
          title="Total Amount"
          value={formatCurrency(stats.totalAmount)}
          description="Sum of all deposits"
          icon={
            <div className="p-2 rounded-full bg-wg-accent/10">
              <span className="text-wg-accent font-bold">$</span>
            </div>
          }
        />
      </div>

      {/* Filters Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20 mb-6">
        <CardHeader>
          <CardTitle className="text-wg-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            Filter deposit transactions by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by Transaction ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Transaction ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter transaction ID..."
                  value={filters.transactionId || ""}
                  onChange={(e) =>
                    handleFilterChange("transactionId", e.target.value)
                  }
                  className="pl-10 bg-wg-neutral border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Status
              </label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Date
              </label>
              <Input
                type="date"
                value={
                  filters.date ? filters.date.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  handleFilterChange(
                    "date",
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
                className="bg-wg-neutral border-wg-accent/20 text-wg-primary"
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Sort Order
              </label>
              <Select
                value={filters.order || "desc"}
                onValueChange={(value) =>
                  handleFilterChange("order", value as "asc" | "desc")
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-wg-primary/60">
              Showing {((filters.page || 1) - 1) * currentLimit + 1} to{" "}
              {Math.min((filters.page || 1) * currentLimit, currentTotal)} of{" "}
              {currentTotal} deposits
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-wg-accent/30 text-wg-primary hover:bg-wg-accent/10"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => fetchDeposits()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20">
        <CardHeader>
          <CardTitle className="text-wg-primary">
            Deposit Transactions
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            View and manage all deposit transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionTable
            transactions={transactions}
            loading={loading}
            onViewDetails={(transaction) => {
              setSelectedTransaction(transaction);
              setIsDetailsOpen(true);
            }}
            onDownloadProof={(transaction) => {
              if (transaction.proofUrl) {
                window.open(transaction.proofUrl, "_blank");
              }
            }}
            isAdmin={true}
            onAction={handleTransactionAction}
          />

          {/* Pagination */}
          {currentTotalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (filters.page && filters.page > 1) {
                          handlePageChange(filters.page - 1);
                        }
                      }}
                      className={
                        (filters.page || 1) <= 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: Math.min(5, currentTotalPages) },
                    (_, i) => {
                      let pageNum;
                      if (currentTotalPages <= 5) {
                        pageNum = i + 1;
                      } else if ((filters.page || 1) <= 3) {
                        pageNum = i + 1;
                      } else if ((filters.page || 1) >= currentTotalPages - 2) {
                        pageNum = currentTotalPages - 4 + i;
                      } else {
                        pageNum = (filters.page || 1) - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                            isActive={pageNum === (filters.page || 1)}
                            className={
                              pageNum === (filters.page || 1)
                                ? "bg-wg-accent text-white hover:bg-wg-accent/90"
                                : "hover:bg-wg-accent/20"
                            }
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (filters.page && filters.page < currentTotalPages) {
                          handlePageChange(filters.page + 1);
                        }
                      }}
                      className={
                        (filters.page || 1) >= currentTotalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* Page Size Selector */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-wg-primary/60">
                <span>Show</span>
                <Select
                  value={currentLimit.toString()}
                  onValueChange={(value) => handleLimitChange(parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8 bg-wg-neutral border-wg-accent/20 text-wg-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>transactions per page</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
        isAdmin={true}
        onAction={handleTransactionAction}
      />
    </div>
  );
};

export default DepositClient;
