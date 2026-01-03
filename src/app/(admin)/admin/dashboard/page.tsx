import { Suspense } from "react";
import { Metadata } from "next";
import { getAdminDashboardOverview } from "@/services/admin/r.service";
import AdminDashboardClient from "../_components/AdminDashboardClient";
import { AdminDashboardOverview } from "@/types/adminType";
import { resolveServerAuth } from "@/lib/server/auth0-server";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Admin Dashboard | Water Groove",
  description: "Secure your future with water groove investment",
};

// Fallback data for when API fails
const FALLBACK_DATA: AdminDashboardOverview = {
  totalPrincipalAmount: 0,
  totalInvestment: 0,
  totalUsers: 0,
  totalDepositAmount: 0,
  totalWithdrawalAmount: 0,
  totalRoiPaidAmount: 0,
  totalDeposit: 0,
  totalWithdrawal: 0,
  totalPendingDeposit: 0,
  totalPendingWithdrawal: 0,
  totalActiveInvestment: 0,
  totalPendingInvestment: 0,
  systemHealth: 'CRITICAL' // System marked as unhealthy
};

export default async function DashboardPage() {
  let dashboardData = null;
  let serverData: AdminDashboardOverview;
  let isFallbackData = false;

  try {
    // Get Auth0 user on server side
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    // Fetch dashboard data with timeout
    try {
      dashboardData = await getAdminDashboardOverview(adminId);
      
      // If no data or API returns error, use fallback
      if (!dashboardData?.success || !dashboardData?.data) {
        throw new Error("Dashboard API returned unsuccessful response");
      }
      
      // Process the API data
      serverData = {
        ...dashboardData.data,
        totalWithdrawalAmount: Number.isNaN(
          dashboardData.data.totalWithdrawalAmount
        )
          ? 0
          : dashboardData.data.totalWithdrawalAmount,
        totalRoiPaidAmount: Number.isNaN(dashboardData.data.totalRoiPaidAmount)
          ? 0
          : dashboardData.data.totalRoiPaidAmount,
        // Ensure systemHealth is a string
        systemHealth: dashboardData.data.systemHealth || 'HEALTHY'
      };
      
    } catch (apiError: any) {
      console.log("API call failed, using fallback data:", apiError.message);
      isFallbackData = true;
      serverData = FALLBACK_DATA;
    }

  } catch (error: any) {
    console.log("Server error, using fallback data:", error.message);
    isFallbackData = true;
    serverData = FALLBACK_DATA;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-wg-primary flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wg-accent"></div>
        </div>
      }
    >
      <AdminDashboardClient 
        serverData={serverData} 
        isFallbackData={isFallbackData}
      />
    </Suspense>
  );
}