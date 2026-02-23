import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

interface ITransaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
  type: "onramp" | "p2p_sent" | "p2p_received";
}

interface IRecentTransactionsProps {
  transactions: ITransaction[];
}

const RecentTransactions = ({ transactions }: IRecentTransactionsProps) => {
  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground h-7 gap-1">
          <Link href="/transactions">
            View all
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col">
        {!transactions.length ? (
          <EmptyState
            icon={Clock}
            title="No transactions yet"
            description="Your recent transactions will appear here."
            actionLabel="Add Money"
            actionHref="/transfer"
          />
        ) : (
          transactions.slice(0, 5).map((t, index) => {
            const isCredit = t.type === "onramp" || t.type === "p2p_received";

            return (
              <div key={index} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground truncate">
                    {t.type === "onramp" ? `Bank Deposit • ${t.provider}` : t.type === "p2p_sent" ? "Sent to User" : "Received from User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.time.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={t.status} />
                  <span className={`text-sm font-semibold tabular-nums ${isCredit ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                    {isCredit ? "+" : "-"}₹{(t.amount / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export { RecentTransactions };
export type { ITransaction };
