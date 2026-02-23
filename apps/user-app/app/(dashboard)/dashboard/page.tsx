import { getBalance } from "../../lib/data/balance";
import { getRecentTransactions } from "../../lib/data/transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TotalBalanceBox } from "./_components/TotalBalanceBox";
import { QuickActions } from "./_components/QuickActions";
import { RecentTransactions } from "./_components/RecentTransactions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const userName = session?.user?.name || "User";

  const [balance, transactions] = await Promise.all([
    getBalance(userId),
    getRecentTransactions(userId)
  ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">
          Welcome back, <span className="text-primary">{userName}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your wallet today.
        </p>
      </div>

      <TotalBalanceBox amount={balance.amount} locked={balance.locked} />
      <QuickActions />
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Page;