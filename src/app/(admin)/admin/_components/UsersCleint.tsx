"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { StatsCard } from "@/components/ui/StatsCard";
import { Search, Filter, MoreVertical, Eye, UserX, UserCheck, Calendar } from "lucide-react";
import { AdminUserRow, AdminUserQueryParams, PaginatedResponse } from "@/types/adminType";
import { ApiResponse } from "@/types/type";

interface UsersClientProps {
  initialData: PaginatedResponse<AdminUserRow[]>;
  totalUsers: number;
}

// Stats Icons
const StatsIcons = {
  users: (
    <svg className="w-6 h-6 text-wg-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.646a4 4 0 11-7.998 0 4 4 0 017.998 0z" />
    </svg>
  ),
  active: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  inactive: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const UsersClient = ({ initialData, totalUsers }: UsersClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [data, setData] = useState<PaginatedResponse<AdminUserRow[]>>(initialData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialData.page);
  const [currentLimit, setCurrentLimit] = useState(initialData.limit);
  const [currentTotal, setCurrentTotal] = useState(initialData.total);
  const [currentTotalPages, setCurrentTotalPages] = useState(initialData.totalPages);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<AdminUserQueryParams>(() => {
    const params: AdminUserQueryParams = {
      page: initialData.page,
      limit: initialData.limit,
    };

    const fullName = searchParams.get('fullName');
    const email = searchParams.get('email');
    const isActive = searchParams.get('isActive');
    const investmentCategoryId = searchParams.get('investmentCategoryId');

    if (fullName) {
      params.fullName = fullName;
    }
    if (email) {
      params.email = email;
    }
    if (isActive) {
      params.isActive = isActive === 'true';
    }
    if (investmentCategoryId && investmentCategoryId !== 'all') {
      params.investmentCategoryId = investmentCategoryId;
    }

    return params;
  });

  // Build query string from filters
  const buildQueryString = useCallback((filterParams: AdminUserQueryParams) => {
    const params = new URLSearchParams();
    
    // Always include page and limit
    params.set("page", (filterParams.page || 1).toString());
    params.set("limit", (filterParams.limit || 20).toString());
    
    // Add optional filters
    if (filterParams.fullName) {
      params.set("fullName", filterParams.fullName);
    }
    if (filterParams.email) {
      params.set("email", filterParams.email);
    }
    if (filterParams.isActive !== undefined) {
      params.set("isActive", filterParams.isActive.toString());
    }
    if (filterParams.investmentCategoryId) {
      params.set("investmentCategoryId", filterParams.investmentCategoryId);
    }
    
    return params.toString();
  }, []);

  // Update URL with filters
  const updateURL = useCallback((filterParams: AdminUserQueryParams) => {
    const queryString = buildQueryString(filterParams);
    router.push(`/admin/users?${queryString}`);
  }, [router, buildQueryString]);

  // Fetch users with filters
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const queryString = buildQueryString(filters);
      const res = await fetch(`/api/admin/users?${queryString}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result: ApiResponse<PaginatedResponse<AdminUserRow[]>> = await res.json();

      if (result.success && result.data) {
        setData(result.data);
        setCurrentPage(result.data.page);
        setCurrentLimit(result.data.limit);
        setCurrentTotal(result.data.total);
        setCurrentTotalPages(result.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, buildQueryString]);

  // Initial fetch on mount if URL params differ from initial props
  useEffect(() => {
    const hasFilterParams = searchParams.get("fullName") || 
                           searchParams.get("email") || 
                           searchParams.get("isActive") || 
                           searchParams.get("investmentCategoryId");
    
    if (hasFilterParams) {
      fetchUsers();
    }
  }, []); // Empty dependency array for initial mount only

  // Fetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
      updateURL(filters);
    }, 300); // Debounce API calls

    return () => clearTimeout(timer);
  }, [filters, fetchUsers, updateURL]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeUsers = data.data.filter(user => user.isActive).length;
    const inactiveUsers = data.data.filter(user => !user.isActive).length;

    return {
      totalUsers: currentTotal,
      activeUsers,
      inactiveUsers,
    };
  }, [data.data, currentTotal]);

  // Handle filter changes
  const handleFilterChange = (key: keyof AdminUserQueryParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === "" || value === "all" ? undefined : value,
      page: 1, // Reset to first page when filters change
    }));
  };

  // Handle search
  const handleSearch = (value: string) => {
    handleFilterChange('fullName', value);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: currentLimit,
    });
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilters(prev => ({
      ...prev,
      limit: newLimit,
      page: 1,
    }));
    setCurrentLimit(newLimit);
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update user status');
      }

      // Update local state
      setData(prev => ({
        ...prev,
        data: prev.data.map(user => 
          user.id === userId ? { ...user, isActive: !currentStatus } : user
        ),
      }));

      // Refresh stats
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to update user status');
    }
  };

  return (
    <div className="min-h-screen bg-wg-neutral">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          description="All registered users"
          icon={StatsIcons.users}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers.toString()}
          description="Currently active users"
          icon={StatsIcons.active}
        />
        <StatsCard
          title="Inactive Users"
          value={stats.inactiveUsers.toString()}
          description="Suspended or disabled users"
          icon={StatsIcons.inactive}
        />
      </div>

      {/* Filters Card */}
      <Card className="bg-wg-neutral border-wg-accent/20 mb-6">
        <CardHeader>
          <CardTitle className="text-wg-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            Filter users by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Search by Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter full name..."
                  value={filters.fullName || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-wg-neutral border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Search by Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Search by Email
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter email..."
                  value={filters.email || ''}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
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
                value={filters.isActive?.toString() || 'all'}
                onValueChange={(value) => 
                  handleFilterChange('isActive', value === 'all' ? undefined : value === 'true')
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral border-wg-accent/20">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Investment Category
              </label>
              <Select
                value={filters.investmentCategoryId || 'all'}
                onValueChange={(value) => handleFilterChange('investmentCategoryId', value)}
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral border-wg-accent/20">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cat1">Category 1</SelectItem>
                  <SelectItem value="cat2">Category 2</SelectItem>
                  <SelectItem value="cat3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-wg-primary/60">
              Showing {((filters.page || 1) - 1) * currentLimit + 1} to{" "}
              {Math.min((filters.page || 1) * currentLimit, currentTotal)} of {currentTotal} users
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
                onClick={() => fetchUsers()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-wg-neutral border-wg-accent/20">
        <CardHeader>
          <CardTitle className="text-wg-primary">Users List</CardTitle>
          <CardDescription className="text-wg-primary/60">
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wg-accent"></div>
            </div>
          ) : data.data.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-wg-accent/10 p-4">
                <Search className="h-8 w-8 text-wg-accent" />
              </div>
              <h3 className="text-xl font-semibold text-wg-primary mb-2">
                No users found
              </h3>
              <p className="text-wg-primary/60 max-w-md">
                No users match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-wg-accent/20">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-wg-accent/20">
                      <TableHead className="text-wg-primary font-medium">Name</TableHead>
                      <TableHead className="text-wg-primary font-medium">Email</TableHead>
                      <TableHead className="text-wg-primary font-medium">Phone</TableHead>
                      <TableHead className="text-wg-primary font-medium">Status</TableHead>
                      <TableHead className="text-wg-primary font-medium">Created</TableHead>
                      <TableHead className="text-wg-primary font-medium">Category</TableHead>
                      <TableHead className="text-wg-primary font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((user) => (
                      <TableRow key={user.id} className="border-b-wg-accent/10 hover:bg-wg-neutral/50">
                        <TableCell className="font-medium text-wg-primary">
                          {user.fullName}
                        </TableCell>
                        <TableCell className="text-wg-primary/80">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-wg-primary/80">
                          {user.phone || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.isActive ? "default" : "secondary"}
                            className={
                              user.isActive 
                                ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                            }
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-wg-primary/80">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-wg-primary/40" />
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-wg-primary/80">
                          {user.investmentCategoryId || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
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
                              className="bg-wg-neutral border-wg-accent/20"
                            >
                              <DropdownMenuItem 
                                onClick={() => router.push(`/admin/users/${user.id}`)}
                                className="text-wg-primary hover:bg-wg-accent/20 cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-wg-accent/20" />
                              {user.isActive ? (
                                <DropdownMenuItem 
                                  onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                                  className="text-red-400 hover:bg-red-500/20 cursor-pointer"
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Disable User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                                  className="text-green-400 hover:bg-green-500/20 cursor-pointer"
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Enable User
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

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
                      
                      {Array.from({ length: Math.min(5, currentTotalPages) }, (_, i) => {
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
                      })}
                      
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
                      <SelectContent className="bg-wg-neutral border-wg-accent/20">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>users per page</span>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersClient;