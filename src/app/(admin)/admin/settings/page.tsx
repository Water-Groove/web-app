import { Metadata } from "next";
import { getProfile } from "@/services/client/r.service";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import SettingsClient from "@/app/(dashboard)/dashboard/_components/SettingsClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Settings | Water Groove",
  description: "Manage your account settings and profile",
};

const Settings = async () => {
  try {
    const { user } = await resolveServerAuth();

    const profileData = await getProfile(user?.id);

    if (!profileData?.data) {
      throw new Error("Failed to load profile data");
    }

    return <SettingsClient profile={profileData.data} />;
  } catch (error: any) {
    console.error("Error loading profile:", error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div
          role="alert"
          className="w-full max-w-md rounded-2xl border border-wg-accent/30 bg-wg-secondary/40 p-6 text-center shadow-lg"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wg-accent/10">
            <svg
              className="h-6 w-6 text-wg-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75M12 15.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-wg-accent">
            Settings failed to load
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error.message ||
              `Something went wrong while loading your dashboard. Please try again,
            or contact support if the problem persists.`}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#"
              // onClick={() => window.location.reload()}
              className="rounded-lg bg-wg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-wg-accent/90 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              Retry
            </a>

            <a
              href="/support"
              className="rounded-lg border border-wg-accent/40 px-4 py-2 text-sm font-medium text-wg-accent transition hover:bg-wg-accent/10 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              onClick Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Settings;
