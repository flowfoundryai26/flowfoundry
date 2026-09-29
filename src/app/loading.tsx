import { PageSkeleton } from "@/components/skeleton";

/**
 * Generic route fallback. Next cascades this to every segment that does
 * not ship its own loading.tsx, so the shape stays intentionally neutral:
 * dark hero, one white section, a three-up grid.
 */
export default function Loading() {
  return <PageSkeleton />;
}
