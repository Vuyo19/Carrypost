import { AppNavbar } from "@/components/app/app-navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-app flex min-h-full flex-1 flex-col bg-background text-foreground">
      <AppNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
