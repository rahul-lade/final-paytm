"use client";

import { useSession } from "next-auth/react";
import { MobileNav } from "./MobileNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const initial = userName ? userName[0].toUpperCase() : "U";

  return (
    <div className="flex flex-col gap-1 w-full bg-card p-5 shadow-sm md:hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4 lg:bg-transparent lg:shadow-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MobileNav user={session?.user} />
          <h1 className="text-24 lg:text-30 font-semibold text-foreground md:hidden lg:block">
            Welcome back, <span className="text-primary">{userName}</span>
          </h1>
        </div>
        <div className="md:hidden">
          <Avatar className="size-10">
            <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
              {initial}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <p className="text-14 lg:text-16 font-normal text-muted-foreground md:hidden lg:block">
        Access & manage your account and transactions efficiently.
      </p>
    </div>
  );
}
