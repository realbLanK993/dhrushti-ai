import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col gap-4 w-full min-h-screen h-full flex-1">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
