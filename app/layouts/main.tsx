import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

import TeamSwitcher from "@/components/header/team-switcher";
import { UserNav } from "@/components/header/user-nav";
import { withAuth } from "@/hooks/Auth";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex h-16 items-center px-2">
          <TeamSwitcher />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main content area with sidebar and outlet */}
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden mt-16">
          {/* Sidebar */}
          <AppSidebar />
          <div className="w-full py-2 space-y-4">
            <div className="w-full">
              <SidebarTrigger className="-ml-0" />
            </div>
            {/* Content area with outlet */}
            <SidebarInset className="flex-1 overflow-auto">
              <div className="w-full lg:pr-4 p-2">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
export default withAuth(MainLayout, true);
