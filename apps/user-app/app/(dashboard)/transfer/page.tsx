import { getBalance } from "../../lib/data/balance";
import { getOnRampTransactions } from "../../lib/data/transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoneyForm } from "./_components/AddMoneyForm";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ArrowRightLeft } from "lucide-react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const [balance, transactions] = await Promise.all([
    getBalance(userId),
    getOnRampTransactions(userId)
  ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">Transfer</h1>
        <p className="text-sm text-muted-foreground">Add money to your wallet from your bank account</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AddMoneyForm />

        <div className="flex flex-col gap-3">
          <Card className="border border-border">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-xs text-muted-foreground">Available Balance</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">₹{(balance.amount / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-xs text-muted-foreground">Locked Balance</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">₹{(balance.locked / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-foreground">Total Balance</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">₹{((balance.amount + balance.locked) / 100).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Recent Deposits</h3>
              {!transactions.length ? (
                <EmptyState
                  icon={ArrowRightLeft}
                  title="No recent deposits"
                  description="Your deposit history will appear here."
                />
              ) : (
                <div className="flex flex-col">
                  {transactions.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">{t.provider}</span>
                        <span className="text-xs text-muted-foreground">{t.time.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={t.status} />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400 tabular-nums">
                          +₹{(t.amount / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;