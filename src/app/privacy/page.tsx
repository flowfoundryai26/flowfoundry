"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

/* =========================================================
   ANIMATION
========================================================= */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* =========================================================
   DATA
========================================================= */

const SECTIONS = [
  {
    index: "01",
    title: "Information We Collect",
    content: [
      "Personal identification information (Name, email address, phone number, company name)",
      "Usage data (How you interact with our website and services)",
      "Communication data (Messages, inquiries, and feedback you send us)",
      "Technical data (IP address, browser type, device information)",
    ],
  },
  {
    index: "02",
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our services",
      "To notify you about changes to our services",
      "To provide customer support and respond to inquiries",
      "To gather analysis or valuable information to improve our services",
      "To monitor the usage of our services",
      "To detect, prevent and address technical issues",
    ],
  },
  {
    index: "03",
    title: "Data Storage & Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your data",
      "Your data is stored on secure servers with industry-standard encryption",
      "We regularly review our security practices to ensure your data remains safe",
      "Access to your data is strictly limited to authorized personnel only",
    ],
  },
  {
    index: "04",
    title: "Data Sharing & Disclosure",
    content: [
      "We do not sell, trade, or rent your personal information to third parties",
      "We may share data with trusted service providers who assist in our operations",
      "We may disclose information when required by law or to protect our rights",
      "Any third-party services we use are bound by strict confidentiality agreements",
    ],
  },
  {
    index: "05",
    title: "Your Rights",
    content: [
      "Right to access your personal data",
      "Right to correct inaccurate data",
      "Right to request deletion of your data",
      "Right to object to data processing",
      "Right to data portability",
      "Right to withdraw consent at any time",
    ],
  },
  {
    index: "06",
    title: "Cookies",
    content: [
      "We use essential cookies to ensure our website functions properly",
      "Analytics cookies help us understand how visitors interact with our site",
      "You can control cookie preferences through your browser settings",
      "We do not use cookies for targeted advertising or tracking purposes",
    ],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      >
        {/* soft premium gradient wash */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#EEF0FF] to-[#F5F0FF] opacity-70 blur-[120px]" />
          <div className="absolute -left-40 top-[40%] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#EAF7FF] to-[#F0FBFF] opacity-80 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              variants={fadeInUp}
              className="inline-flex rounded-full bg-[#F1EEFF] px-4 py-2 text-2xs font-semibold tracking-[0.16em] text-[#6161FF]"
            >
              PRIVACY POLICY
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-[42px] font-light leading-[1.05] tracking-[-0.04em] text-ink sm:text-[54px] lg:text-[64px]"
            >
              Your privacy{" "}
              <span className="bg-gradient-to-r from-[#3AC9FF] via-[#6161FF] to-[#9450FD] bg-clip-text text-transparent">
                matters.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-[62ch] text-base leading-8 text-slate sm:text-lg"
            >
              At FlowFoundry, we take your privacy seriously. This policy
              explains how we collect, use, and protect your personal
              information.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted"
            >
              Last updated · {lastUpdated}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="bg-slate-50/60 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[900px] px-5 sm:px-6 lg:px-8">
          {/* Intro */}
          <motion.div
            variants={fadeInUp}
            className="mb-10 rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <p className="text-base leading-8 text-slate">
              FlowFoundry AI Solutions (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
              &ldquo;us&rdquo;) is committed to protecting and respecting your
              privacy. This Privacy Policy explains when and why we collect
              personal information, how we use it, and how we keep it secure.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-5">
            {SECTIONS.map((section) => (
              <motion.article
                key={section.index}
                variants={fadeInUp}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:border-slate-300/70 hover:shadow-[0_24px_60px_-30px_rgba(60,64,100,0.18)] sm:p-8"
              >
                {/* soft corner glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#EEF0FF] to-[#F5F0FF] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />

                <div className="relative flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-[#F1EEFF] text-2xs font-semibold text-[#6161FF]">
                    {section.index}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">
                      {section.title}
                    </h2>

                    <ul className="mt-5 space-y-3">
                      {section.content.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-7 text-slate"
                        >
                          <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#3AC9FF] to-[#9450FD]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            variants={fadeInUp}
            className="relative mt-10 overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-br from-[#F5F3FF] via-[#F8F7FF] to-[#EEF6FF] p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#A566FF]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#3AC9FF]/15 blur-[100px]" />

            <div className="relative">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
                Contact Us
              </h2>

              <p className="mt-3 max-w-[52ch] text-sm leading-7 text-slate">
                If you have any questions about this Privacy Policy or how we
                handle your data, please don&apos;t hesitate to contact us:
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:info@flowfoundryai.in"
                  className="group/btn inline-flex items-center gap-2.5 rounded-md border border-slate-200/80 bg-white px-4 py-3 text-sm font-medium text-slate shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8C8FF] hover:text-[#6161FF] hover:shadow-md"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F1EEFF] text-[#6161FF]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  info@flowfoundryai.in
                </a>

                <Link
                  href="/contact"
                  className="group/btn inline-flex items-center gap-2.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-300/50 active:translate-y-0"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </span>
                  Contact Form
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}