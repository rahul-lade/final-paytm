"use client";

import { BalanceChart } from "./BalanceChart";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Card, CardContent } from "@/components/ui/card";

interface TotalBalanceBoxProps {
  amount: number;
  locked: number;
}

const TotalBalanceBox = ({ amount, locked }: TotalBalanceBoxProps) => {
  return (
    <Card className="w-full border border-border">
      <CardContent className="flex items-center gap-5 p-5 sm:p-6">
        <BalanceChart available={amount} locked={locked} />

        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-foreground">
            Wallet Balance
          </h2>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Current Balance
            </p>
            <div className="flex items-center gap-2">
              <AnimatedCounter amount={amount + locked} />
            </div>
          </div>
          <div className="flex gap-5 text-sm">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Available: ₹{(amount / 100).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Locked: ₹{(locked / 100).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TotalBalanceBox };
