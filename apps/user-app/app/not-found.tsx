import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="font-ibm-plex-serif text-3xl font-bold">404</span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Button asChild size="sm" className="gap-1">
          <Link href="/dashboard">
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
