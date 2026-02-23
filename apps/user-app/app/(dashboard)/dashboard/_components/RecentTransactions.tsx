import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
  type: "onramp" | "p2p_sent" | "p2p_received";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Failure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  if (!transactions.length) {
    return (
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">No recent transactions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Link
          href="/transactions"
          className="text-sm rounded-lg border border-border px-4 py-2 font-semibold text-muted-foreground hover:bg-accent transition-colors"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {transactions.slice(0, 5).map((t, index) => {
          const isCredit = t.type === "onramp" || t.type === "p2p_received";

          return (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-foreground truncate">
                  {t.type === "onramp" ? `Bank Deposit • ${t.provider}` : t.type === "p2p_sent" ? "Sent to User" : "Received from User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.time.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={STATUS_STYLES[t.status] || STATUS_STYLES.Processing}>
                  {t.status}
                </Badge>
                <span className={`text-sm font-semibold tabular-nums ${isCredit ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {isCredit ? "+" : "-"}₹{(t.amount / 100).toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export { RecentTransactions };
export type { Transaction };
