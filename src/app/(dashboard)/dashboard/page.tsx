/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import DashboardClient from "./_components/DashboardClient";
import { Metadata } from "next";
import {
  getAllInvestmentCategory,
  getDashboardOverview,
} from "@/services/client/r.service";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { DashboardOverviewData } from "@/types/type";

export const metadata: Metadata = {
  title: "Dashboard | Water Groove",
  description: "Secure your future with water groove investment",
};

export const dynamic = 'force-dynamic';


// Helper function to format the dashboard data with proper types
function formatDashboardData(data: DashboardOverviewData, authUser: any) {
  return {
    user: {
      ...data.user,
      // Ensure user data matches the Auth0 user
      id: data.user.id,
      email: data.user.email || authUser.email,
      fullName: data.user.fullName || authUser.name || "User",
    },
    category: data.category,
    wallet: data.wallet,
    activeInvestments: data.activeInvestments,
    pendingTransactions: data.pendingTransactions,
    nextRoiDate: data.nextRoiDate,
  };
}

export default async function DashboardPage() {
  try {
    // Get Auth0 user on server side
    const { user } = await resolveServerAuth();

    // Fetch dashboard data
    const dashboardData = await getDashboardOverview(user?.id);
    const investmemtCategoeies = await getAllInvestmentCategory();

    // Format and validate data
    const formattedData = formatDashboardData(dashboardData, user);

    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient
          data={formattedData}
          categories={investmemtCategoeies.data ?? []}
        />
      </Suspense>
    );
  } catch (error: any) {
    console.log("Error loading dashboard:", error.message);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div
          role="alert"
          className="w-full max-w-md rounded-2xl border border-wg-accent/30 bg-wg-secondary/40 p-6 text-center shadow-lg"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wg-accent/10">
            <svg
              className="h-6 w-6 text-wg-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75M12 15.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-wg-accent">
            Dashboard failed to load
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error.message ||
              `Something went wrong while loading your dashboard. Please try again,
            or contact support if the problem persists.`}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#"
              // onClick={() => window.location.reload()}
              className="rounded-lg bg-wg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-wg-accent/90 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              Retry
            </a>

            <a
              href="/support"
              className="rounded-lg border border-wg-accent/40 px-4 py-2 text-sm font-medium text-wg-accent transition hover:bg-wg-accent/10 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              onClick Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }
}
