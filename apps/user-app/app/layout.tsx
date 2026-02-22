import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../components/providers/Providers";
import { AppbarClient } from "../components/AppbarClient";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {children}
            <Toaster richColors position="top-center" />
          </div>
        </body>
      </Providers>
    </html>
  );
}
