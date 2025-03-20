import {
  Blocks,
  Calendar,
  Camera,
  FlaskConical,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Monitor,
  ScanEye,
  Search,
  Settings,
  User,
  UserPen,
  Users,
} from "lucide-react";

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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Cameras",
    url: "#",
    icon: Camera,
  },
  {
    title: "Panels",
    url: "#",
    icon: Monitor,
  },
  {
    title: "User Profiles",
    url: "#",
    icon: UserPen,
  },
  {
    title: "Eye Tracker Profiles",
    url: "#",
    icon: ScanEye,
  },
  {
    title: "Eye Tracker Expermients",
    url: "#",
    icon: FlaskConical,
  },
];

const account = [
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function Rightbar() {
  return (
    <Sidebar
      side="right"
      className="flex flex-col border-gray-200 bg-background mr-8 max-w-[300px] w-full"
    >
      <SidebarContent className="pt-4">
        <div className="p-8 w-full border-l border-gray-200">
          <div className="flex flex-col justify-center gap-4 items-center py-12">
            {/* <div className="p-16 border hover:text-primary-foreground transition-colors duration-300 hover:bg-primary rounded-full w-fit">
            <ChartNoAxesCombined size={40} />
          </div> */}
            <p>Your uptime this month</p>
            <div>
              <p className="text-8xl font-bold text-center">98.5%</p>
              <span className="text-gray-400 text-center w-full block text-sm hover:underline cursor-pointer">
                See more ↗
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="border-2 border-green-700 hover:bg-green-700 text-foreground hover:text-white p-4 px-8 rounded-xl flex gap-2 justify-center items-center">
              <FlaskConical /> Start Eye Tracker Experiment
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
