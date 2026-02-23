import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { HeaderBox } from "@/components/shared/HeaderBox";
import { TotalBalanceBox } from "./_components/TotalBalanceBox";
import { QuickActions } from "./_components/QuickActions";
import { RecentTransactions } from "./_components/RecentTransactions";
import type { Transaction } from "./_components/RecentTransactions";

const getBalance = async () => {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: { userId: Number(session?.user?.id) },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};

const getRecentTransactions = async (): Promise<Transaction[]> => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const onRamp = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  const p2pSent = await prisma.p2pTransfer.findMany({
    where: { fromUserId: userId },
    orderBy: { timestamp: "desc" },
    take: 5,
  });

  const p2pReceived = await prisma.p2pTransfer.findMany({
    where: { toUserId: userId },
    orderBy: { timestamp: "desc" },
    take: 5,
  });

  const all: Transaction[] = [
    ...onRamp.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
      type: "onramp" as const,
    })),
    ...p2pSent.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      status: "Success",
      provider: "P2P",
      type: "p2p_sent" as const,
    })),
    ...p2pReceived.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      status: "Success",
      provider: "P2P",
      type: "p2p_received" as const,
    })),
  ];

  all.sort((a, b) => b.time.getTime() - a.time.getTime());
  return all.slice(0, 5);
};

const Page = async () => {
  const balance = await getBalance();
  const transactions = await getRecentTransactions();

  return (
    <div className="flex flex-col gap-8">
      <HeaderBox
        type="greeting"
        title="Welcome,"
        user="User"
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