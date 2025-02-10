import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { MainNav } from "@/components/dashboard/main-nav";
import { Search } from "@/components/dashboard/search";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main content area with sidebar and outlet */}
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden mt-16">
          {/* Sidebar */}
          <AppSidebar />
          <div className="w-full py-2">
            <div className="w-full">
              <SidebarTrigger className="-ml-1" />
            </div>
            {/* Content area with outlet */}
            <SidebarInset className="flex-1 overflow-auto">
              <div className="">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
