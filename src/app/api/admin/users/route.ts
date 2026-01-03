import { NextResponse } from "next/server";
import { resolveServerAuth } from '@/lib/server/auth0-server';
import { AdminUserQueryParams } from '@/types/adminType';
import { getAllUsers } from '@/services/admin/r.service';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    const query: AdminUserQueryParams = {
      page: Number(searchParams.get("page")) ?? undefined,
      limit: Number(searchParams.get("limit")) ?? undefined,
      investmentCategoryId: searchParams.get("investmentCategoryId") as any,
      fullName: searchParams.get("fullName") as string,
      email: searchParams.get("email") as string,
      isActive: searchParams.get("isActive") as any,
    };

    const res = await getAllUsers(adminId, query)

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
