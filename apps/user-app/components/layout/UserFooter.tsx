"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserFooterProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
  type?: "mobile" | "desktop";
}

export function UserFooter({ user, type = "desktop" }: UserFooterProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };

  const initial = user?.name ? user.name[0].toUpperCase() : "U";

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <Avatar className={type === "mobile" ? "size-10" : "flex size-10 flex-col justify-center max-xl:hidden"}>
        <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
          {initial}
        </AvatarFallback>
      </Avatar>

      <div className={type === "mobile" ? "flex flex-1 flex-col justify-center" : "flex flex-1 flex-col justify-center max-xl:hidden"}>
        <h1 className="text-14 truncate text-foreground font-semibold">
          {user?.name || "User"}
        </h1>
        <p className="text-12 truncate font-normal text-muted-foreground">
          {user?.email || "No email"}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center hover:bg-transparent"
        onClick={handleLogout}
      >
        <LogOut className="size-5 text-destructive" />
      </Button>
    </footer>
  );
}
