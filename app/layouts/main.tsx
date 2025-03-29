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
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SaturationControl from "@/components/saturation-control";

export default function MainLayout() {
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider className="flex flex-col pt-(--header-height) h-screen">
      <div className="flex flex-1">
        <SaturationControl />
        <AppSidebar />
        <SidebarInset>
          <div className="">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mr-4 lg:mr-4 mx-3 md:mx-6">
              <div className="flex items-center gap-2 px-2">
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
              <Button
                variant="ghost"
                className="group/toggle h-8 w-8 px-0 cursor-pointer"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </Button>
            </header>
            <div className="mx-4 md:mx-6 pt-4 pb-4">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
