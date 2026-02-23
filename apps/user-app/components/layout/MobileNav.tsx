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
import { UserFooter } from "./UserFooter";

interface MobileNavProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
}

export function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center justify-center p-2 rounded-md hover:bg-accent text-foreground">
            <Menu className="size-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-card p-0">
          <Link href="/" className="cursor-pointer flex items-center gap-2 px-6 pt-8 pb-4">
            <div className="size-[34px] rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              P
            </div>
            <h1 className="text-26 font-ibm-plex-serif font-bold text-foreground">Paytm</h1>
          </Link>

          <div className="flex h-[calc(100vh-100px)] flex-col justify-between overflow-y-auto px-4 pb-4">
            <nav className="flex h-full flex-col gap-2 pt-4">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                const IconStyle = item.imgURL;

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={cn(
                        "flex gap-3 items-center p-4 rounded-lg w-full transition-all",
                        {
                          "bg-primary text-primary-foreground": isActive,
                          "hover:bg-accent": !isActive,
                        }
                      )}
                    >
                      <IconStyle className={cn("size-5", { "text-primary-foreground": isActive })} />
                      <p className={cn("text-16 font-semibold", { "text-primary-foreground": isActive })}>
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            <UserFooter user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
