import { Suspense } from "react";
import { PageClient } from "./_components/PageClient";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  return (
    <Suspense fallback={<Skeleton className="w-full max-w-[420px] h-[500px] rounded-lg" />}>
      <PageClient />
    </Suspense>
  );
};

export default Page;
