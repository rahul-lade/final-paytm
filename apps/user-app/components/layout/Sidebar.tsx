"use client";

import { sidebarLinks } from "@/constants/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserFooter } from "./UserFooter";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-border bg-card pt-8 text-foreground max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2 justify-center xl:justify-start">
          <div className="size-[34px] rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            P
          </div>
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-foreground max-xl:hidden">
            Paytm
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          const IconStyle = item.imgURL;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start transition-all",
                {
                  "bg-primary": isActive,
                  "text-primary-foreground": isActive,
                  "hover:bg-accent": !isActive,
                }
              )}
            >
              <div className="relative size-6 flex items-center justify-center">
                 <IconStyle className={cn("size-6", { "text-primary-foreground": isActive })} />
              </div>
              <p
                className={cn("text-16 font-semibold max-xl:hidden text-muted-foreground", {
                  "!text-primary-foreground": isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-center xl:justify-start px-1">
          <ThemeToggle />
        </div>
        <UserFooter user={user} />
      </div>
    </section>
  );
}

