import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full font-inter">
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        {children}
      </div>
      <div className="sticky top-0 hidden h-screen w-full max-w-[600px] items-center justify-center bg-primary lg:flex">
        <div className="flex flex-col items-center gap-5 text-center px-10">
          <div className="size-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold text-4xl font-ibm-plex-serif">
            P
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground font-ibm-plex-serif">
            Paytm
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-sm">
            Your trusted digital wallet for seamless money transfers, bill payments, and more.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
