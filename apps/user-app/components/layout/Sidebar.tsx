"use client";

import { sidebarLinks } from "@/constants/nav";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { sidebarCollapsedAtom } from "@/utils/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed] = useAtom(sidebarCollapsedAtom);

  return (
    <aside
      className={cn(
        "sticky left-0 top-0 hidden md:flex h-full flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <nav className="flex flex-col gap-1 px-3 py-3 flex-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          const Icon = item.icon;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all relative",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary" />
              )}
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export { Sidebar };
