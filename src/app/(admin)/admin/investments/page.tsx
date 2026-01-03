import { Metadata } from "next";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { getAllInvestments } from "@/services/admin/r.service";
import InvestmentClient from "../_components/InvestmentClient";
import { AdminInvestmentQueryParams } from "@/types/adminType";
import { InvestmentStatus } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Investment Management | Water Groove Admin",
  description: "Manage and monitor all investment portfolios",
};

const Investments = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resolved = await resolveServerAuth();
  const adminId = resolved?.user?.id;

  // Parse query parameters
  const queryParams: AdminInvestmentQueryParams = {
    userId: (searchParams.userId as string) || undefined,
    categoryId: (searchParams.categoryId as string) || undefined,
    status: (searchParams.status as InvestmentStatus) || undefined,
    startDate: searchParams.startDate
      ? new Date(searchParams.startDate as string)
      : undefined,
    endDate: searchParams.endDate
      ? new Date(searchParams.endDate as string)
      : undefined,
    order: (searchParams.order as "asc" | "desc") || "desc",
  };

  const page = parseInt((searchParams.page as string) || "1");
  const limit = parseInt((searchParams.limit as string) || "20");

  try {
    const res = await getAllInvestments(adminId, {
      ...queryParams,
      page,
      limit,
    });

    const data = res?.data ?? {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    return (
      <div className="">
        <InvestmentClient
          initialInvestments={data.data}
          total={data.total}
          page={data.page}
          limit={data.limit}
          totalPages={data.totalPages}
          isAdmin={true}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading investments:", error);
    return (
      <div className="min-h-screen bg-wg-neutral flex items-center justify-center p-4">
        <Card className="bg-wg-neutral2 border-wg-accent/20 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4 inline-block">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-wg-primary mb-2">
              Failed to Load Investments
            </h2>
            <p className="text-wg-primary/60 mb-4">
              There was an error loading investment data. Please try again.
            </p>
            <Button
              // onClick={() => window.location.reload()}
              className="bg-wg-accent text-white hover:bg-wg-accent/90"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Investments;
