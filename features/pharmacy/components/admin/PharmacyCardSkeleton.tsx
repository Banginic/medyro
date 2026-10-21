// components/pharmacy-card-skeleton.tsx
// Uses the shadcn Skeleton: npx shadcn@latest add skeleton

import { Skeleton } from "@/components/ui/skeleton";

export default function PharmacyCardSkeleton() {
  return (
    <article
      aria-hidden
      className="flex items-start gap-4 rounded-xl border border-emerald-950/10 bg-foreground/30 p-2 lg:p-4"
    >
      {/* Logo */}
      <Skeleton className="size-14 shrink-0 rounded-lg" />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          {/* Name */}
          <Skeleton className="mt-0.5 h-5 w-3/5" />
          {/* Status badge */}
          <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
        </div>

        {/* Address */}
        <div className="mt-2 flex items-center gap-1.5">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Distance */}
        <div className="mt-2 flex items-center gap-1.5">
          <Skeleton className="size-3 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </article>
  );
}

export function PharmacyCardSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement des pharmacies…</span>
      <ul className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            <PharmacyCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Usage

// 1) Route-level: app/pharmacies/loading.tsx
export default function Loading() {
  return <PharmacyCardSkeletonList />;
}

// 2) Streaming a section with Suspense
<Suspense fallback={<PharmacyCardSkeletonList count={5} />}>
  <NearbyPharmacies city="Douala" />
</Suspense>
*/