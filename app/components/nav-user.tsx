"use client";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import _ from "lodash";
import { useAuth } from "@/hooks/Auth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuth();

  // Ensure we have initials even if user data is loading
  const firstInitial = _.first(user?.first_name) || "U";
  const lastInitial = _.first(user?.last_name) || "";
  const initials = `${firstInitial}${lastInitial}`;

  // Make sure we have a valid color - remove AvatarImage completely
  const avatarColor = user?.avatar || "#4287f5";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="border bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  style={{ backgroundColor: user?.avatar }}
                  src={user?.avatar}
                  alt={user?.first_name}
                />
                <AvatarFallback className="rounded-lg">
                  {_.first(user?.first_name)}
                  {_.first(user?.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.first_name || "User"}
                </span>
                <span className="truncate text-xs">
                  {user?.email || "Loading..."}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: avatarColor }}
                >
                  {initials}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.first_name || "User"}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email || "Loading..."}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                window.location.replace("https://auth.cw.co.ke");
              }}
              className={"cursor-pointer"}
            >
              <LogOut />
              Manage Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
