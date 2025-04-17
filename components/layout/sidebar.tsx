import {  Camera, FlaskConical, LayoutDashboard, LogOut, Monitor, ScanEye, User, UserPen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Cameras",
    url: "/dashboard/cameras",
    icon: Camera,
  },
  {
    title: "Panels",
    url: "/dashboard/panels",
    icon: Monitor,
  },
  {
    title: "User Profiles",
    url: "/dashboard/users",
    icon: UserPen,
  },
  {
    title: "Eye Tracker Profiles",
    url: "/dashboard/eye-tracker",
    icon: ScanEye,
  },
  {
    title: "Eye Tracker Expermients",
    url: "/dashboard/eye-tracker-experiments",
    icon: FlaskConical,
  },
];

const account = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="flex flex-col border-gray-200 bg-background mr-8">
      <SidebarHeader>
        {/* <h1 className="text-2xl font-bold">ParvAI Labs</h1> */}
        <div className="w-[50%] overflow-hidden rounded-md">
          <Image
            src={"/logo.png"}
            className="w-full"
            width={150}
            height={50}
            alt="ParvAI Labs Logo"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-secondary">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-secondary">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="w-full flex gap-4 pt-2">
          <div className="p-4 border rounded-full">
            <User size={20} />
          </div>
          <div>
            <p className="font-bold text-lg">Manish</p>
            <span className="text-sm">System Admin</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
