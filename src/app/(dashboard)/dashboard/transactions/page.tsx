import { Metadata } from "next";
import { TransactionQueryParams, TransactionResponse } from "@/types/type";
import { getTransactions } from "@/services/client/r.service";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { TransactionStatus, TransactionType } from "@prisma/client";
import TransactionClient from "../_components/TransactionClient";

export const metadata: Metadata = {
  title: "Transactions | WG",
  description: "View and manage your transaction history",
};

const Transactions = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Build query params from search params
  const queryParams: TransactionQueryParams = {
    page: typeof searchParams.page === "number" ? Number(searchParams.page) : 1,
    limit:
      typeof searchParams.limit === "number" ? Number(searchParams.limit) : 20,
    type:
      typeof searchParams.type === "string"
        ? (searchParams.type as TransactionType)
        : undefined,
    status:
      typeof searchParams.status === "string"
        ? (searchParams.status as TransactionStatus)
        : undefined,
    from: typeof searchParams.from === "string" ? searchParams.from : undefined,
    to: typeof searchParams.to === "string" ? searchParams.to : undefined,
  };

  const { user } = await resolveServerAuth();

  const res = await getTransactions(user.id, queryParams);

  const data = res?.data ?? {
    transactions: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  return (
    <div className="">
      <TransactionClient
        initialTransactions={data.transactions}
        total={data.total}
        page={data.page}
        limit={data.limit}
        totalPages={data.totalPages}
      />
    </div>
  );
};

export default Transactions;
