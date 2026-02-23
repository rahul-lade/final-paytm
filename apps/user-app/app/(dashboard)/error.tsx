"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 w-full">
      <AlertCircle className="size-10 text-destructive" />
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-xl font-semibold text-foreground">Something went wrong!</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
      </div>
      <Button
        onClick={() => reset()}
        variant="outline"
        className="mt-4"
      >
        Try again
      </Button>
    </div>
  );
};

export default Error;
