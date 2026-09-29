import { Container } from "@/components/ui";
import {
  CardGridSkeleton,
  HeadingSkeleton,
  HeroSkeleton,
  LoadingStatus,
} from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="w-full overflow-x-clip">
      <LoadingStatus />
      <HeroSkeleton />
      <section className="w-full bg-white py-20 lg:py-28" aria-hidden="true">
        <Container>
          <HeadingSkeleton />
          {/* text tiles — these grids carry no imagery */}
          <CardGridSkeleton
            count={6}
            columns={3}
            media={false}
            className="mt-14 lg:mt-18"
          />
        </Container>
      </section>
    </div>
  );
}
