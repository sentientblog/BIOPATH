import { Skeleton } from "@/components/ui/skeleton";

/** Page-shaped loading placeholder used as the router pending component. */
export function PageSkeleton({
  variant = "default",
}: {
  variant?: "default" | "table" | "profile";
}) {
  return (
    <div
      className="flex flex-col gap-8 pt-6"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-9 w-full max-w-xl" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      {variant === "profile" && <Skeleton className="h-56 w-full rounded-xl" />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      {variant === "table" ? (
        <div className="space-y-2 rounded-xl border border-hairline bg-card p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <Skeleton className="h-80 rounded-xl lg:col-span-7" />
          <Skeleton className="h-80 rounded-xl lg:col-span-5" />
        </div>
      )}
    </div>
  );
}
