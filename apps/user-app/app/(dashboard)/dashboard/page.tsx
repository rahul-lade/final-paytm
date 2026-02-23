import { getBalance } from "../../lib/data/balance";
import { getRecentTransactions } from "../../lib/data/transactions";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { HeaderBox } from "@/components/shared/HeaderBox";
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
    <div className="flex flex-col gap-8">
      <HeaderBox
        type="greeting"
        title="Welcome,"
        user={userName}
        subtext="Access & manage your account and transactions efficiently."
      />

      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex flex-col gap-8 flex-1">
          <TotalBalanceBox amount={balance.amount} locked={balance.locked} />
          <QuickActions />
        </div>
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Page;