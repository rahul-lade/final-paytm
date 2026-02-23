import { getPaginatedTransactions } from "../../lib/data/transactions";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Failure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const { data: transactions, hasMore } = await getPaginatedTransactions(userId, skip, limit);

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
            <div className="flex flex-col gap-4">
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
              
              {(page > 1 || hasMore) && transactions.length > 0 && (
                <div className="flex items-center justify-between pt-4 pb-2">
                  <span className="text-sm text-muted-foreground">Page {page}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild disabled={page <= 1}>
                      <Link href={page > 1 ? `/transactions?page=${page - 1}` : "#"} className={page <= 1 ? "pointer-events-none opacity-50" : ""}>
                        <ChevronLeft className="size-4 mr-1" /> Previous
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild disabled={!hasMore}>
                      <Link href={hasMore ? `/transactions?page=${page + 1}` : "#"} className={!hasMore ? "pointer-events-none opacity-50" : ""}>
                        Next <ChevronRight className="size-4 ml-1" />
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