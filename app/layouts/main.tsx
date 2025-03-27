import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useWorkspace } from "@/hooks/useWorkspace";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/use-theme";
import { useLocation } from "react-router";
import { SunMoon } from "lucide-react";

export default function MainLayout() {
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider className="flex flex-col pt-(--header-height) h-screen">
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mr-4 lg:mr-4 mx-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-3" />
                {!!workspace.breadcrumbs.length && (
                  <Separator orientation="vertical" className="mr-2 h-4" />
                )}
                {workspace.breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    <Breadcrumb>
                      <BreadcrumbList>
                        {breadcrumb.active ? (
                          <BreadcrumbItem>
                            <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink
                              href={`/${breadcrumb.url ?? undefined}`}
                              className={cn(
                                breadcrumb.url
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                if (breadcrumb.url)
                                  navigate(`/${breadcrumb.url}`);
                              }}
                            >
                              {breadcrumb.name}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        )}
                        {index < workspace.breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex jistify-end items-center">
                <SunMoon className="h-4 w-4" onClick={toggleTheme} />
              </div>
            </header>
            <div className="mx-2 md:mx-4 pt-4 pb-4">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Outlet } from "react-router";

// import TeamSwitcher from "@/components/header/team-switcher";
// import { UserNav } from "@/components/header/user-nav";
// import { withAuth } from "@/hooks/Auth";

// const MainLayout = () => {
//   return (
//     <div className="flex flex-col">
//       {/* Main content area with sidebar and outlet */}
//       <SidebarProvider>
//         <div className="flex flex-1 overflow-hidden">
//           {/* Sidebar */}
//           <AppSidebar />
//           <div className="w-full py-2">
//             <div className="pr-2 md:pr-4 w-full flex items-center justify-between">
//               <SidebarTrigger className="" />
//               <UserNav />
//             </div>
//             {/* Content area with outlet */}
//             <SidebarInset className="flex-1 overflow-auto">
//               <div className="w-full lg:pr-4 p-2">
//                 <Outlet />
//               </div>
//             </SidebarInset>
//           </div>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// };
// export default withAuth(MainLayout, true);
