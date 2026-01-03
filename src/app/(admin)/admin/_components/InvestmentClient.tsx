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
  CalendarIcon,
} from "lucide-react";
import {
  AdminInvestmentRow,
  AdminInvestmentQueryParams,
  PaginatedResponse,
} from "@/types/adminType";
import { InvestmentStatus, Prisma } from "@prisma/client";
import InvestmentTable from "@/components/investment/InvestmentTable";
import InvestmentDetailsModal from "@/components/investment/InvestmentDetailsModal";
import { calculateROI, formatCurrency } from "@/lib/utils";
import { ApiResponse } from "@/types/type";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "react-toastify";

interface InvestmentClientProps {
  initialInvestments: AdminInvestmentRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isAdmin: boolean;
}

// Stats Icons
const StatsIcons = {
  total: <TrendingUp className="w-6 h-6 text-wg-accent" />,
  active: <AlertCircle className="w-6 h-6 text-blue-500" />,
  completed: <CheckCircle className="w-6 h-6 text-green-500" />,
};

const InvestmentClient: React.FC<InvestmentClientProps> = ({
  initialInvestments,
  total: initialTotal,
  page: initialPage,
  limit: initialLimit,
  totalPages: initialTotalPages,
  isAdmin,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [investments, setInvestments] =
    useState<AdminInvestmentRow[]>(initialInvestments);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] =
    useState<AdminInvestmentRow | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const [currentTotal, setCurrentTotal] = useState(initialTotal);
  const [currentTotalPages, setCurrentTotalPages] = useState(initialTotalPages);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  // Initialize filters from URL params
  const [filters, setFilters] = useState<AdminInvestmentQueryParams>(() => {
    const params: AdminInvestmentQueryParams = {
      page: initialPage,
      limit: initialLimit,
    };

    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");
    const order = searchParams.get("order");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (userId) {
      params.userId = userId;
    }
    if (categoryId) {
      params.categoryId = categoryId;
    }
    if (status && status !== "all") {
      params.status = status as InvestmentStatus;
    }
    if (order === "asc" || order === "desc") {
      params.order = order;
    }
    if (startDate) {
      params.startDate = new Date(startDate);
      setDateRange((prev) => ({ ...prev, from: new Date(startDate) }));
    }
    if (endDate) {
      params.endDate = new Date(endDate);
      setDateRange((prev) => ({ ...prev, to: new Date(endDate) }));
    }

    return params;
  });

  // Build query string from filters
  const buildQueryString = useCallback(
    (filterParams: AdminInvestmentQueryParams) => {
      const params = new URLSearchParams();

      // Always include page and limit
      params.set("page", (filterParams.page || 1).toString());
      params.set("limit", (filterParams.limit || 20).toString());

      // Add optional filters
      if (filterParams.userId) {
        params.set("userId", filterParams.userId);
      }
      if (filterParams.categoryId) {
        params.set("categoryId", filterParams.categoryId);
      }
      if (filterParams.status && filterParams.status) {
        params.set("status", filterParams.status);
      }
      if (filterParams.order) {
        params.set("order", filterParams.order);
      }
      if (filterParams.startDate) {
        params.set("startDate", filterParams.startDate.toISOString());
      }
      if (filterParams.endDate) {
        params.set("endDate", filterParams.endDate.toISOString());
      }

      return params.toString();
    },
    []
  );

  // Update URL with filters
  const updateURL = useCallback(
    (filterParams: AdminInvestmentQueryParams) => {
      const queryString = buildQueryString(filterParams);
      router.push(`/admin/investments?${queryString}`);
    },
    [router, buildQueryString]
  );

  // Fetch investments with filters
  const fetchInvestments = useCallback(async () => {
    setLoading(true);
    try {
      const queryString = buildQueryString(filters);
      const res = await fetch(`/api/admin/investments?${queryString}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result: ApiResponse<PaginatedResponse<AdminInvestmentRow[]>> =
        await res.json();

      if (result.success && result.data) {
        setInvestments(result.data.data || []);
        setCurrentPage(result.data.page);
        setCurrentLimit(result.data.limit);
        setCurrentTotal(result.data.total);
        setCurrentTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, buildQueryString]);

  // Initial fetch on mount if URL params differ from initial props
  useEffect(() => {
    const hasFilterParams =
      searchParams.get("userId") ||
      searchParams.get("categoryId") ||
      searchParams.get("status") ||
      searchParams.get("order") ||
      searchParams.get("startDate") ||
      searchParams.get("endDate");

    if (hasFilterParams) {
      fetchInvestments();
    }
  }, []); // Empty dependency array for initial mount only

  // Fetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInvestments();
      updateURL(filters);
    }, 300); // Debounce API calls

    return () => clearTimeout(timer);
  }, [filters, fetchInvestments, updateURL]);

  // Update date range filters
  useEffect(() => {
    if (dateRange.from) {
      setFilters((prev) => ({
        ...prev,
        startDate: dateRange.from,
      }));
    }
    if (dateRange.to) {
      setFilters((prev) => ({
        ...prev,
        endDate: dateRange.to,
      }));
    }
    if (!dateRange.from && !dateRange.to) {
      setFilters((prev) => ({
        ...prev,
        startDate: undefined,
        endDate: undefined,
      }));
    }
  }, [dateRange]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeInvestments = investments.filter(
      (inv) => inv.status === InvestmentStatus.ACTIVE
    ).length;
    const completedInvestments = investments.filter(
      (inv) => inv.status === InvestmentStatus.COMPLETED
    ).length;
    const totalInvested = investments.reduce(
      (sum, inv) => sum + inv.principalAmount,
      0
    );
    const totalReturns = investments.reduce(
      (sum, inv) =>
        sum +
        (inv.status === InvestmentStatus.ACTIVE
          ? (inv.principalAmount * inv.roiRateSnapshot * inv.durationMonths) /
            12
          : 0),
      0
    );

    return {
      totalInvestments: currentTotal,
      activeInvestments,
      completedInvestments,
      totalInvested,
      totalReturns,
    };
  }, [investments, currentTotal]);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof AdminInvestmentQueryParams,
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
    setDateRange({
      from: undefined,
      to: undefined,
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

  // Handle investment actions
  const handleInvestmentAction = async (
    investment: AdminInvestmentRow,
    action: string
  ) => {
    try {
      console.log(`Action: ${action} on investment: ${investment.id}`);

      // Update local state for demo
      let newStatus: InvestmentStatus;
      switch (action) {
        case "ACTIVE":
          newStatus = InvestmentStatus.ACTIVE;
          break;
        case "PAUSED":
          newStatus = InvestmentStatus.PAUSED;
          break;
        case "COMPLETED":
          newStatus = InvestmentStatus.COMPLETED;
          break;
        case "CANCELLED":
          newStatus = InvestmentStatus.CANCELLED;
          break;
        case "REJECTED":
          newStatus = InvestmentStatus.REJECTED;
          break;
        default:
          newStatus = investment.status;
      }

      const res = await fetch(
        `/api/admin/investments/${investment.id}/status`,
        { method: "PATCH", body: JSON.stringify({ status: newStatus }) }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        return toast.error(result.message || "Failed to update transaction");
      }

      setInvestments((prev) =>
        prev.map((inv) =>
          inv.id === investment.id
            ? { ...inv, status: newStatus, updatedAt: new Date() }
            : inv
        )
      );

      toast.success(
        `Investment ${investment.id} ${action.toLowerCase()}d successfully`
      );
    } catch (error) {
      console.error("Error processing action:", error);
      alert("Failed to process action");
    }
  };

  return (
    <div className="min-h-screen bg-wg-neutral">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Investments"
          value={stats.totalInvestments.toString()}
          description="All investment records"
          icon={StatsIcons.total}
        />
        <StatsCard
          title="Active Investments"
          value={stats.activeInvestments.toString()}
          description="Currently active"
          icon={StatsIcons.active}
        />
        <StatsCard
          title="Completed Investments"
          value={stats.completedInvestments.toString()}
          description="Successfully completed"
          icon={StatsIcons.completed}
        />
        <StatsCard
          title="Total Invested"
          value={formatCurrency(stats.totalInvested)}
          description="Sum of all investments"
          icon={
            <div className="p-2 rounded-full bg-wg-accent/10">
              <span className="text-wg-accent font-bold">$</span>
            </div>
          }
        />
        <StatsCard
          title="Total Returns"
          value={stats.totalReturns}
          description="Sum of all returns"
          icon={
            <div className="p-2 rounded-full bg-green-500/10">
              <span className="text-green-500 font-bold">↗</span>
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
            Filter investment records by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by User ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                User ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter user ID..."
                  value={filters.userId || ""}
                  onChange={(e) => handleFilterChange("userId", e.target.value)}
                  className="pl-10 bg-wg-neutral border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Category
              </label>
              <Input
                placeholder="Enter category ID..."
                value={filters.categoryId || ""}
                onChange={(e) =>
                  handleFilterChange("categoryId", e.target.value)
                }
                className="bg-wg-neutral border-wg-accent/20 text-wg-primary"
              />
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-wg-neutral border-wg-accent/20 hover:bg-wg-neutral/80",
                      !dateRange.from && !dateRange.to && "text-wg-primary/60"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    required
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="bg-wg-neutral2"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Second row of filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Sort Order
              </label>
              <Select
                value={filters.order || "desc"}
                onValueChange={(value) =>
                  handleFilterChange("order", value as Prisma.SortOrder)
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
              {currentTotal} investments
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
                onClick={() => fetchInvestments()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investments Table Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20">
        <CardHeader>
          <CardTitle className="text-wg-primary">Investment Records</CardTitle>
          <CardDescription className="text-wg-primary/60">
            View and manage all investment records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentTable
            investments={investments}
            loading={loading}
            onViewDetails={(investment) => {
              setSelectedInvestment(investment);
              setIsDetailsOpen(true);
            }}
            isAdmin={isAdmin}
            onAction={handleInvestmentAction}
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
                <span>investments per page</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        investment={selectedInvestment}
        isAdmin={isAdmin}
        onAction={handleInvestmentAction}
      />
    </div>
  );
};

export default InvestmentClient;
