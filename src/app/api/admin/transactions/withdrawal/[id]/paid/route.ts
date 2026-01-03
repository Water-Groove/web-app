import { resolveServerAuth } from "@/lib/server/auth0-server";
import { paidWithdrawal } from "@/services/admin/cud.service";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,  context: { params: Promise<{ id: string; }> }) {
  try {
    const txnId = (await context.params).id
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    if (!txnId) {
      return NextResponse.json(
        { success: false, message: "transactionId/status is missing" },
        { status: 400 }
      );
    }

    const res = await paidWithdrawal(txnId, adminId);

    if (!res.success) return NextResponse.json({ success: res.success, message: res.message || "Unable to update withdrawal status" }, { status: 400 })

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
