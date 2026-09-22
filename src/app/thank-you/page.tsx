import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Arrow, Button, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thanks for reaching out",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-72px)] w-full items-center overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 75% 90% at 25% 45%, #000 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 90% at 25% 45%, #000 0%, transparent 100%)",
        }}
      />
      <Container className="relative z-10 py-24">
        <div className="max-w-2xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-live/15 text-[#5fd39e]">
            <Check weight="bold" className="h-5 w-5" />
          </span>
          <div className="mt-8">
            <Eyebrow dark>Enquiry received</Eyebrow>
          </div>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.035em] text-white text-balance">
            Thanks for reaching out.
          </h1>
          <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-on-dark sm:text-lg">
            We&apos;ve received your enquiry. We&apos;ll review what you shared
            and get back within one business day to discuss the next step.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="onDark" size="lg">
              Back to home
              <Arrow />
            </Button>
            <Button href="/services" variant="outlineOnDark" size="lg">
              Explore services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
