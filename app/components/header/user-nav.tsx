import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/Auth";
import { LogOut, SunMoon } from "lucide-react";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/use-theme";
import _ from "lodash";

export function UserNav() {
  const { theme, toggleTheme } = useTheme();

  const { logout, user } = useAuth();

  // Ensure we have initials even if user data is loading
  const firstInitial = _.first(user?.first_name) || "U";
  const lastInitial = _.first(user?.last_name) || "";
  const initials = `${firstInitial}${lastInitial}`;

  // Make sure we have a valid color - remove AvatarImage completely
  const avatarColor = user?.avatar || "#4287f5";

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="border relative h-8 w-8 rounded-full"
    //     >
    //       {initials}
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-56" align="end" forceMount>
    //     <DropdownMenuLabel className="font-normal">
    //       <div className="flex flex-col space-y-1">
    //         <p className="text-sm font-medium leading-none">
    //           {user?.first_name + " " + user?.last_name}
    //         </p>
    //         <p className="text-xs leading-none text-muted-foreground">
    //           {user?.phone}
    //         </p>
    //       </div>
    //     </DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       onSelect={(e) => e.preventDefault()}
    //       className="flex items-center justify-between cursor-default"
    //     >
    //       <div className="flex items-center gap-2">
    //         <SunMoon className="h-4 w-4" />
    //         <span>Toggle theme</span>
    //       </div>
    //       <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    //     </DropdownMenuItem>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem onClick={logout}>
    //       Log out
    //       <DropdownMenuShortcut>
    //         <LogOut className="h-4 w-4 text-muted-foreground" />
    //       </DropdownMenuShortcut>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div>
      <SunMoon className="h-4 w-4" onClick={toggleTheme} />
    </div>
  );
}
