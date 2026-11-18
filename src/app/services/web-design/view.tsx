"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { WEBSITE_DEMOS, waLink } from "@/lib/site";
import WebsiteDemoCard from "@/components/WebsiteDemoCard";
import { Arrow, Button, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal, fadeUp } from "@/components/motion";
import { PageHero, Process } from "@/components/sections";

const CONSULTATION = "/contact?interest=website-design";
const WEBSITE_WHATSAPP = waLink(
  "Hi, I'm interested in website design and development services for my business. I'd like to discuss my requirements."
);

const SOLUTIONS = [
  { title: "Business & corporate", detail: "A clear home for your brand, services and enquiries." },
  { title: "Dental & healthcare", detail: "Treatment information and simple paths to book or ask a question." },
  { title: "Salon, spa & beauty", detail: "An inviting showcase for services, atmosphere and appointments." },
  { title: "Restaurant & café", detail: "Menus, opening information and reservation pathways." },
  { title: "Real estate & property", detail: "Property-focused presentation with room for listings and enquiries." },
  { title: "Education & coaching", detail: "Courses, learning opportunities and admissions enquiries." },
  { title: "Startups & landing pages", detail: "Focused pages that explain the offer and guide visitors to act." },
  { title: "eCommerce & online stores", detail: "Storefronts designed around products and customer journeys." },
  { title: "Redesign & modernization", detail: "A more useful experience for an existing business website." },
  { title: "Custom web applications", detail: "Purpose-built features where a standard website is not enough." },
] as const;

const FEATURES = [
  "Custom UI/UX design",
  "Mobile-first responsive development",
  "Clear service and information pages",
  "Contact forms and WhatsApp integration",
  "Appointment booking integrations",
  "Technical SEO foundations",
  "Performance optimization",
  "Analytics integration",
  "CMS integration where required",
  "Domain and deployment assistance",
  "Optional AI chatbots and business automation",
] as const;

const PROCESS = [
  { number: "01", title: "Discover", body: "Understand the business, audience and requirements." },
  { number: "02", title: "Design", body: "Define the structure, content and visual experience." },
  { number: "03", title: "Develop", body: "Build, integrate and test the website." },
  { number: "04", title: "Launch", body: "Deploy the website and provide appropriate handover and support." },
];

const FAQS = [
  { q: "How long does website development take?", a: "Timing depends on the scope, content, integrations and feedback cycle. We'll discuss a practical timeline after understanding your requirements." },
  { q: "Can you redesign an existing website?", a: "Yes. We can review what works today and redesign the structure, content and visual experience around your current goals." },
  { q: "Will the website work on mobile devices?", a: "Yes. We design for smaller screens first and test the experience across mobile, tablet and desktop layouts." },
  { q: "Can you add WhatsApp or appointment booking?", a: "Yes. We can connect WhatsApp and suitable booking tools when they fit your enquiry and scheduling process." },
  { q: "Do you offer website maintenance?", a: "We can discuss ongoing updates, support and maintenance as part of the project handover." },
  { q: "Can I request additional features later?", a: "Yes. We can plan the site so new pages, integrations and custom features can be considered as your needs change." },
] as const;

export default function WebDesignPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="Website Design & Development"
        title="Professional Websites That Make Your Business Stand Out"
        lede="We design and develop modern, responsive websites that communicate your brand, showcase your services, and make it easier for customers to discover and contact your business."
        primaryCta={{ label: "Book a Consultation", href: CONSULTATION }}
        secondaryCta={{ label: "View Website Demos", href: "/portfolio#website-demos" }}
        strip={
          <div className="border-l border-line-strong pl-6 lg:max-w-[290px]">
            <p className="font-mono text-2xs uppercase tracking-[0.12em] text-muted">Built around your business</p>
            <p className="mt-4 text-[15px] leading-relaxed text-on-dark">
              From a focused landing page to a complete business website, the design starts with what your customers need to find.
            </p>
          </div>
        }
      />

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading eyebrow="Your digital home" title="Why Your Business Needs a Professional Website" />
            <div className="space-y-5 text-[16px] leading-relaxed text-body">
              <p>An independent website gives people a dependable place to understand your business, explore your services and find the right way to reach you.</p>
              <p>It helps present your brand consistently and makes essential information available beyond a social profile or marketplace listing. Clear pages and enquiry paths make the next step easier for prospective customers.</p>
              <Button href={CONSULTATION} variant="secondary" className="mt-3">Discuss your website <Arrow /></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 lg:py-24">
        <Container>
          <SectionHeading
            align="split"
            eyebrow="Website solutions"
            title="Website Solutions for Every Business"
            lede="Professional, responsive and conversion-focused websites designed to help businesses establish a credible online presence, showcase their services and make it easier for customers to get in touch."
          />
          <Reveal step={0.04} className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {SOLUTIONS.map((item, index) => (
              <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong">
                <span className="font-mono text-2xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-7 text-xl font-medium tracking-[-0.02em] text-fg">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{item.detail}</p>
              </motion.article>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading eyebrow="Features & capabilities" title="What Your Website Can Include" lede="The right features depend on your audience, content and business workflow." />
            <ul className="grid gap-x-8 border-t border-line sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 border-b border-line py-4 text-[15px] text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 lg:py-24">
        <Container>
          <SectionHeading align="split" eyebrow="How we work" title="Our Website Development Process" lede="A clear sequence from first conversation through launch and handover." />
          <div className="mt-14 lg:mt-20"><Process steps={PROCESS} /></div>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Concept work" title="Explore Our Website Demos" lede="Working website concepts for different industries. Each is a demonstration of design and development capability." />
            <Button href="/portfolio#website-demos" variant="secondary">View all website demos <Arrow /></Button>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {WEBSITE_DEMOS.slice(0, 3).map((demo) => <WebsiteDemoCard key={demo.slug} demo={demo} />)}
          </div>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
          <dl className="mt-12 grid gap-x-12 lg:grid-cols-2 lg:gap-y-0">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-line py-6">
                <dt className="text-[17px] font-medium text-fg">{item.q}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-body">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-surface px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <Container className="rounded-2xl border border-line bg-ink px-7 py-14 sm:px-12 lg:py-20">
          <Eyebrow dark>Start a website project</Eyebrow>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-fg">Ready to Build Your Business Website?</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-body">Tell us about your business and what visitors should be able to learn or do on your website.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={CONSULTATION} variant="onDark" size="lg">Book a Consultation <Arrow /></Button>
            <Button href={WEBSITE_WHATSAPP} variant="outlineOnDark" size="lg" external><WhatsappLogo className="h-4 w-4" /> Chat on WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
