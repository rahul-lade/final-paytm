import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="font-ibm-plex-serif text-5xl font-bold">404</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <Button asChild className="mt-4 gap-2 px-6">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
