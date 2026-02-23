import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Failure: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface IStatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: IStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={STATUS_STYLES[status] || ""}>
      {status}
    </Badge>
  );
};

export { StatusBadge };
