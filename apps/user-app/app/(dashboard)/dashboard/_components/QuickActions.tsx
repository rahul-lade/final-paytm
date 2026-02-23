import Link from "next/link";
import { ArrowRightLeft, Send, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ACTIONS = [
  {
    icon: ArrowRightLeft,
    label: "Add Money",
    description: "From bank account",
    href: "/transfer",
  },
  {
    icon: Send,
    label: "Send Money",
    description: "P2P transfer",
    href: "/p2p",
  },
  {
    icon: Clock,
    label: "History",
    description: "View transactions",
    href: "/transactions",
  },
];

const QuickActions = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="border border-border hover:border-primary/40 transition-all cursor-pointer group">
                <CardContent className="flex flex-col items-center gap-1 p-3">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <h3 className="text-xs font-semibold text-foreground mt-0.5">{action.label}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { QuickActions };
