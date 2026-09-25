"use client";

import { motion } from "framer-motion";
import {
  AI_LIMITS,
  SECURITY_PRACTICES,
  SENSITIVE_SURFACES,
} from "@/lib/content/security";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";
import { Reveal, Words, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Bullets,
  Callout,
  ContentHeading,
  DefRows,
  Section,
} from "@/components/content";

export default function ResponsibleAutomationView() {
  return (
    <div className="w-full overflow-x-clip">
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
            <Breadcrumbs
              trail={[
                { name: "Company", path: "/about" },
                { name: "Responsible Automation", path: "/responsible-automation" },
              ]}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Responsible Automation</Eyebrow>
            </motion.div>
            <h1 className="mt-6 max-w-[24ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words
                text="What our automation is allowed to do, and what it is not."
                delay={0.15}
              />
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[60ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              An agent with write access to your CRM, your calendar and your
              customer records is a security surface. If you are evaluating us,
              you should ask how that is controlled — so here it is in full.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <Button href="/contact" variant="onDark" size="lg">
                Ask us about a specific workflow
                <Arrow />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* WHAT WE DON'T CLAIM */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Our position"
            title="We do not claim AI should run unattended."
          />
          <div className="lg:pt-3">
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-body">
              A lot of automation marketing implies that the goal is removing
              people from the process entirely. We think that is the wrong
              target, and in most business workflows it is also the wrong
              engineering decision. Automation should absorb the repetitive
              coordination. Judgement, exceptions and anything hard to reverse
              should stay with your team, by design rather than by accident.
            </p>
            <div className="mt-8">
              <Callout title="No certifications claimed">
                We hold no security certifications and do not present ourselves
                as an accredited provider. What follows is a description of the
                practices we apply. If your procurement requires formal
                certification, tell us early so we can be straight about whether
                we meet the bar.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* HARD LIMITS */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContentHeading
            eyebrow="Hard limits"
            title="Lines we do not cross."
            lede="These apply regardless of configuration. They are not settings."
          />
          <div className="lg:pt-2">
            <Bullets items={AI_LIMITS} />
          </div>
        </div>
      </Section>

      {/* PRACTICES */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Engineering practices"
          title="How access and permissions are handled."
          lede="Ten practices applied across every build. None of them are optional extras."
        />
        <div className="mt-14 lg:mt-16">
          <DefRows items={SECURITY_PRACTICES.map((p) => ({ ...p }))} />
        </div>
      </Section>

      {/* SENSITIVE SURFACES */}
      <Section surface="ink">
        <ContentHeading
          invert
          align="split"
          eyebrow="Sensitive surfaces"
          title="Where the risk actually sits."
          lede="Five places an agent touches something consequential, the failure mode for each, and the control we apply."
        />

        <Reveal
          as="ul"
          step={0.06}
          className="mt-14 divide-y divide-white/[0.07] border-y border-white/[0.07] lg:mt-18"
        >
          {SENSITIVE_SURFACES.map((s, i) => (
            <motion.li key={s.surface} variants={fadeUp} className="py-8">
              <div className="grid gap-5 lg:grid-cols-[52px_0.7fr_1fr_1.2fr] lg:gap-8">
                <Index dark>{String(i + 1).padStart(2, "0")}</Index>

                <h3 className="text-lg font-medium tracking-[-0.02em] text-white">
                  {s.surface}
                </h3>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-dark-muted">
                    Risk
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-on-dark">
                    {s.risk}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-dark">
                    Control
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-on-dark">
                    {s.control}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </Reveal>
      </Section>

      {/* ASK US */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading
            eyebrow="During discovery"
            title="Questions worth asking us."
            lede="If we cannot answer these clearly for your specific workflow, that is a reason to be cautious — of us or of anyone else."
          />
          <div className="lg:pt-2">
            <Bullets
              items={[
                "What exactly can this agent do without a human approving it?",
                "Which credentials does it hold, and what is each one scoped to?",
                "What happens when an integration is down mid-workflow?",
                "How would we notice if it started behaving incorrectly?",
                "What data does it store, where, and for how long?",
                "How do we revoke its access quickly if we need to?",
                "Which actions are irreversible, and what gates them?",
              ]}
            />
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Bring us a workflow and we will map the risk with it."
        lede="Scoping a build includes deciding what the automation may do on its own. That conversation happens in discovery, before anything is built."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "How we work", href: "/how-we-work" }}
        image="/images/why/architecture.webp"
      />
    </div>
  );
}
