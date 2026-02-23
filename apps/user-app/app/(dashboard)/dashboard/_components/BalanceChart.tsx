"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface BalanceChartProps {
  available: number;
  locked: number;
}

const COLORS = ["hsl(221.2, 83.2%, 53.3%)", "hsl(215.4, 16.3%, 46.9%)"];

const BalanceChart = ({ available, locked }: BalanceChartProps) => {
  const data = [
    { name: "Available", value: available },
    { name: "Locked", value: locked },
  ];

  if (available === 0 && locked === 0) {
    return (
      <div className="flex size-full max-w-[120px] items-center justify-center">
        <div className="size-24 rounded-full border-8 border-muted flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex size-full max-w-[120px] items-center">
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `₹${(value / 100).toLocaleString()}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export { BalanceChart };
