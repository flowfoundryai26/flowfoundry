"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

import { PROJECTS } from "@/lib/site";
import { Arrow, Button, Eyebrow, TONES } from "@/components/ui";

/* =========================================================
   MOTION TOKENS
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* =========================================================
   DATA
========================================================= */

const APPROACH = [
  {
    title: "Client products and our own",
    body: "Some of these platforms are built for clients; others are systems we run FlowFoundry on. Both get the same engineering standard.",
  },
  {
    title: "One connected system",
    body: "Each project combines conversations, business logic, data, and actions rather than bolting on isolated tools.",
  },
  {
    title: "Built to keep evolving",
    body: "Everything here is in active development. Scope grows with the business, so the architecture is designed to absorb change.",
  },
];

/* =========================================================
   PRIMITIVES
========================================================= */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectStatus({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-2xs font-medium text-[#047857]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PortfolioPage() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative overflow-hidden bg-[#0A1330]"
      >
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-[#4F6BFF]/25 blur-[130px]" />
          <div className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-[120px]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl py-20 text-center lg:py-28">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="dark">Portfolio</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
            >
              What we&apos;re building{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                right now.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-on-dark-muted sm:text-lg"
            >
              A look at the platforms currently in development at FlowFoundry
              — eCommerce, AI revenue automation, education, and the internal
              systems we run our own business on.
            </motion.p>

            {/* Project index — jumps to each project below */}
            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-on-dark-quiet"
            >
              {PROJECTS.map((project, index) => (
                <li key={project.slug} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-white/20"
                    />
                  )}
                  <a
                    href={`#${project.slug}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button href="/contact" variant="onDark">
                Start a Project <Arrow />
              </Button>

              <Button href="/services" variant="outlineOnDark">
                Explore Our Services
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}
      <section className="bg-white py-24 sm:py-28 lg:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <Eyebrow tone="violet">Ongoing projects</Eyebrow>
            <h2 className="mt-5 text-4xl font-light leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl">
              Four platforms,{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                one way of building.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate sm:text-lg">
              Different industries, the same approach: understand the process,
              design the system around it, then build and integrate it end to
              end.
            </p>
          </motion.div>

          <ol className="mt-14 space-y-6 sm:mt-16">
            {PROJECTS.map((project, index) => {
              const t = TONES[project.tone];
              return (
                <motion.li
                  key={project.slug}
                  id={project.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  className={`group relative scroll-mt-28 overflow-hidden rounded-xl border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] sm:p-8 lg:p-10 ${t.border}`}
                >
                  {/* Watermark number */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-2 -top-6 bg-gradient-to-br ${t.gradient} bg-clip-text text-[88px] font-bold leading-none tracking-tighter text-transparent opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09]`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    {/* Left: identity + summary */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-2xs font-semibold uppercase tracking-[0.14em] ${t.text}`}
                        >
                          {project.category}
                        </span>
                        <ProjectStatus>{project.status}</ProjectStatus>
                      </div>

                      <h3 className="mt-4 flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        <span
                          className={`shrink-0 text-sm font-semibold tabular-nums ${t.text}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {project.name}
                      </h3>

                      <p className="mt-4 text-base leading-7 text-slate">
                        {project.summary}
                      </p>

                      <p className="mt-5 text-xs text-muted">
                        <span className="font-semibold text-slate">
                          Services:
                        </span>{" "}
                        {project.services.join(" · ")}
                      </p>

                      {project.href && (
                        <Link
                          href={project.href}
                          className={`group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${t.text}`}
                        >
                          Explore {project.name}
                          <Arrow className="h-4 w-4 group-hover/link:translate-x-0.5" />
                        </Link>
                      )}
                    </div>

                    {/* Right: what's being built */}
                    <div className="min-w-0 lg:border-l lg:border-slate-200/70 lg:pl-14">
                      <h4 className="text-2xs font-semibold uppercase tracking-[0.14em] text-muted">
                        What we&apos;re building
                      </h4>
                      <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {project.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6 text-slate"
                          >
                            <span
                              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${t.bg} ${t.text}`}
                            >
                              <CheckIcon />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`relative mt-8 h-px w-12 bg-gradient-to-r ${t.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* =====================================================
          APPROACH
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="cyan">How we build</Eyebrow>
              <h2 className="mt-5 text-4xl font-light leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl">
                The same standard for every project.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate sm:text-lg">
                Whether it&apos;s a client platform or a system for our own
                operations, each project follows the same discover, design,
                build, and improve cycle.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {APPROACH.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-lg border border-slate-200/70 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(15,27,61,0.2)]"
                >
                  <h3 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-ink">
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-[#4F6BFF]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    {item.body}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-white px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#0A1330] px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4F6BFF]/30 blur-[120px]" />
              <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#8B5CF6]/30 blur-[130px]" />
              <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[#06B6D4]/20 blur-[110px]" />
            </div>

            <div className="relative z-10">
              <Eyebrow tone="dark">Your project</Eyebrow>

              <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl">
                Want to see your platform{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  on this page?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-dark-muted sm:text-lg">
                Tell us how your business works today. We&apos;ll help you
                scope the AI, automation, integrations, or custom software
                that would move it forward.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="onDark">
                  Book a Free Consultation <Arrow />
                </Button>

                <Button href="/solutions" variant="outlineOnDark">
                  Explore Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
