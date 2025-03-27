import * as React from "react";
import { useNavigate } from "react-router";
import {
  AudioWaveform,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Plus,
  Grid,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export default function TeamSwitcher() {
  const { isMobile } = useSidebar();

  const navigate = useNavigate();
  interface business {
    name: string;
    logo: { id: string } | null;
    plan: string;
  }

  const [currentProfile, setCurrentProfile] = React.useState<business[]>([
    {
      name: "Lumenario",
      logo: null,
      plan: "Free",
    },
  ]);

  const businesses: business[] = [
    {
      name: "Lumenario",
      logo: null,
      plan: "Free",
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="border bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* TODO: support org logo */}
                {currentProfile[0]?.logo ? (
                  <img
                    alt={`${currentProfile[0]?.name}`}
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      import.meta.env.VITE_PRODUCT
                    }/assets/${currentProfile[0]?.logo?.id}?height=100`}
                    className="rounded-lg"
                  />
                ) : (
                  <GalleryVerticalEnd className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentProfile[0]?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Businesses
            </DropdownMenuLabel>
            {businesses.map((business, index) => (
              <DropdownMenuItem
                key={business?.name}
                onClick={() => setCurrentProfile([business])}
                className="gap-2 p-2 cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {business?.logo ? (
                    <img
                      alt={`${business?.name}`}
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        import.meta.env.VITE_PRODUCT
                      }/assets/${business?.logo?.id}?height=100`}
                      className="rounded-sm size-4 shrink-0"
                    />
                  ) : (
                    <AudioWaveform className="size-4 shrink-0" />
                  )}
                </div>
                {business?.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer"
              onClick={() => {
                navigate("/businesses/+");
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add business
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer"
              onClick={() => {
                navigate("/businesses");
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Grid className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Show all</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
