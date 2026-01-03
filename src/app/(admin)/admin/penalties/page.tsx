import { Metadata } from "next";
import { getAllPenalties } from "@/services/admin/r.service";
import PenaltiesClient from "../_components/PenaltiesClient";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { AdminPenaltiesQueryParams } from "@/types/adminType";

export const metadata: Metadata = {
  title: "Penalties Management | Water Groove Admin",
  description: "Manage and monitor all penalty transactions",
};

export const dynamic = 'force-dynamic';

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  try {
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id;
    const searchP = await searchParams;

    // Parse query parameters
    const params: AdminPenaltiesQueryParams = {
      transactionId: (searchP.transactionId as string) || undefined,
      order: (searchP.order as "asc" | "desc") || "desc",
      page: searchP.page ? parseInt(searchP.page as string) : 1,
      limit: searchP.limit ? parseInt(searchP.limit as string) : 20,
    };

    const response = await getAllPenalties(adminId, params);

    const data = response?.data ?? {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    return (
      <PenaltiesClient
        initialPenalties={data.data}
        total={data.total}
        page={data.page}
        limit={data.limit}
        totalPages={data.totalPages}
      />
    );
  } catch (error) {
    console.error("Error loading penalties:", error);

    // Fallback data for error state
    const fallbackData = {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };

    return (
      <PenaltiesClient
        initialPenalties={fallbackData.data}
        total={fallbackData.total}
        page={fallbackData.page}
        limit={fallbackData.limit}
        totalPages={fallbackData.totalPages}
        isFallbackData={true}
      />
    );
  }
};

export default page;
