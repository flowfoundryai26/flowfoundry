"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS, WEBSITE_DEMOS } from "@/lib/site";
import WebsiteDemoCard from "@/components/WebsiteDemoCard";
import { Container, Index, SectionHeading, Status } from "@/components/ui";
import { Reveal, Spotlight, fadeUp } from "@/components/motion";
import { CTA, PageHero, RowList, StatStrip } from "@/components/sections";

const APPROACH = [
  { index: "01", title: "Client products and our own", body: "Some of these platforms are built for clients; others are systems we run FlowFoundry on. Both get the same engineering standard." },
  { index: "02", title: "One connected system", body: "Each project combines conversations, business logic, data, and actions rather than bolting on isolated tools." },
  { index: "03", title: "Built to keep evolving", body: "The platforms above are in active development. Their architecture is designed to accommodate changing requirements." },
];

export default function PortfolioPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="Portfolio"
        title="Platforms in progress. Websites you can explore."
        lede="Explore the software and AI platforms we're building, alongside working website concepts created for different industries."
        primaryCta={{ label: "Book consultation", href: "/contact" }}
        secondaryCta={{ label: "Our services", href: "/services" }}
        strip={
          <StatStrip
            className="lg:grid-cols-1 lg:gap-y-8"
            items={[
              { value: PROJECTS.length, label: "Platforms in build" },
              { value: "1", label: "Client platforms" },
              { value: "3", label: "Built for ourselves" },
            ]}
          />
        }
      />

      {/* PROJECTS */}
      <section className="w-full bg-surface py-20 lg:py-24">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="Ongoing projects"
                title="Four platforms, one way of building"
                lede="Different industries, the same approach: understand the process, design the system around it, then build and integrate it end to end."
              />
            </motion.div>
          </Reveal>

          <div className="mt-14 space-y-6 lg:mt-20">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} amount={0.2} id={p.slug} className="scroll-mt-24">
                <motion.article variants={fadeUp}>
                  <Spotlight className="rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong">
                    <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[120px_1.2fr_1fr] lg:gap-12 lg:p-12">
                      <div className="flex items-start justify-between lg:flex-col lg:justify-start lg:gap-5">
                        <Index className="text-base">0{i + 1}</Index>
                        <Status>{p.status}</Status>
                      </div>

                      <div>
                        <p className="font-mono text-2xs text-muted">{p.category}</p>
                        <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.03em] text-fg">
                          {p.name}
                        </h3>
                        <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-body">{p.summary}</p>
                        <p className="mt-6 font-mono text-2xs text-muted">
                          {p.services.join(", ")}
                        </p>
                        {p.href ? (
                          <Link
                            href={p.href}
                            className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg"
                          >
                            Explore {p.name}
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            />
                          </Link>
                        ) : null}
                      </div>

                      <div className="lg:border-l lg:border-line lg:pl-12">
                        <p className="font-mono text-2xs text-muted">What we&apos;re building</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.highlights.map((h) => (
                            <li
                              key={h}
                              className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-body"
                            >
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

      {/* WEBSITE CONCEPTS — separate from platforms in development. */}
      <section id="website-demos" className="scroll-mt-20 w-full bg-surface-2 py-20 lg:py-24">
        <Container>
          <SectionHeading
            align="split"
            eyebrow="Concept demos"
            title="Website Design Showcase"
            lede="Explore website concepts we've designed to demonstrate modern digital experiences for businesses across different industries."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {WEBSITE_DEMOS.map((demo) => <WebsiteDemoCard key={demo.slug} demo={demo} />)}
          </div>
        </Container>
      </section>

      {/* APPROACH */}
      <section className="w-full bg-surface py-20 lg:py-24">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="How we build"
                title="The same standard for every project"
                lede="Our platform work starts with the business process, while each website concept starts with the people who will use it."
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
        title="Have a project in mind?"
        lede="Tell us about the website, AI workflow, integration or software you want to build. We'll help you define the right next step."
        primary={{ label: "Book consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </div>
  );
}
