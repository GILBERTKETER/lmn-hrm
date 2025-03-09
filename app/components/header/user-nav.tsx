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

export function UserNav() {
  const { theme, toggleTheme } = useTheme();

  const { logout, user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.first_name + " " + user?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex items-center justify-between cursor-default"
        >
          <div className="flex items-center gap-2">
            <SunMoon className="h-4 w-4" />
            <span>Toggle theme</span>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
