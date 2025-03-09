import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Home,
  Users,
  FileText,
  CreditCard,
  Send,
  Briefcase,
  AppWindow,
} from "lucide-react";
import { useTheme } from "@/context/use-theme";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Clients",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Add",
          url: "/clients/add",
        },
        {
          title: "Explorer",
          url: "/clients",
        },
      ],
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: FileText,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
    {
      title: "Outreach",
      url: "/outreach",
      icon: Send,
    },
    {
      title: "Employees",
      url: "/employees",
      icon: Briefcase,
    },
    {
      title: "Applications",
      url: "/applications",
      icon: AppWindow,
    },
    {
      title: "System",
      url: "/system",
      icon: Settings2,
      items: [
        {
          title: "Settings",
          url: "/settings",
        },
        {
          title: "Reports",
          url: "/settings/reports",
        },
        {
          title: "Help Desk",
          url: "/settings/help-desk",
        },
        {
          title: "Integrations",
          url: "/settings/integrations",
        },
        {
          title: "Logs",
          url: "/settings/logs",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  return (
    <Sidebar collapsible={"icon"} {...props}>
      <SidebarHeader className="flex items-center justify-center">
        <img
          src={theme === "dark" ? "golden.png" : "/golden-line.png"}
          className="w-32 h-32"
          alt="logo"
        />{" "}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
