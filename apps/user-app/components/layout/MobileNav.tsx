"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/nav";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMobileNavProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
}

const MobileNav = ({ user }: IMobileNavProps) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center justify-center size-8 rounded-md hover:bg-accent text-foreground">
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-card p-0 w-64">
          <Link href="/dashboard" className="flex items-center gap-1.5 px-5 pt-6 pb-3">
            <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              P
            </div>
            <span className="text-base font-bold font-ibm-plex-serif text-foreground">Paytm</span>
          </Link>

          <nav className="flex flex-col gap-1 px-3 pt-3">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              const Icon = item.icon;

              return (
                <SheetClose asChild key={item.route}>
                  <Link
                    href={item.route}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all relative",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary" />
                    )}
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { MobileNav };
