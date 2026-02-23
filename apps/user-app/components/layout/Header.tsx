"use client";

import { useSession, signOut } from "next-auth/react";
import { MobileNav } from "./MobileNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const initial = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex flex-col gap-1 w-full bg-card p-5 border-b border-border md:hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4 lg:bg-transparent lg:border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MobileNav user={session?.user} />
          <h1 className="text-24 lg:text-30 font-semibold text-foreground md:hidden lg:block">
            Welcome back, <span className="text-primary">{userName}</span>
          </h1>
        </div>
        <div className="md:hidden lg:flex items-center ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="size-10 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                  {initial}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="flex flex-col">
                <span>{userName}</span>
                <span className="text-xs font-normal text-muted-foreground">{session?.user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => signOut({ callbackUrl: "/signin" })}>
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="text-14 lg:text-16 font-normal text-muted-foreground md:hidden lg:block">
        Access & manage your account and transactions efficiently.
      </p>
    </div>
  );
}
