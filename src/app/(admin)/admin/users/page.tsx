import { Metadata } from "next";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { getAllUsers } from "@/services/admin/r.service";
import { AdminUserQueryParams } from "@/types/adminType";
import UsersClient from "../_components/UsersCleint";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "User Management | Water Groove Admin",
  description: "Manage platform users and their permissions",
};

const Users = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resolved = await resolveServerAuth();
  const adminId = resolved?.user?.id;

  // Parse query parameters
  const queryParams: AdminUserQueryParams = {
    fullName: (searchParams.fullName as string) || undefined,
    email: (searchParams.email as string) || undefined,
    isActive: searchParams.isActive
      ? searchParams.isActive === "true"
      : undefined,
    investmentCategoryId:
      (searchParams.investmentCategoryId as string) || undefined,
  };

  const page = parseInt((searchParams.page as string) || "1");
  const limit = parseInt((searchParams.limit as string) || "20");

  try {
    const res = await getAllUsers(adminId, {
      ...queryParams,
      page,
      limit,
    });

    const data = res?.data ?? {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    // Get total users count (you might need a separate endpoint for this)
    const totalUsers = data.total;

    return (
      <div className="">
        <UsersClient initialData={data} totalUsers={totalUsers} />
      </div>
    );
  } catch (error) {
    console.error("Error loading users:", error);
    return (
      <div className="min-h-screen bg-wg-neutral flex items-center justify-center">
        <Card className="bg-wg-neutral2 border-wg-accent/20 max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4 inline-block">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-wg-primary mb-2">
              Failed to Load Users
            </h2>
            <p className="text-wg-primary/60 mb-4">
              There was an error loading the user data. Please try again.
            </p>
            <Button
              // onClick={() => window.location.reload()}
              className="bg-wg-accent text-white hover:bg-wg-accent/90"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Users;
