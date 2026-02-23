import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
}: IEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="size-12 rounded-full bg-muted flex items-center justify-center">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground max-w-xs">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Button variant="outline" size="sm" asChild className="mt-1">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
};

export { EmptyState };
