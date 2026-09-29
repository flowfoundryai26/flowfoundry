import type { ReactNode } from "react";
import { Container } from "@/components/ui";

/* ============================================================
   SKELETONS

   Placeholder geometry for route-level loading.tsx files. Built on
   the .shimmer class in globals.css, which already sweeps a light
   gradient across whatever it wraps.

   Every skeleton is aria-hidden: a screen reader gets the polite
   "Loading" status from <LoadingStatus/> instead of a tree of empty
   boxes. Shapes deliberately mirror the real components' metrics so
   the swap-in does not shift layout.
============================================================ */

type Surface = "light" | "dark";

/** Base block. `dark` picks a fill that reads on the ink surface. */
export function Skeleton({
  className = "",
  surface = "light",
}: {
  className?: string;
  surface?: Surface;
}) {
  return (
    <div
      className={`shimmer rounded-md ${
        surface === "dark" ? "bg-white/[0.07]" : "bg-line"
      } ${className}`}
    />
  );
}

/**
 * Stack of text lines. The last line is short so the block reads as a
 * paragraph rather than a rectangle.
 */
export function SkeletonText({
  lines = 3,
  className = "",
  surface = "light",
}: {
  lines?: number;
  className?: string;
  surface?: Surface;
}) {
  const widths = ["w-full", "w-[94%]", "w-[88%]", "w-[96%]", "w-[72%]"];
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          surface={surface}
          className={`h-3.5 ${
            i === lines - 1 ? "w-[58%]" : widths[i % widths.length]
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Announce loading once, politely. Paired with aria-hidden skeletons so
 * assistive tech hears a single message, not a wall of placeholders.
 */
export function LoadingStatus({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {label}
    </span>
  );
}

/* ============================================================
   HERO - matches the dark hero every page opens with
============================================================ */

export function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-ink" aria-hidden="true">
      <Container className="relative z-10">
        {/* breadcrumb rail */}
        <div className="pt-8">
          <Skeleton surface="dark" className="h-3 w-52" />
        </div>

        <div className="py-14 lg:py-20">
          <Skeleton surface="dark" className="h-3 w-24" />

          {/* headline — three descending bars at clamp() heights */}
          <div className="mt-6 space-y-3.5">
            <Skeleton surface="dark" className="h-[clamp(2.1rem,4.4vw,3.7rem)] w-[min(92%,20ch)]" />
            <Skeleton surface="dark" className="h-[clamp(2.1rem,4.4vw,3.7rem)] w-[min(78%,16ch)]" />
          </div>

          <div className="mt-7 max-w-[58ch]">
            <SkeletonText surface="dark" lines={2} />
          </div>

          <Skeleton surface="dark" className="mt-9 h-13 w-56 rounded-full" />
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

export function HeadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-5 h-8 w-[min(80%,34ch)]" />
      <div className="mt-5 max-w-[54ch]">
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

/* ============================================================
   CARDS
============================================================ */

/** One list row — the wide cards used on Insights and Case Studies. */
export function CardSkeleton({ media = true }: { media?: boolean }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-surface"
      aria-hidden="true"
    >
      {media ? <Skeleton className="h-52 w-full rounded-none sm:h-64" /> : null}
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="mt-5 h-6 w-[min(88%,28ch)]" />
        <div className="mt-4">
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  );
}

/** Grid of cards. Defaults mirror the three-up layouts across the site. */
export function CardGridSkeleton({
  count = 3,
  columns = 3,
  media = true,
  className = "",
}: {
  count?: number;
  columns?: 1 | 2 | 3;
  media?: boolean;
  className?: string;
}) {
  const cols =
    columns === 1
      ? ""
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-4 lg:gap-5 ${cols} ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} media={media} />
      ))}
    </div>
  );
}

/* ============================================================
   PAGE SHELLS - what loading.tsx actually renders
============================================================ */

/** Hero + one white section. The generic fallback. */
export function PageSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div className="w-full overflow-x-clip">
      <LoadingStatus />
      <HeroSkeleton />
      <section className="w-full bg-surface py-20 lg:py-28" aria-hidden="true">
        <Container>
          {children ?? (
            <>
              <HeadingSkeleton />
              <CardGridSkeleton className="mt-14 lg:mt-18" />
            </>
          )}
        </Container>
      </section>
    </div>
  );
}

/** Long-form detail pages: article body with a sticky-rail column. */
export function ArticleSkeleton() {
  return (
    <div className="w-full overflow-x-clip">
      <LoadingStatus label="Loading article" />
      <HeroSkeleton />
      <section className="w-full bg-surface py-20 lg:py-28" aria-hidden="true">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <div className="max-w-[68ch] space-y-10">
              <SkeletonText lines={4} />
              <Skeleton className="h-7 w-[min(70%,26ch)]" />
              <SkeletonText lines={5} />
              <Skeleton className="h-64 w-full rounded-xl" />
              <SkeletonText lines={4} />
              <Skeleton className="h-7 w-[min(60%,22ch)]" />
              <SkeletonText lines={5} />
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[86%]" />
                <Skeleton className="h-3.5 w-[92%]" />
                <Skeleton className="h-3.5 w-[74%]" />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
