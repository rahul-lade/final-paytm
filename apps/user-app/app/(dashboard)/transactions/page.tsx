import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { HeaderBox } from "@/components/shared/HeaderBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Failure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const getAllTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const onRamp = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });

  const p2pSent = await prisma.p2pTransfer.findMany({
    where: { fromUserId: userId },
    orderBy: { timestamp: "desc" },
    include: { toUser: { select: { name: true, number: true } } },
  });

  const p2pReceived = await prisma.p2pTransfer.findMany({
    where: { toUserId: userId },
    orderBy: { timestamp: "desc" },
    include: { fromUser: { select: { name: true, number: true } } },
  });

  const all = [
    ...onRamp.map((t) => ({
      id: `onramp-${t.id}`,
      description: `Bank Deposit • ${t.provider}`,
      amount: t.amount,
      status: t.status,
      date: t.startTime,
      type: "credit" as const,
      channel: "Bank",
    })),
    ...p2pSent.map((t) => ({
      id: `p2p-sent-${t.id}`,
      description: `Sent to ${t.toUser?.name || t.toUser?.number || "User"}`,
      amount: t.amount,
      status: "Success",
      date: t.timestamp,
      type: "debit" as const,
      channel: "P2P",
    })),
    ...p2pReceived.map((t) => ({
      id: `p2p-recv-${t.id}`,
      description: `Received from ${t.fromUser?.name || t.fromUser?.number || "User"}`,
      amount: t.amount,
      status: "Success",
      date: t.timestamp,
      type: "credit" as const,
      channel: "P2P",
    })),
  ];

  all.sort((a, b) => b.date.getTime() - a.date.getTime());
  return all;
};

const Page = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="flex flex-col gap-8">
      <HeaderBox title="Transaction History" subtext="View all your past transactions" />

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {!transactions.length ? (
            <p className="text-center py-10 text-muted-foreground">No transactions found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="px-2">Transaction</TableHead>
                  <TableHead className="px-2">Amount</TableHead>
                  <TableHead className="px-2">Status</TableHead>
                  <TableHead className="px-2">Date</TableHead>
                  <TableHead className="px-2 hidden md:table-cell">Channel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id} className={t.type === "debit" ? "bg-red-50/50 dark:bg-red-950/10" : "bg-green-50/50 dark:bg-green-950/10"}>
                    <TableCell className="max-w-[250px] pl-2 pr-10">
                      <span className="text-sm truncate font-semibold text-foreground">
                        {t.description}
                      </span>
                    </TableCell>
                    <TableCell className={`pl-2 pr-10 font-semibold tabular-nums ${t.type === "debit" ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {t.type === "debit" ? "-" : "+"}₹{(t.amount / 100).toLocaleString()}
                    </TableCell>
                    <TableCell className="pl-2 pr-10">
                      <Badge variant="outline" className={STATUS_STYLES[t.status] || ""}>
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-32 pl-2 pr-10 text-sm text-muted-foreground">
                      {t.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </TableCell>
                    <TableCell className="pl-2 pr-10 capitalize hidden md:table-cell text-sm text-muted-foreground">
                      {t.channel}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;