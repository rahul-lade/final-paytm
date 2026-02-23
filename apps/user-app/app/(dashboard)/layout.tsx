import { Sidebar } from "../../components/layout/Sidebar";
import { Header } from "../../components/layout/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col h-screen w-full font-inter bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </div>
          <footer className="w-full border-t border-border py-4 px-6 text-center lg:text-left flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
            <p className="text-xs text-muted-foreground">
              © 2026 Paytm Clone. Complete Full-Stack Portfolio.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground transition-colors">Help</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;