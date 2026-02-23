import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Shield,
  Zap,
  Smartphone,
  Send,
  CreditCard,
  BarChart3,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send money to anyone in seconds with our lightning-fast P2P transfer system.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your transactions are protected with enterprise-level encryption and validation.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Fully responsive design that works beautifully on any device, anywhere.",
  },
  {
    icon: Send,
    title: "P2P Payments",
    description: "Transfer money to friends and family using just their phone number.",
  },
  {
    icon: CreditCard,
    title: "Multi-Bank Support",
    description: "Connect and add money from HDFC, Axis, SBI, ICICI and more banks.",
  },
  {
    icon: BarChart3,
    title: "Transaction Insights",
    description: "Track all your spending with detailed transaction history and charts.",
  },
];

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            P
          </div>
          <span className="text-xl font-bold font-ibm-plex-serif text-foreground">Paytm</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 lg:py-32 text-center">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-x-20 -inset-y-10 bg-primary/5 rounded-full blur-3xl" />
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-ibm-plex-serif">
            The Smarter Way to{" "}
            <span className="text-primary">Manage Money</span>
          </h1>
          <p className="relative mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Send, receive, and track your money with ease. Paytm gives you a
            complete digital wallet experience — fast, secure, and beautiful.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create Free Account
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:bg-accent transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-foreground">10K+</p>
            <p className="text-sm text-muted-foreground mt-1">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">₹50Cr+</p>
            <p className="text-sm text-muted-foreground mt-1">Transactions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">4.9★</p>
            <p className="text-sm text-muted-foreground mt-1">User Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">99.9%</p>
            <p className="text-sm text-muted-foreground mt-1">Uptime</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-ibm-plex-serif">
              Everything You Need
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              A complete digital wallet packed with powerful features to simplify your financial life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group flex flex-col gap-3 rounded-xl border border-border p-6 hover:border-primary/40 transition-all"
                >
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-primary rounded-2xl p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground font-ibm-plex-serif">
              Start Your Financial Journey
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/80 max-w-lg mx-auto">
              Join thousands of users who trust Paytm for their daily transactions.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 mt-8 rounded-lg bg-background px-8 py-3.5 text-base font-semibold text-foreground hover:bg-background/90 transition-colors"
            >
              Get Started for Free
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            P
          </div>
          <span className="text-lg font-bold font-ibm-plex-serif text-foreground">Paytm</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 Paytm Clone. Built as a portfolio project.
        </p>
      </footer>
    </div>
  );
};

export default Page;
