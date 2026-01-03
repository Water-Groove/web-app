import { Metadata } from "next";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import DepositClient from "../_components/DepositClient";
import { AdminTransactionQueryParams } from "@/types/adminType";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { getTransactions } from "@/services/admin/r.service";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Deposit Transactions | Water Groove Admin",
  description: "Manage and monitor all deposit transactions",
};

const Deposits = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resolved = await resolveServerAuth();
  const adminId = resolved?.user?.id;

  const searchP = await searchParams;

  // Parse query parameters
  const queryParams: AdminTransactionQueryParams = {
    status: (searchP.status as TransactionStatus) || undefined,
    order: (searchP.order as "asc" | "desc") || "desc",
    date: searchP.date ? new Date(searchP.date as string) : undefined,
    transactionId: (searchP.transactionId as string) || undefined,
  };

  const page = parseInt((searchP.page as string) || "1");
  const limit = parseInt((searchP.limit as string) || "20");

  try {
    const res = await getTransactions(adminId, TransactionType.DEPOSIT, {
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
        <DepositClient
          initialTransactions={data.data}
          total={data.total}
          page={data.page}
          limit={data.limit}
          totalPages={data.totalPages}
          isAdmin={true}
          adminId={adminId}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading deposits:", error);
    return (
      <div className="min-h-screen bg-wg-neutral flex items-center justify-center p-4">
        <Card className="bg-wg-neutral2 border-wg-accent/20 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4 inline-block">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-wg-primary mb-2">
              Failed to Load Deposits
            </h2>
            <p className="text-wg-primary/60 mb-4">
              There was an error loading deposit transactions. Please try again.
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

export default Deposits;
