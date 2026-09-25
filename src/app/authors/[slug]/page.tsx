import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  founderSchema,
  graph,
  webPageSchema,
} from "@/lib/schema";
import { FOUNDER, PROFILES } from "@/lib/site";
import { ARTICLES } from "@/lib/content/insights";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";
import { Breadcrumbs } from "@/components/content";

/**
 * Author page. Server component — it is static content and needs no client JS.
 *
 * Only the founder exists as an author today, so this route resolves exactly one
 * slug. It is a dynamic segment because adding authors should not need a new file.
 */
export function generateStaticParams() {
  return [{ slug: FOUNDER.slug }];
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug !== FOUNDER.slug) return {};

  return pageMeta({
    title: `${FOUNDER.name} | ${FOUNDER.shortRole}, FlowFoundry`,
    description:
      "Sri Harsha M is the founder of FlowFoundry AI Solutions, working on AI agents, workflow automation, business software and system integration.",
    path: `/authors/${FOUNDER.slug}`,
  });
}

/** Verified links only. An empty PROFILES entry renders nothing. */
const links = [
  { label: "LinkedIn", href: PROFILES.founderLinkedIn },
  { label: "GitHub", href: PROFILES.founderGitHub },
].filter((l) => l.href.length > 0);

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug !== FOUNDER.slug) notFound();

  const path = `/authors/${FOUNDER.slug}`;
  const trail = [{ name: "Authors", path: "/insights" }, { name: FOUNDER.name, path }];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: FOUNDER.name,
            description: FOUNDER.bio,
            breadcrumb: trail,
          }),
          breadcrumbSchema(path, trail),
          // Person node, referenced by every article's author field
          founderSchema(),
          {
            "@type": "ProfilePage",
            "@id": `https://www.flowfoundryai.in${path}#profilepage`,
            url: `https://www.flowfoundryai.in${path}`,
            mainEntity: {
              "@id": `https://www.flowfoundryai.in/authors/${FOUNDER.slug}#person`,
            },
          }
        )}
      />

      <div className="w-full overflow-x-clip">
        {/* HERO */}
        <section className="relative w-full overflow-hidden bg-ink">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage:
                  "radial-gradient(ellipse 70% 90% at 22% 40%, #000 0%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 90% at 22% 40%, #000 0%, transparent 100%)",
              }}
            />
          </div>

          <Container className="relative z-10">
            <div className="pt-8">
              <Breadcrumbs trail={trail} />
            </div>

            <div className="grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:py-20">
              <div>
                <Eyebrow dark>Author</Eyebrow>
                <h1 className="mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
                  {FOUNDER.name}
                </h1>
                <p className="mt-4 font-mono text-2xs uppercase tracking-[0.18em] text-accent-dark">
                  {FOUNDER.role}
                </p>
                <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg">
                  {FOUNDER.bio}
                </p>

                {links.length > 0 ? (
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-medium text-on-dark transition-colors hover:border-white/30 hover:text-white"
                        >
                          {l.label}
                          <ArrowUpRight
                            weight="bold"
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="lg:justify-self-end">
                <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={FOUNDER.avatar}
                    alt={`Portrait of ${FOUNDER.name}, ${FOUNDER.shortRole} at FlowFoundry AI Solutions`}
                    fill
                    priority
                    sizes="(max-width: 1023px) 80vw, 320px"
                    className="object-cover saturate-[0.9]"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* EXPERTISE */}
        <section className="w-full bg-white py-20 lg:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">
                  Areas of expertise
                </p>
                <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg">
                  What Sri Harsha works on.
                </h2>
              </div>

              <div>
                <ul className="divide-y divide-line border-y border-line">
                  {FOUNDER.expertise.map((e, i) => (
                    <li key={e} className="flex items-baseline gap-5 py-4">
                      <Index>{String(i + 1).padStart(2, "0")}</Index>
                      <span className="text-[15px] leading-relaxed text-body">
                        {e}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">
                    Platforms worked on
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {FOUNDER.work.map((w) => (
                      <li key={w.href}>
                        <Link
                          href={w.href}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-body transition-colors hover:border-accent/40 hover:text-accent-strong"
                        >
                          {w.label}
                          <ArrowUpRight
                            weight="bold"
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ARTICLES */}
        <section className="w-full bg-paper py-20 lg:py-28">
          <Container>
            <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">
              Articles
            </p>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg">
              Written by {FOUNDER.name.split(" ")[0]}.
            </h2>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              {ARTICLES.map((a, i) => (
                <li key={a.slug}>
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group grid gap-3 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 lg:grid-cols-[64px_1fr_160px] lg:items-baseline lg:gap-8"
                  >
                    <Index>{String(i + 1).padStart(2, "0")}</Index>
                    <div className="min-w-0">
                      <h3 className="text-xl font-medium tracking-[-0.02em] text-fg">
                        {a.title}
                      </h3>
                      <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-body">
                        {a.lede}
                      </p>
                    </div>
                    <p className="font-mono text-2xs uppercase tracking-[0.12em] text-muted lg:text-right">
                      <time dateTime={a.published}>
                        {new Date(a.published).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      {a.readingMinutes} min
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Button href="/contact" variant="primary">
                Book a consultation with Sri Harsha
                <Arrow />
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
