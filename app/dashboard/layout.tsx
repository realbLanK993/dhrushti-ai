import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-4">
      <Navbar />
      <div className="p-4">{children}</div>
    </main>
  );
}
