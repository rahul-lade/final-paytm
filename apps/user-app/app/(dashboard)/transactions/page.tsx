import { getPaginatedTransactions } from "../../lib/data/transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const { data: transactions, hasMore } = await getPaginatedTransactions(userId, skip, limit);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">Transaction History</h1>
        <p className="text-sm text-muted-foreground">View all your past transactions</p>
      </div>

      <Card className="border border-border">
        <CardContent className="p-0">
          {!transactions.length ? (
            <EmptyState
              icon={Clock}
              title="No transactions found"
              description="Start by adding money to your wallet or making a P2P transfer."
              actionLabel="Add Money"
              actionHref="/transfer"
            />
          ) : (
            <div className="flex flex-col">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-medium">Transaction</TableHead>
                    <TableHead className="text-xs font-medium">Amount</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                    <TableHead className="text-xs font-medium">Date</TableHead>
                    <TableHead className="text-xs font-medium hidden md:table-cell">Channel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <span className="text-sm font-medium text-foreground truncate">
                          {t.description}
                        </span>
                      </TableCell>
                      <TableCell className={`font-semibold tabular-nums text-sm ${t.type === "debit" ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                        {t.type === "debit" ? "-" : "+"}₹{(t.amount / 100).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={t.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {t.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </TableCell>
                      <TableCell className="capitalize hidden md:table-cell text-sm text-muted-foreground">
                        {t.channel}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {(page > 1 || hasMore) && transactions.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Page {page}</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" asChild disabled={page <= 1} className="h-7 text-xs">
                      <Link href={page > 1 ? `/transactions?page=${page - 1}` : "#"} className={page <= 1 ? "pointer-events-none opacity-50" : ""}>
                        <ChevronLeft className="size-3.5 mr-0.5" /> Previous
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild disabled={!hasMore} className="h-7 text-xs">
                      <Link href={hasMore ? `/transactions?page=${page + 1}` : "#"} className={!hasMore ? "pointer-events-none opacity-50" : ""}>
                        Next <ChevronRight className="size-3.5 ml-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;