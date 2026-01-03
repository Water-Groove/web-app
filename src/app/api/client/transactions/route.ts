import { TransactionStatus, TransactionType } from '@prisma/client';
import { NextResponse } from "next/server";
import { TransactionQueryParams } from "@/types/type";
import { getTransactions } from "@/services/client/r.service";
import { resolveServerAuth } from '@/lib/server/auth0-server';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const resolved = await resolveServerAuth()
    const userId = resolved.user.id;
    const query: TransactionQueryParams = {
      type: (searchParams.get("type")?.toUpperCase() as TransactionType) ?? undefined,
      status: (searchParams.get("status") as TransactionStatus) ?? undefined,
      page: Number(searchParams.get("page")) ?? undefined,
      limit: Number(searchParams.get("limit")) ?? undefined,
      sortBy: searchParams.get("sortBy") as any,
      sortOrder: searchParams.get("sortOrder") as any,
    };

    const res = await getTransactions(userId, query);

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
