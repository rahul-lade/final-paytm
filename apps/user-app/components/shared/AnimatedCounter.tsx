"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  amount: number;
}

const AnimatedCounter = ({ amount }: AnimatedCounterProps) => {
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = amount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayAmount(amount);
        clearInterval(timer);
      } else {
        setDisplayAmount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [amount]);

  return (
    <span className="text-2xl lg:text-3xl flex-1 font-semibold text-foreground tabular-nums">
      ₹{(displayAmount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
    </span>
  );
};

export { AnimatedCounter };
