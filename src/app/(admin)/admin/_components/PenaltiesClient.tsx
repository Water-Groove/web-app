"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { StatsCard } from "@/components/ui/StatsCard";
import { Search, Filter, AlertTriangle, DollarSign, Percent, Calendar } from "lucide-react";
import { AdminPenaltyRow, AdminPenaltiesQueryParams } from "@/types/adminType";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PenaltiesClientProps {
  initialPenalties: AdminPenaltyRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isFallbackData?: boolean;
}

// Stats Icons
const StatsIcons = {
  total: (
    <AlertTriangle className="w-6 h-6 text-wg-accent" />
  ),
  amount: (
    <DollarSign className="w-6 h-6 text-red-500" />
  ),
  percentage: (
    <Percent className="w-6 h-6 text-yellow-500" />
  ),
};

const PenaltiesClient: React.FC<PenaltiesClientProps> = ({
  initialPenalties,
  total,
  page: initialPage,
  limit: initialLimit,
  totalPages,
  isFallbackData = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [penalties, setPenalties] = useState(initialPenalties);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState<AdminPenaltiesQueryParams>({
    transactionId: searchParams.get('transactionId') || '',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
  });
  
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Calculate stats
  const totalPenalties = total;
  const totalPenaltyAmount = penalties.reduce((sum, penalty) => sum + penalty.amount, 0);
  const averagePercentage = penalties.length > 0 
    ? (penalties.reduce((sum, penalty) => sum + penalty.percentage, 0) / penalties.length).toFixed(2)
    : "0.00";

  // Update URL with filters and pagination
  const updateURL = useCallback((newFilters: AdminPenaltiesQueryParams, newPage: number, newLimit: number) => {
    const params = new URLSearchParams();
    
    if (newFilters.transactionId) params.set('transactionId', newFilters.transactionId);
    if (newFilters.order) params.set('order', newFilters.order);
    
    params.set('page', newPage.toString());
    params.set('limit', newLimit.toString());
    
    router.push(`/admin/penalties?${params.toString()}`);
  }, [router]);

  // Fetch penalties with filters
  const fetchPenalties = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter the initial data based on current filters
      const filteredPenalties = initialPenalties.filter(penalty => {
        if (filters.transactionId && !penalty.transactionId.includes(filters.transactionId)) {
          return false;
        }
        return true;
      });

      // Sort penalties
      const sortedPenalties = [...filteredPenalties].sort((a, b) => {
        if (filters.order === 'asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });

      setPenalties(sortedPenalties);
    } catch (error) {
      console.error('Error fetching penalties:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, initialPenalties]);

  useEffect(() => {
    fetchPenalties();
    updateURL(filters, page, limit);
  }, [filters, page, limit, updateURL]);

  // Handle filter changes
  const handleFilterChange = (key: keyof AdminPenaltiesQueryParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      transactionId: '',
      order: 'desc',
    });
    setPage(1);
  };

  // Get reason badge color
  const getReasonBadgeColor = (reason: string) => {
    const reasonLower = reason.toLowerCase();
    if (reasonLower.includes('late') || reasonLower.includes('delay')) {
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30";
    }
    if (reasonLower.includes('violation') || reasonLower.includes('breach')) {
      return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30";
    }
    if (reasonLower.includes('early') || reasonLower.includes('premature')) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30";
    }
    return "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30";
  };

  // Fallback warning banner
  const FallbackWarning = () => {
    if (!isFallbackData) return null;

    return (
      <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-yellow-500/20">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400">Using Fallback Data</h3>
            <p className="text-sm text-wg-primary/60 mt-1">
              Unable to fetch live penalties data. Displaying fallback values.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-wg-neutral">
      {/* Show fallback warning if needed */}
      <FallbackWarning />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-wg-primary">Penalty Management</h1>
        <p className="text-wg-primary/60 mt-2">
          Monitor and manage all penalty transactions
          {isFallbackData && (
            <span className="text-yellow-500 ml-2">(Using fallback data)</span>
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Penalties"
          value={totalPenalties.toString()}
          description="All penalty transactions"
          icon={StatsIcons.total}
        />
        <StatsCard
          title="Total Penalty Amount"
          value={formatCurrency(totalPenaltyAmount)}
          description="Sum of all penalties"
          icon={StatsIcons.amount}
        />
        <StatsCard
          title="Average Penalty"
          value={`${averagePercentage}%`}
          description="Average penalty percentage"
          icon={StatsIcons.percentage}
        />
      </div>

      {/* Filters Card */}
      <Card className="bg-white border-wg-accent/20 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-wg-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            Filter penalties by transaction ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search by Transaction ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Transaction ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter transaction ID..."
                  value={filters.transactionId || ''}
                  onChange={(e) => handleFilterChange('transactionId', e.target.value)}
                  className="pl-10 border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Sort Order
              </label>
              <Select
                value={filters.order || 'desc'}
                onValueChange={(value) => 
                  handleFilterChange('order', value as 'asc' | 'desc')
                }
              >
                <SelectTrigger className="border-wg-accent/20 text-wg-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-wg-accent/20">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Results
              </label>
              <div className="p-3 bg-wg-accent/5 border border-wg-accent/20 rounded-md">
                <p className="text-sm text-wg-primary">
                  Showing <span className="font-semibold">{penalties.length}</span> of{" "}
                  <span className="font-semibold">{total}</span> penalties
                </p>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-wg-primary/60">
              Use filters to find specific penalty transactions
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
                onClick={() => fetchPenalties()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Penalties Table Card */}
      <Card className="bg-white border-wg-accent/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-wg-primary">Penalty Transactions</CardTitle>
          <CardDescription className="text-wg-primary/60">
            View and monitor all penalty transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wg-accent"></div>
            </div>
          ) : penalties.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-wg-accent/10 p-4">
                <AlertTriangle className="h-8 w-8 text-wg-accent" />
              </div>
              <h3 className="text-xl font-semibold text-wg-primary mb-2">
                No penalties found
              </h3>
              <p className="text-wg-primary/60 max-w-md">
                No penalties match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-wg-accent/20 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-wg-accent/20 hover:bg-transparent">
                      <TableHead className="text-wg-primary font-medium">Penalty ID</TableHead>
                      <TableHead className="text-wg-primary font-medium">Transaction ID</TableHead>
                      <TableHead className="text-wg-primary font-medium">Percentage</TableHead>
                      <TableHead className="text-wg-primary font-medium">Amount</TableHead>
                      <TableHead className="text-wg-primary font-medium">Reason</TableHead>
                      <TableHead className="text-wg-primary font-medium">Created</TableHead>
                      {/* <TableHead className="text-wg-primary font-medium text-right">Actions</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {penalties.map((penalty) => (
                      <TableRow key={penalty.id} className="border-b-wg-accent/10 hover:bg-wg-accent/5">
                        <TableCell className="font-medium text-wg-primary">
                          <div className="text-sm">{penalty.id.substring(0, 8)}...</div>
                        </TableCell>
                        <TableCell className="text-wg-primary/80 font-mono text-sm">
                          {penalty.transactionId.substring(0, 12)}...
                        </TableCell>
                        <TableCell className="text-wg-primary font-medium">
                          <div className="flex items-center gap-2">
                            {penalty.percentage}%
                          </div>
                        </TableCell>
                        <TableCell className="text-wg-primary font-medium">
                          <div className="flex items-center gap-2 text-red-600">
                            {formatCurrency(penalty.amount)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getReasonBadgeColor(penalty.reason)}`}
                          >
                            {penalty.reason}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-wg-primary/80 text-sm">
                          <div className="flex items-center gap-2">
                            {formatDate(penalty.createdAt)}
                          </div>
                        </TableCell>
                        {/* <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // View penalty details
                                console.log('View penalty:', penalty.id);
                              }}
                              className="border-wg-accent/30 text-wg-accent hover:bg-wg-accent/10"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Appeal penalty
                                console.log('Appeal penalty:', penalty.id);
                              }}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Appeal
                            </Button>
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={
                            page <= 1
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-wg-accent/20"
                          }
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNum);
                              }}
                              isActive={pageNum === page}
                              className={
                                pageNum === page
                                  ? "bg-wg-accent text-white hover:bg-wg-accent/90"
                                  : "hover:bg-wg-accent/20"
                              }
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                          className={
                            page >= totalPages
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
                      value={limit.toString()}
                      onValueChange={(value) => setLimit(parseInt(value))}
                    >
                      <SelectTrigger className="w-20 h-8 border-wg-accent/20 text-wg-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-wg-accent/20">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>penalties per page</span>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="bg-white border-wg-accent/20 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="text-wg-primary">About Penalties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-wg-primary flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Common Penalty Reasons
              </h4>
              <ul className="text-sm text-wg-primary/60 space-y-1">
                <li>• Early withdrawal</li>
                <li>• Late payment</li>
                <li>• Terms violation</li>
                <li>• Investment breach</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-wg-primary flex items-center gap-2">
                <Percent className="h-4 w-4 text-blue-500" />
                Penalty Structure
              </h4>
              <ul className="text-sm text-wg-primary/60 space-y-1">
                <li>• Standard: 2-5% of amount</li>
                <li>• Severe: 5-10% of amount</li>
                <li>• Critical: 10-20% of amount</li>
                <li>• Based on violation type</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-wg-primary flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-500" />
                Resolution Timeline
              </h4>
              <ul className="text-sm text-wg-primary/60 space-y-1">
                <li>• Appeal within 7 days</li>
                <li>• Review: 3-5 business days</li>
                <li>• Resolution: 10-14 days</li>
                <li>• Contact support for help</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PenaltiesClient;