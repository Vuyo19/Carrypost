import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-app flex min-h-full flex-1 flex-col bg-background text-foreground">
      <div className="px-6 pt-8 sm:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Carrypost.
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        {children}
      </div>
    </div>
  );
}
