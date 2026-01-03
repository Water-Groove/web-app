import { NextResponse } from "next/server";
import { createDepositService } from "@/services/client/cud.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { investmentCatId, amount, description } = body;

    if (!investmentCatId || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "investmentCatId and amount are required",
          data: null,
        },
        { status: 400 }
      );
    }

    const res = await createDepositService({
      investmentCatId,
      amount,
      description,
    });

    if (!res.success) {
      return NextResponse.json(
        {
          success: false,
          message: res.message,
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: res.message,
        data: res.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Deposit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
