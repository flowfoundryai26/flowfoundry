"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { CaretDown, WhatsappLogo } from "@phosphor-icons/react";
import { NAV, SITE } from "@/lib/site";
import { Arrow, buttonClass } from "./ui";
import { EASE, SPRING_SNAPPY } from "./motion";

const getWhatsAppUrl = () => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
};

/* =========================================================
   LOGO
========================================================= */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={SITE.name + ", home"}
      className={"group flex shrink-0 items-center gap-3 " + className}
    >
      {/*
        The brand mark, kept as it is. The chrome around it is what
        changed: a hairline off the ramp instead of a white one, a
        radius on the scale, and no rotate-on-hover.

        `unoptimized` used to be set here, which shipped the full
        1254px source (1.08MB) on every page for a 36px slot. Leaving
        it off lets next/image serve a correctly sized, modern-format
        derivative. The decorative alt is intentional - the adjacent
        wordmark is the accessible name, and the parent link already
        has an aria-label.
      */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-2">
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          sizes="36px"
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
          FlowFoundry
        </span>
        <span className="mt-1 text-[11px] text-muted">AI Solutions</span>
      </span>
    </Link>
  );
}

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const whatsappUrl = getWhatsAppUrl();

  /*
    A plain scroll listener calling setScrolled ran on every scroll frame and
    re-rendered the whole header (nav, dropdowns and all) each time. Reading
    the motion value instead keeps the per-frame work off the React tree, and
    state is only written when the boolean actually flips.
  */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Covers a reload that restores the page mid-scroll, where no change event
  // fires until the user moves.
  useEffect(() => {
    setScrolled(scrollY.get() > 12);
  }, [scrollY]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color] duration-200 ${
          scrolled
            ? "border-b border-line bg-ink"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHover(null)}
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              const hovered = hover === item.href;
              return (
                <div
                  key={item.href}
                  className="group relative"
                  onMouseEnter={() => setHover(item.href)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[13.5px] font-medium transition-colors duration-200 ${
                      active || hovered ? "text-fg" : "text-body"
                    }`}
                  >
                    {item.label}
                    {item.children ? (
                      <CaretDown
                        className="h-3 w-3 text-muted transition-transform duration-200 group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>

                  {(hovered || (!hover && active)) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING_SNAPPY}
                      className="absolute inset-0 rounded-lg bg-ink-2"
                    />
                  )}

                  {/* Dropdown */}
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full z-20 w-[280px] translate-y-1 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-2 p-1.5 shadow-dark">
                        {item.children.map((child, i) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-[13px] text-body transition-colors duration-200 hover:bg-ink-3 hover:text-fg"
                          >
                            <span className="flex items-center gap-3">
                              <span className="serial font-mono text-2xs text-muted">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {child.label}
                            </span>
                            <Arrow className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`${buttonClass({ variant: "outlineOnDark", size: "sm" })} px-3.5`}
            >
              <WhatsappLogo className="h-4 w-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className={buttonClass({ variant: "onDark", size: "sm" })}
            >
              Book consultation
              <Arrow />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-200 active:scale-[0.98] lg:hidden ${
              open
                ? "border-line-strong bg-ink-3"
                : "border-line-strong bg-ink-2 hover:bg-ink-3"
            }`}
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full transition-[top,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[6px] rotate-45 bg-fg" : "top-0 bg-fg"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-[1.5px] w-full bg-fg transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full transition-[top,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[6px] -rotate-45 bg-fg" : "top-[12px] bg-fg"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
              }}
              className="flex-1 overflow-y-auto px-6 py-6"
            >
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                const isExpanded = expanded === item.label;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                    className="border-b border-line"
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex flex-1 items-baseline gap-4 py-4 text-2xl font-medium tracking-[-0.02em] ${
                          active ? "text-fg" : "text-body"
                        }`}
                      >
                        <span className="serial font-mono text-2xs text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((v) => (v === item.label ? null : item.label))
                          }
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-ink-2 hover:text-fg"
                        >
                          <CaretDown
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : null}
                    </div>

                    {item.children ? (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mb-4 ml-9 space-y-1 border-l border-line-strong pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block py-2 text-sm text-body transition-colors duration-200 hover:text-fg"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease: EASE }}
              className="grid gap-2.5 border-t border-line px-6 py-6"
            >
              <Link
                href="/contact"
                className={`${buttonClass({ variant: "onDark", size: "lg" })} w-full`}
              >
                Book consultation
                <Arrow />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass({ variant: "outlineOnDark", size: "lg" })} w-full`}
              >
                <WhatsappLogo className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
