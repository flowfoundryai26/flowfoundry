import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/* ============================================================
   TONES — kept for data compatibility. One accent only.
============================================================ */

export type Tone = "indigo" | "cyan" | "violet" | "emerald" | "amber" | "rose";

const ONE_TONE = {
  border: "border-accent/25",
  bg: "bg-accent-soft",
  text: "text-accent-strong",
  dot: "bg-accent",
};

export const TONES: Record<Tone, typeof ONE_TONE> = {
  indigo: ONE_TONE,
  cyan: ONE_TONE,
  violet: ONE_TONE,
  emerald: ONE_TONE,
  amber: ONE_TONE,
  rose: ONE_TONE,
};

/* ============================================================
   CONTAINER
============================================================ */

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${
        wide ? "max-w-[1400px]" : "max-w-[1240px]"
      } px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   BUTTONS
============================================================ */

type BtnVariant =
  | "primary"
  | "secondary"
  | "onDark"
  | "outlineOnDark"
  | "ghost"
  | "accent";
type BtnSize = "sm" | "md" | "lg";

const BTN_BASE =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.98] active:translate-y-px " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const BTN_SIZE: Record<BtnSize, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

const BTN_VARIANT: Record<BtnVariant, string> = {
  primary:
    "bg-fg text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_10px_24px_-12px_rgba(14,17,24,0.5)] " +
    "hover:bg-ink-3 focus-visible:ring-fg focus-visible:ring-offset-white",
  accent:
    "bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-12px_rgba(59,116,230,0.55)] " +
    "hover:bg-accent-strong focus-visible:ring-accent focus-visible:ring-offset-white",
  secondary:
    "border border-line-strong bg-white text-fg " +
    "hover:border-fg/40 hover:bg-paper focus-visible:ring-accent focus-visible:ring-offset-white",
  onDark:
    "bg-white text-fg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] " +
    "hover:bg-[#f0f1f4] focus-visible:ring-white focus-visible:ring-offset-ink",
  outlineOnDark:
    "border border-white/15 bg-white/[0.04] text-white backdrop-blur-sm " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] " +
    "hover:border-white/30 hover:bg-white/[0.08] focus-visible:ring-white focus-visible:ring-offset-ink",
  ghost:
    "text-body hover:bg-paper hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-white",
};

export function buttonClass({
  variant = "primary",
  size = "md",
}: {
  variant?: BtnVariant;
  size?: BtnSize;
} = {}) {
  return `${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]}`;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = `${buttonClass({ variant, size })} ${
    full ? "w-full sm:w-auto" : ""
  } ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowRight
      weight="bold"
      className={`h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      weight="bold"
      className={`h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 ${className}`}
      aria-hidden="true"
    />
  );
}

/* ============================================================
   EYEBROW — mono label, no pill
============================================================ */

export function Eyebrow({
  children,
  tone,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  tone?: Tone | "dark";
  className?: string;
  dark?: boolean;
}) {
  const isDark = dark || tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-2xs font-medium uppercase tracking-[0.18em] ${
        isDark ? "text-accent-dark" : "text-accent-strong"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-6 ${isDark ? "bg-accent-dark/70" : "bg-accent/70"}`}
      />
      {children}
    </span>
  );
}

/* ============================================================
   SECTION HEADING — left-aligned by default (anti-center bias)
============================================================ */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
  className = "",
  size = "md",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "split" | "center";
  invert?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  const h2 =
    size === "lg"
      ? "text-[clamp(2.25rem,5vw,4rem)]"
      : "text-[clamp(1.9rem,3.6vw,2.9rem)]";

  const heading = (
    <>
      {eyebrow ? <Eyebrow dark={invert}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-5 ${h2} font-medium leading-[1.04] tracking-[-0.03em] text-balance ${
          invert ? "text-white" : "text-fg"
        }`}
      >
        {title}
      </h2>
    </>
  );

  const ledeEl = lede ? (
    <p
      className={`text-base leading-relaxed sm:text-[17px] ${
        invert ? "text-on-dark" : "text-body"
      }`}
    >
      {lede}
    </p>
  ) : null;

  if (align === "split") {
    return (
      <div
        className={`grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16 ${className}`}
      >
        <div className="max-w-2xl">{heading}</div>
        {ledeEl ? <div className="max-w-md lg:pb-1">{ledeEl}</div> : null}
      </div>
    );
  }

  if (align === "center") {
    return (
      <div className={`mx-auto max-w-2xl text-center ${className}`}>
        {heading}
        {ledeEl ? <div className="mx-auto mt-5 max-w-xl">{ledeEl}</div> : null}
      </div>
    );
  }

  return (
    <div className={`max-w-2xl ${className}`}>
      {heading}
      {ledeEl ? <div className="mt-5 max-w-xl">{ledeEl}</div> : null}
    </div>
  );
}

/* ============================================================
   CHIP
============================================================ */

export function Chip({
  children,
  className = "",
  tone,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone | "dark";
  dark?: boolean;
}) {
  const isDark = dark || tone === "dark";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-white/[0.04] text-on-dark hover:border-white/25 hover:text-white"
          : "border-line bg-white text-body hover:border-accent/40 hover:text-accent-strong"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   BADGE
============================================================ */

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "live" | "dark";
}) {
  const variants = {
    default: "bg-accent-soft text-accent-strong",
    live: "bg-live/10 text-live",
    dark: "border border-white/12 bg-white/5 text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-[0.12em] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   LIVE DOT
============================================================ */

export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-70 motion-safe:animate-ping" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
    </span>
  );
}

export function Status({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-[0.1em] ${
        dark
          ? "border-live/30 bg-live/10 text-[#5fd39e]"
          : "border-live/25 bg-live/8 text-live"
      }`}
    >
      <LiveDot />
      {children}
    </span>
  );
}

/* ============================================================
   INDEX — mono step number
============================================================ */

export function Index({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-xs tabular-nums tracking-[0.1em] ${
        dark ? "text-on-dark-muted" : "text-muted"
      } ${className}`}
    >
      {children}
    </span>
  );
}
