import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";

/**
 * Custom 404. Next.js returns a correct 404 status for this route.
 *
 * A 404 that only says "not found" wastes the visit. These are the routes a
 * mistyped or stale URL most plausibly wanted, so the page recovers the session
 * instead of ending it.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const ROUTES = [
  {
    index: "01",
    label: "Solutions",
    href: "/solutions",
    body: "AI voice agents, WhatsApp, workflow, CRM, portals and Shopify automation.",
  },
  {
    index: "02",
    label: "Industries",
    href: "/industries",
    body: "How this works for clinics, real estate, eCommerce and service businesses.",
  },
  {
    index: "03",
    label: "Case studies",
    href: "/case-studies",
    body: "The platforms we are building and the architecture behind them.",
  },
  {
    index: "04",
    label: "Insights",
    href: "/insights",
    body: "Practical write-ups on automation workflows we have actually built.",
  },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100dvh-72px)] w-full items-center overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 90% at 25% 45%, #000 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 90% at 25% 45%, #000 0%, transparent 100%)",
        }}
      />

      <Container className="relative z-10 py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow dark>Error 404</Eyebrow>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              That page isn&apos;t here.
            </h1>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-on-dark sm:text-lg">
              The link may be out of date, or the address may have a typo. The
              site itself is fine — here is the way back in.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/" variant="onDark" size="lg">
                Back to home
                <Arrow />
              </Button>
              <Button href="/contact" variant="outlineOnDark" size="lg">
                Book a consultation
              </Button>
            </div>
          </div>

          <nav aria-label="Popular pages" className="lg:pt-4">
            <p className="font-mono text-2xs uppercase tracking-[0.18em] text-on-dark-muted">
              Most visited
            </p>
            <ul className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {ROUTES.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-baseline gap-5 py-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5"
                  >
                    <Index dark>{r.index}</Index>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-medium tracking-[-0.02em] text-white">
                        {r.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-on-dark">
                        {r.body}
                      </span>
                    </span>
                    <ArrowUpRight
                      weight="bold"
                      className="h-4 w-4 shrink-0 text-on-dark-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
