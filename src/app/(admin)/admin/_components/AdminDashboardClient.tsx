"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminDashboardOverview } from "@/types/adminType";
import { StatsCard } from "@/components/ui/StatsCard";

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-wg-neutral border border-wg-accent/30 rounded-lg p-4 shadow-lg">
        <p className="text-sm font-medium text-wg-primary mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="font-medium">
              {typeof entry.value === "number"
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(entry.value)
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend for charts
const renderColorfulLegendText = (value: string, entry: any) => {
  return <span className="text-sm text-wg-primary/80">{value}</span>;
};

interface AdminDashboardClientProps {
  serverData?: AdminDashboardOverview;
  isFallbackData?: boolean;
}

// Fallback warning banner component
const FallbackWarning = ({ 
  onRetry, 
  onDismiss 
}: { 
  onRetry: () => void; 
  onDismiss: () => void;
}) => {
  return (
    <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-yellow-500/20">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.714-.833-2.484 0L4.732 16.5C3.962 17.333 4.924 19 6.464 19z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400">Using Fallback Data</h3>
            <p className="text-sm text-wg-primary/60 mt-1">
              Unable to fetch live dashboard data. Displaying fallback values. System health is marked as UNHEALTHY.
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-wg-primary/40 hover:text-wg-primary p-1"
          aria-label="Dismiss warning"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={onRetry}
          className="text-sm bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-1.5 rounded-md transition-colors"
        >
          Retry Loading Data
        </button>
      </div>
    </div>
  );
};

const AdminDashboardClient = ({ 
  serverData, 
  isFallbackData = false 
}: AdminDashboardClientProps) => {
  const [showFallbackWarning, setShowFallbackWarning] = useState(isFallbackData);
  
  // Prepare data for Chart 1: Users and Investments
  const chart1Data = serverData
    ? [
        {
          name: "Current",
          Users: serverData.totalUsers,
          Investments: serverData.totalInvestment,
        },
      ]
    : [];

  // Prepare data for Chart 2: Financial Overview
  const chart2Data = serverData
    ? [
        {
          name: "Financial Overview",
          Principal: serverData.totalPrincipalAmount,
          Deposits: serverData.totalDepositAmount,
          Withdrawals: serverData.totalWithdrawalAmount,
          ROI: serverData.totalRoiPaidAmount,
        },
      ]
    : [];

  // Prepare data for Chart 3: Transaction Counts
  const chart3Data = serverData
    ? [
        {
          name: "Transactions",
          Deposits: serverData.totalDeposit,
          Withdrawals: serverData.totalWithdrawal,
        },
      ]
    : [];

  // Prepare data for Chart 4: Pending Items
  const chart4Data = serverData
    ? [
        {
          name: "Pending",
          "Pending Deposits": serverData.totalPendingDeposit,
          "Pending Withdrawals": serverData.totalPendingWithdrawal,
          "Pending Investments": serverData.totalPendingInvestment,
        },
      ]
    : [];

  // Handle retry loading data
  const handleRetry = () => {
    window.location.reload();
  };

  // Handle dismissing the warning
  const handleDismissWarning = () => {
    setShowFallbackWarning(false);
  };

  // Stats Icons
  const StatsIcons = {
    users: (
      <svg
        className="w-6 h-6 text-wg-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.646a4 4 0 11-7.998 0 4 4 0 017.998 0z"
        />
      </svg>
    ),
    investment: (
      <svg
        className="w-6 h-6 text-wg-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    deposit: (
      <svg
        className="w-6 h-6 text-wg-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    withdrawal: (
      <svg
        className="w-6 h-6 text-wg-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 8h6m-6 4h6m-6 4h6M6 3v18M18 3v18M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  // Function to determine system health color
  const getSystemHealthColor = (healthStatus?: string) => {
    if (!healthStatus) return "bg-gray-500";
    
    switch (healthStatus.toUpperCase()) {
      case "HEALTHY":
        return "bg-green-500";
      case "UNHEALTHY":
        return "bg-red-500";
      case "CRITICAL":
        return "bg-red-500 animate-pulse";
      case "DEGRADED":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Function to determine system health label
  const getSystemHealthLabel = (healthStatus?: string) => {
    if (!healthStatus) return "UNKNOWN";
    
    switch (healthStatus.toUpperCase()) {
      case "HEALTHY":
        return "HEALTHY";
      case "UNHEALTHY":
        return "UNHEALTHY";
      case "CRITICAL":
        return "CRITICAL";
      case "DEGRADED":
        return "DEGRADED";
      default:
        return healthStatus;
    }
  };

  return (
    <div className="min-h-screen bg-wg-neutral">
      {/* Show warning when using fallback data */}
      {showFallbackWarning && (
        <FallbackWarning 
          onRetry={handleRetry} 
          onDismiss={handleDismissWarning} 
        />
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={serverData?.totalUsers?.toString() || "0"}
          description="Active platform users"
          icon={StatsIcons.users}
        />
        <StatsCard
          title="Total Investments"
          value={serverData?.totalInvestment?.toString() || "0"}
          description="Active investments"
          icon={StatsIcons.investment}
        />
        <StatsCard
          title="Total Principal"
          value={serverData?.totalPrincipalAmount || 0}
          description="Total principal amount"
          icon={StatsIcons.deposit}
        />
        <StatsCard
          title="System Health"
          value={getSystemHealthLabel(serverData?.systemHealth)}
          description="Platform status"
          icon={
            <div
              className={`w-3 h-3 rounded-full ${getSystemHealthColor(serverData?.systemHealth)}`}
            />
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="space-y-8">
        {/* Chart 1: Users and Investments */}
        <Card className="bg-white border-wg-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-wg-primary">
              Users vs Investments
              {isFallbackData && (
                <span className="text-xs text-yellow-500 ml-2 font-normal">
                  (Demo Data)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart1Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280" 
                    fontSize={12} 
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={12} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar
                    dataKey="Users"
                    fill="#0575f5"
                    radius={[4, 4, 0, 0]}
                    name="Total Users"
                  />
                  <Bar
                    dataKey="Investments"
                    fill="#f5ce20"
                    radius={[4, 4, 0, 0]}
                    name="Total Investments"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Financial Overview */}
        <Card className="bg-white border-wg-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-wg-primary">
              Financial Overview (Amounts)
              {isFallbackData && (
                <span className="text-xs text-yellow-500 ml-2 font-normal">
                  (Demo Data)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart2Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar
                    dataKey="Principal"
                    fill="#152333"
                    radius={[4, 4, 0, 0]}
                    name="Total Principal"
                  />
                  <Bar
                    dataKey="Deposits"
                    fill="#0575f5"
                    radius={[4, 4, 0, 0]}
                    name="Total Deposits"
                  />
                  <Bar
                    dataKey="Withdrawals"
                    fill="#f5ce20"
                    radius={[4, 4, 0, 0]}
                    name="Total Withdrawals"
                  />
                  <Bar
                    dataKey="ROI"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Total ROI Paid"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 3: Transaction Counts */}
        <Card className="bg-white border-wg-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-wg-primary">
              Transaction Counts
              {isFallbackData && (
                <span className="text-xs text-yellow-500 ml-2 font-normal">
                  (Demo Data)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart3Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar
                    dataKey="Deposits"
                    fill="#0575f5"
                    radius={[4, 4, 0, 0]}
                    name="Total Deposits"
                  />
                  <Bar
                    dataKey="Withdrawals"
                    fill="#f5ce20"
                    radius={[4, 4, 0, 0]}
                    name="Total Withdrawals"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 4: Pending Items */}
        <Card className="bg-white border-wg-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-wg-primary">
              Pending Items
              {isFallbackData && (
                <span className="text-xs text-yellow-500 ml-2 font-normal">
                  (Demo Data)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart4Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar
                    dataKey="Pending Deposits"
                    fill="#0575f5"
                    radius={[4, 4, 0, 0]}
                    name="Pending Deposits"
                  />
                  <Bar
                    dataKey="Pending Withdrawals"
                    fill="#f5ce20"
                    radius={[4, 4, 0, 0]}
                    name="Pending Withdrawals"
                  />
                  <Bar
                    dataKey="Pending Investments"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    name="Pending Investments"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total ROI Paid"
          value={serverData?.totalRoiPaidAmount || 0}
          description="Total return on investment paid"
        />
        <StatsCard
          title="Active Investments"
          value={serverData?.totalActiveInvestment || 0}
          description="Currently active investments"
        />
        <StatsCard
          title="Total Withdrawals"
          value={serverData?.totalWithdrawalAmount || 0}
          description="Total withdrawal amount"
        />
      </div>
    </div>
  );
};

export default AdminDashboardClient;