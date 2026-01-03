import { resolveServerAuth } from "@/lib/server/auth0-server";
import { updateInvestment } from "@/services/admin/cud.service";
import { InvestmentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const ivstId = (await context.params).id
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    const { status }: { status: InvestmentStatus } = await req.json()

    if (!ivstId || !status) {
      return NextResponse.json(
        { success: false, message: "transactionId/status is missing" },
        { status: 400 }
      );
    }

    const res = await updateInvestment(ivstId, status, adminId);

    if (!res.success) return NextResponse.json({ success: res.success, message: res.message || "Unable to update investment status" }, { status: 400 })

    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.error("Deposit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
