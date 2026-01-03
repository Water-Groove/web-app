import { TransactionStatus, TransactionType } from '@prisma/client';
import { NextResponse } from "next/server";
import { resolveServerAuth } from '@/lib/server/auth0-server';
import { AdminTransactionQueryParams } from '@/types/adminType';
import { getTransactions } from '@/services/admin/r.service';
import { approveDeposit } from '@/services/admin/cud.service';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    const query: AdminTransactionQueryParams = {
      status: (searchParams.get("status") as TransactionStatus) ?? undefined,
      page: Number(searchParams.get("page")) ?? undefined,
      limit: Number(searchParams.get("limit")) ?? undefined,
      order: searchParams.get("order") as any,
      date: searchParams.get("date") as any,
      transactionId: searchParams.get("transactionId") as any,
      type: searchParams.get("type")?.toUpperCase() as TransactionType ?? undefined,
    };

    if (!query.type)
      throw new Error('Transaction type is not provided')

    const res = await getTransactions(adminId, query?.type, query)

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Get transactions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}
