"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/utils/store";
import { sidebarLinks } from "@/constants/nav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, PanelLeftClose, PanelLeft, Bell } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);

  const userName = session?.user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  const currentPage = sidebarLinks.find(
    (link) => pathname === link.route || pathname.startsWith(`${link.route}/`)
  );
  const pageTitle = currentPage?.pageTitle || "Dashboard";

  return (
    <header className="flex items-center justify-between h-14 w-full border-b border-border bg-card px-4 lg:px-6">
      {/* Left: Toggle + Logo + Page Title */}
      <div className="flex items-center gap-3">
        <MobileNav user={session?.user} />

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center size-8 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>

        <Link href="/dashboard" className="flex items-center gap-1.5 md:hidden lg:flex">
          <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            P
          </div>
          <span className="text-base font-bold font-ibm-plex-serif text-foreground">Paytm</span>
        </Link>

        <div className="hidden md:block h-5 w-px bg-border" />

        <h1 className="hidden md:block text-sm font-medium text-muted-foreground">
          {pageTitle}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center size-8 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none ml-1">
            <Avatar className="size-8 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs font-normal text-muted-foreground">{session?.user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-3">
              <User className="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3">
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive gap-3"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export { Header };
