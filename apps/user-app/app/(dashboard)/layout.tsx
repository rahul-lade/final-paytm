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
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background sm:p-8 p-4">
          {children}
        </div>
      </div>
    </main>
  );
}