"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { ApiResponse, TransactionQueryParams, TransactionResponse } from "@/types/type";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CalendarIcon, Filter, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { DateRange } from "react-day-picker";
import TransactionTable from "@/components/transaction/TransactionTable";
import TransactionDetailsModal from "@/components/transaction/TransactionDetailsModal";
import { AdminTransactionRow, PaginatedResponse } from "@/types/adminType";

interface TransactionClientProps {
  initialTransactions: AdminTransactionRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const TransactionClient = ({
  initialTransactions,
  total,
  page,
  limit,
  totalPages,
}: TransactionClientProps) => {
  const [transactions, setTransactions] = useState<AdminTransactionRow[]>(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TransactionQueryParams>({
    page: page,
    limit: limit,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [selectedTransaction, setSelectedTransaction] = useState<AdminTransactionRow | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentTotal, setCurrentTotal] = useState(total);
  const [currentTotalPages, setCurrentTotalPages] = useState(totalPages);

  // Use refs to track initial values
  const initialFiltersRef = useRef({ page, limit });
  const isInitialMount = useRef(true);
  const previousFiltersRef = useRef<TransactionQueryParams>(filters);

  // Convert filters to query string
  const buildQueryString = useCallback((filterParams: TransactionQueryParams) => {
    const params = new URLSearchParams();
    
    // Add all filter parameters
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    return params.toString();
  }, []);

  // Update URL function
  const updateURL = useCallback((filterParams: TransactionQueryParams) => {
    const queryString = buildQueryString(filterParams);
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [buildQueryString]);

  const fetchTransactions = useCallback(async (filterParams: TransactionQueryParams) => {
    setLoading(true);
    try {
      const queryString = buildQueryString(filterParams);
      
      const res = await fetch(`/api/client/transactions?${queryString}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result: ApiResponse<PaginatedResponse<AdminTransactionRow[]>> = await res.json();

      if (result.success && result.data) {
        setTransactions(result.data.data ?? []);
        setCurrentTotal(result.data.total);
        setCurrentTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Keep existing transactions on error
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

  // Fetch when filters change (but not on initial mount)
  useEffect(() => {
    // Skip initial mount to prevent double fetch
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Check if filters actually changed
    const hasFiltersChanged = JSON.stringify(previousFiltersRef.current) !== JSON.stringify(filters);
    
    if (!hasFiltersChanged) {
      return;
    }

    const timer = setTimeout(() => {
      fetchTransactions(filters);
      updateURL(filters);
      previousFiltersRef.current = { ...filters };
    }, 300); // Debounce to prevent too many requests

    return () => clearTimeout(timer);
  }, [filters, fetchTransactions, updateURL]);

  const handleFilterChange = () => {
    const updatedFilters: TransactionQueryParams = {
      ...filters,
      page: 1, // Reset to first page when applying filters
      from: dateRange.from?.toISOString(),
      to: dateRange.to?.toISOString(),
    };
    
    // Remove date filters if not set
    if (!dateRange.from) delete updatedFilters.from;
    if (!dateRange.to) delete updatedFilters.to;
    
    setFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: TransactionQueryParams = {
      page: 1,
      limit: limit,
    };
    
    setFilters(resetFilters);
    setDateRange({
      from: undefined,
      to: undefined,
    });
  };

  // Handle filter changes from select components
  const handleTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      type: value === "all" ? undefined : value as TransactionType
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      status: value === "all" ? undefined : value as TransactionStatus
    }));
  };

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Transaction Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Transaction Type
            </label>
            <Select
              value={filters.type || "all"}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 focus:ring-wg-accent/20 w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-wg-neutral border-wg-primary/10">
                <SelectItem value="all" className="focus:bg-wg-primary/5">
                  All Types
                </SelectItem>
                <SelectItem
                  value={TransactionType.DEPOSIT}
                  className="focus:bg-wg-primary/5"
                >
                  Deposit
                </SelectItem>
                <SelectItem
                  value={TransactionType.WITHDRAWAL}
                  className="focus:bg-wg-primary/5"
                >
                  Withdrawal
                </SelectItem>
                <SelectItem
                  value={TransactionType.INTEREST}
                  className="focus:bg-wg-primary/5"
                >
                  Interest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5" />
              Status
            </label>
            <Select
              value={filters.status || "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 focus:ring-wg-accent/20 w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-wg-neutral border-wg-primary/10">
                <SelectItem value="all" className="focus:bg-wg-primary/5">
                  All Status
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.PENDING}
                  className="focus:bg-wg-primary/5"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.APPROVED}
                  className="focus:bg-wg-primary/5"
                >
                  Approved
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.REJECTED}
                  className="focus:bg-wg-primary/5"
                >
                  Rejected
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.PAID}
                  className="focus:bg-wg-primary/5"
                >
                  Paid
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2 col-span-2 md:col-auto">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5" />
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 hover:border-wg-accent/30 cursor-pointer"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-wg-primary/60" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-wg-primary/60">
                      Pick a date range
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-wg-primary/10"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  required
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="bg-wg-neutral"
                  classNames={{
                    day_selected:
                      "bg-wg-accent text-wg-neutral hover:bg-wg-accent hover:text-wg-neutral",
                    day_today: "bg-wg-primary/10 text-wg-primary",
                    day_outside: "text-wg-primary/30",
                    day_range_middle: "bg-wg-accent/20 text-wg-accent",
                    day_range_end: "bg-wg-accent text-wg-neutral",
                    day_range_start: "bg-wg-accent text-wg-neutral",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleFilterChange}
            className="gap-2 bg-gradient-to-r from-wg-primary to-wg-primary/80 hover:from-wg-secondary/90 hover:to-wg-secondary shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="border-wg-primary/20 text-wg-primary hover:bg-wg-secondary/5 hover:border-wg-secondary/30 cursor-pointer"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mt-8">
        <TransactionTable
          transactions={transactions || []}
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
          onAction={(transaction, action) => {
            // Handle admin actions
            console.log(`Action: ${action} on transaction: ${transaction.id}`);
          }}
        />

        {/* Pagination */}
        {currentTotalPages > 1 && (
          <div className="mt-8">
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
                    className={`border-wg-primary/20 hover:bg-wg-primary/5 ${
                      filters.page === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, currentTotalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}
                        isActive={filters.page === pageNum}
                        className={cn(
                          "border-wg-primary/20",
                          filters.page === pageNum
                            ? "bg-gradient-to-r from-wg-accent to-wg-accent/80 text-wg-neutral border-wg-accent hover:from-wg-accent/90 hover:to-wg-accent/70"
                            : "hover:bg-wg-primary/5"
                        )}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {currentTotalPages > 5 && (
                  <PaginationItem>
                    <span className="px-4 py-2 text-wg-primary/40">...</span>
                  </PaginationItem>
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
                    className={`border-wg-primary/20 hover:bg-wg-primary/5 ${
                      filters.page === currentTotalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-center text-sm text-wg-primary/60 mt-4">
              Showing {((filters.page || 1) - 1) * limit + 1} to{" "}
              {Math.min((filters.page || 1) * limit, currentTotal)} of {currentTotal}{" "}
              transactions
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
        onAction={(transaction, action) => {
          // Handle admin actions
          console.log(`Action: ${action} on transaction: ${transaction.id}`);
        }}
      />
    </div>
  );
};

export default TransactionClient;