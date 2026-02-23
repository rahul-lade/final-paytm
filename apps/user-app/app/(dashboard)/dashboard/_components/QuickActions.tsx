import Link from "next/link";
import { ArrowRightLeft, Send, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ACTIONS = [
  {
    icon: ArrowRightLeft,
    label: "Add Money",
    description: "Add from bank",
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
    description: "All transactions",
    href: "/transactions",
  },
];

const QuickActions = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="border border-border hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="flex flex-col items-center gap-1 p-5">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mt-1">{action.label}</h3>
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
