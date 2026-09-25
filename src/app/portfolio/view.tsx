"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS } from "@/lib/site";
import { Container, Index, SectionHeading, Status } from "@/components/ui";
import { Reveal, Spotlight, fadeUp } from "@/components/motion";
import { CTA, PageHero, RowList, StatStrip } from "@/components/sections";

const APPROACH = [
  { index: "01", title: "Client products and our own", body: "Some of these platforms are built for clients; others are systems we run FlowFoundry on. Both get the same engineering standard." },
  { index: "02", title: "One connected system", body: "Each project combines conversations, business logic, data, and actions rather than bolting on isolated tools." },
  { index: "03", title: "Built to keep evolving", body: "Everything here is in active development. Scope grows with the business, so the architecture is designed to absorb change." },
];

export default function PortfolioPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="Portfolio"
        title="What we're building right now."
        lede="The platforms currently in development at FlowFoundry — eCommerce, AI revenue automation, education, and the internal systems we run our own business on."
        primaryCta={{ label: "Start a project", href: "/contact" }}
        secondaryCta={{ label: "Our services", href: "/services" }}
        image="/images/use-cases/custom.webp"
        strip={
          <StatStrip
            className="lg:grid-cols-1 lg:gap-y-8"
            items={[
              { value: PROJECTS.length, label: "Platforms in build" },
              { value: "2", label: "Client platforms" },
              { value: "2", label: "Built for ourselves" },
            ]}
          />
        }
      />

      {/* PROJECTS */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="Ongoing projects"
                title="Four platforms, one way of building."
                lede="Different industries, the same approach: understand the process, design the system around it, then build and integrate it end to end."
              />
            </motion.div>
          </Reveal>

          <div className="mt-14 space-y-6 lg:mt-20">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} amount={0.2} id={p.slug} className="scroll-mt-24">
                <motion.article variants={fadeUp}>
                  <Spotlight className="rounded-[24px] border border-line bg-white transition-colors duration-500 hover:border-line-strong">
                    <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[120px_1.2fr_1fr] lg:gap-12 lg:p-12">
                      <div className="flex items-start justify-between lg:flex-col lg:gap-6">
                        <Index className="text-base">0{i + 1}</Index>
                        <Status>{p.status}</Status>
                      </div>

                      <div>
                        <p className="font-mono text-2xs uppercase tracking-[0.16em] text-accent-strong">{p.category}</p>
                        <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.03em] text-fg">
                          {p.name}
                        </h3>
                        <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-body">{p.summary}</p>
                        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                          {p.services.join("  ·  ")}
                        </p>
                        {p.href ? (
                          <Link
                            href={p.href}
                            className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg"
                          >
                            Explore {p.name}
                            <ArrowUpRight
                              weight="bold"
                              className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            />
                          </Link>
                        ) : null}
                      </div>

                      <div className="lg:border-l lg:border-line lg:pl-12">
                        <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">What we&apos;re building</p>
                        <ul className="mt-4 divide-y divide-line">
                          {p.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-3 py-2.5 text-[15px] text-fg">
                              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Spotlight>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* APPROACH */}
      <section className="w-full bg-paper py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="How we build"
                title="The same standard for every project."
                lede="Whether it's a client platform or a system for our own operations, the approach doesn't change."
              />
            </motion.div>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <RowList items={APPROACH} />
          </div>
        </Container>
      </section>

      <CTA
        eyebrow="Your project"
        title="Want to see your platform on this page?"
        lede="Tell us how your business works today. We'll help you scope the AI, automation, integrations, or custom software that would move it forward."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
        image="/images/mission.webp"
      />
    </div>
  );
}
