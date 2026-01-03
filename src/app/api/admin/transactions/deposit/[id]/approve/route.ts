import { resolveServerAuth } from "@/lib/server/auth0-server";
import { approveDeposit, rejectDeposit } from "@/services/admin/cud.service";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,  context: { params: Promise<{ id: string; }> }) {
  try {
    const transactionId = (await context.params).id
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: "transactionId is required" },
        { status: 400 }
      );
    }

    const res = await approveDeposit(transactionId, adminId);

    if (!res.success) return NextResponse.json({ success: false, message: res.message || "Unable to approve deposit" }, { status: 400 })

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
