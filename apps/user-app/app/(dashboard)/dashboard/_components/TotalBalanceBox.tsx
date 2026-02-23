"use client";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Lock, TrendingUp } from "lucide-react";

interface ITotalBalanceBoxProps {
  amount: number;
  locked: number;
}

const BALANCE_CARDS = [
  { key: "available", label: "Available", icon: Wallet, color: "text-primary" },
  { key: "locked", label: "Locked", icon: Lock, color: "text-muted-foreground" },
  { key: "total", label: "Total Balance", icon: TrendingUp, color: "text-foreground" },
] as const;

const TotalBalanceBox = ({ amount, locked }: ITotalBalanceBoxProps) => {
  const values: Record<string, number> = {
    available: amount,
    locked: locked,
    total: amount + locked,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {BALANCE_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.key} className="border border-border">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className={`size-5 ${card.color}`} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                <AnimatedCounter amount={values[card.key] ?? 0} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export { TotalBalanceBox };
