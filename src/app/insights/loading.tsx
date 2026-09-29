import { Container } from "@/components/ui";
import {
  CardGridSkeleton,
  HeadingSkeleton,
  HeroSkeleton,
  LoadingStatus,
} from "@/components/skeleton";

/** Three published articles, stacked wide — mirrors InsightsView. */
export default function Loading() {
  return (
    <div className="w-full overflow-x-clip">
      <LoadingStatus label="Loading insights" />
      <HeroSkeleton />
      <section className="w-full bg-surface py-20 lg:py-28" aria-hidden="true">
        <Container>
          <HeadingSkeleton />
          <CardGridSkeleton
            count={3}
            columns={1}
            className="mt-14 lg:mt-18"
          />
        </Container>
      </section>
    </div>
  );
}
