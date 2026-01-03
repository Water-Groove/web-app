"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { adminNavItems } from "@/config/navigations";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Auth0User, AuthData } from "@/types/type";
import { NavLinks } from "@/types/nav";

interface Props {
  children: React.ReactNode;
  authUser: Auth0User;
}

export default function AdminDashboardShell({ children, authUser }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const authData: AuthData = {
    isLoading: false,
    error: undefined,
    user: authUser
      ? {
          name: authUser.fullName || authUser.nickname || "Admin",
          picture: authUser.picture || undefined,
          email: authUser.email || "",
          role: (authUser as any).role || "admin", // Cast to any if Auth0 admin has custom properties
        }
      : undefined,
  };

  const secondaryNavItems: NavLinks[] = [
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: Settings,
    // }
  ];

  const pageTitle =
    adminNavItems.find((i) => pathname === i.href)?.title ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-white">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 lg:w-72">
        <DashboardSidebar
          pathname={pathname}
          onNavigate={() => {}}
          navItem={adminNavItems}
          secondaryNavItems={secondaryNavItems}
          authUser={authData}
        />
      </aside>

      {/* MOBILE SIDEBAR */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <DashboardSidebar
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            navItem={adminNavItems}
            secondaryNavItems={secondaryNavItems}
            authUser={authData}
          />
        </SheetContent>
      </Sheet>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-white px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="ml-3 text-lg font-semibold">Admim | {pageTitle}</h1>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-2 md:p-6">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white px-4 py-3 text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} Water Groove
        </footer>
      </div>
    </div>
  );
}
