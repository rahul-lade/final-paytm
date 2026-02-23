import { Sidebar } from "../../components/layout/Sidebar";
import { Header } from "../../components/layout/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="flex h-screen w-full font-inter bg-background">
      <Sidebar user={session.user} />

      <div className="flex flex-col size-full">
        <Header />
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-background">
          <div className="flex-1 sm:p-8 p-4">
            {children}
          </div>
          <footer className="w-full border-t border-border py-5 px-6 xl:px-8 text-center lg:text-left flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto bg-transparent">
             <p className="text-sm font-medium text-muted-foreground">
               © 2026 Paytm Clone. Complete Full-Stack Portfolio.
             </p>
             <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
               <span className="cursor-pointer hover:text-foreground transition-colors">Help</span>
               <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
               <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}