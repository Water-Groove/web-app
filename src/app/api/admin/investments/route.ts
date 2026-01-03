import { InvestmentStatus, TransactionStatus, TransactionType } from '@prisma/client';
import { NextResponse } from "next/server";
import { resolveServerAuth } from '@/lib/server/auth0-server';
import { AdminInvestmentQueryParams } from '@/types/adminType';
import { getAllInvestments } from '@/services/admin/r.service';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    const query: AdminInvestmentQueryParams = {
      status: (searchParams.get("status") as InvestmentStatus) ?? undefined,
      page: Number(searchParams.get("page")) ?? undefined,
      limit: Number(searchParams.get("limit")) ?? undefined,
      order: searchParams.get("order") as any,
      startDate: searchParams.get("startDate") as any,
      endDate: searchParams.get("endDate") as any,
      categoryId: searchParams.get("categoryId") as any,
      userId: searchParams.get("userId") as any,
    };

    const res = await getAllInvestments(adminId, query)

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
