import React from "react";
import Link from "next/link";
import { Shield, Zap, Smartphone } from "lucide-react";

const FEATURES = [
  { icon: Zap, text: "Instant P2P transfers" },
  { icon: Shield, text: "Bank-grade security" },
  { icon: Smartphone, text: "Works on any device" },
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full font-inter">
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        {children}
      </div>
      <div className="sticky top-0 hidden h-screen w-full max-w-md items-center justify-center bg-primary lg:flex">
        <div className="flex flex-col items-center gap-8 text-center px-10">
          <div className="flex flex-col items-center gap-3">
            <div className="size-14 rounded-full bg-primary-foreground/15 flex items-center justify-center text-primary-foreground font-bold text-2xl font-ibm-plex-serif">
              P
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground font-ibm-plex-serif">
              Paytm
            </h1>
          </div>

          <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
            Your trusted digital wallet for seamless money transfers and payments.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.text} className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 px-4 py-2.5">
                  <Icon className="size-4 text-primary-foreground/80 shrink-0" />
                  <span className="text-sm text-primary-foreground/90">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
