
import { Skeleton } from "@/components/ui/skeleton";

export default function PharmacyHeroSkeleton() {
  return (
    <section
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <span className="sr-only">Loading pharmacy…</span>

      {/* Text side */}
      <div>
        {/* Date */}
        <Skeleton className="h-4 w-44" />

        {/* Name (two lines on desktop, like the real heading) */}
        <div className="mt-3 space-y-3">
          <Skeleton className="h-10 w-4/5 md:h-12" />
          <Skeleton className="h-10 w-1/2 md:h-12" />
        </div>

        {/* Pharmacist + address */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      {/* Cover photo side */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
        <Skeleton className="absolute inset-0 rounded-none" />
        <Skeleton className="absolute bottom-4 left-4 h-8 w-24 rounded-full bg-card/60" />
      </div>
    </section>
  );
}

