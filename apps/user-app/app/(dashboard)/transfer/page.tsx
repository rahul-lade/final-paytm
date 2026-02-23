import { getBalance } from "../../lib/data/balance";
import { getOnRampTransactions } from "../../lib/data/transactions";

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Failure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { HeaderBox } from "@/components/shared/HeaderBox";
import { AddMoneyForm } from "./_components/AddMoneyForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const [balance, transactions] = await Promise.all([
    getBalance(userId),
    getOnRampTransactions(userId)
  ]);

  return (
    <div className="flex flex-col gap-8">
      <HeaderBox title="Transfer" subtext="Add money to your wallet from your bank account" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <AddMoneyForm />

        <div className="flex flex-col gap-5">
          <Card className="border border-border">
            <CardContent className="p-5">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Available Balance</span>
                  <span className="text-sm font-semibold text-foreground">₹{(balance.amount / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Locked Balance</span>
                  <span className="text-sm font-semibold text-foreground">₹{(balance.locked / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">Total Balance</span>
                  <span className="text-sm font-bold text-foreground">₹{((balance.amount + balance.locked) / 100).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Recent Deposits</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {!transactions.length ? (
                <p className="text-center py-5 text-muted-foreground text-sm">No recent deposits</p>
              ) : (
                transactions.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{t.provider}</span>
                      <span className="text-xs text-muted-foreground">{t.time.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={STATUS_STYLES[t.status] || ""}>
                        {t.status}
                      </Badge>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400 tabular-nums">
                        +₹{(t.amount / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;