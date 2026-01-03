"use server";

import prisma from "@/lib/prisma";
import { roiCronService } from "@/services/admin/cud.service";
import { ApiResponse, InvestmenCrontDto } from "@/types/type";
import { mapInvestmentToCronDto } from "@/utils/mapper";
import { InvestmentStatus } from "@prisma/client";

export const runMonthlyROI = async (): Promise<ApiResponse<null>> => {
  try {
    const investments = await prisma.investment.findMany({
      where: {
        status: InvestmentStatus.ACTIVE,
      },
      include: {
        investorBalance: true,
      },
    });

    for (const investment of investments) {
      if (!investment.investorBalance) {
        console.warn(`Skipping investment ${investment.id}: no balance`);
        continue;
      }

      const dto = mapInvestmentToCronDto(investment);
      await roiCronService(dto);
    }

    return {
      success: true,
      message: "Monthly ROI processed successfully",
      data: null,
    };
  } catch (error: any) {
    console.error("runMonthlyROI error:", error);
    return {
      success: false,
      message: error?.message || "Failed to process monthly ROI",
      data: null,
    };
  }
};
