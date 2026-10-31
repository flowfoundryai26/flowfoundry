import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/* ============================================================
   TONES - kept for data compatibility. One accent only.
============================================================ */

export type Tone = "indigo" | "cyan" | "violet" | "emerald" | "amber" | "rose";

const ONE_TONE = {
  border: "border-line-strong",
  bg: "bg-ink-2",
  text: "text-body",
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

   Radius by size, not one pill for everything: a 44px control takes
   10px corners. Depth is a hairline and a soft top highlight, never
   a coloured shadow. The press is a 2% scale down; nothing grows on
   hover.
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
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const BTN_SIZE: Record<BtnSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const BTN_VARIANT: Record<BtnVariant, string> = {
  /*
    Dark theme, so the primary action is an off-white from the ramp
    with ink text. That reads more deliberate than a coloured fill and
    leaves the ember accent free for the one thing it marks: the path
    the work travels. `--color-mint` is that off-white now; the token
    name is legacy and kept so existing call sites compile.
  */
  primary:
    "bg-mint text-mint-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] " +
    "hover:bg-[#fdf8ee] focus-visible:ring-mint focus-visible:ring-offset-ink",
  accent:
    "bg-accent-fill text-accent-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] " +
    "hover:bg-accent-strong focus-visible:ring-accent focus-visible:ring-offset-ink",
  secondary:
    "border border-line-strong bg-ink-2 text-fg " +
    "hover:bg-ink-3 focus-visible:ring-accent focus-visible:ring-offset-ink",
  onDark:
    "bg-mint text-mint-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] " +
    "hover:bg-[#fdf8ee] focus-visible:ring-mint focus-visible:ring-offset-ink",
  outlineOnDark:
    "border border-line-strong bg-ink-2 text-fg " +
    "hover:bg-ink-3 focus-visible:ring-accent focus-visible:ring-offset-ink",
  ghost:
    "text-body hover:bg-ink-2 hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-ink",
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
      weight="regular"
      className={`h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      weight="regular"
      className={`h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 ${className}`}
      aria-hidden="true"
    />
  );
}

/* ============================================================
   EYEBROW

   Sentence case at normal tracking. The 24px rule in front of it is
   one of the few places ember appears: it is the hot line, the path
   the work travels through the page.
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
  void tone;
  void dark;
  return (
    <span
      className={`inline-flex items-center gap-3 text-[13px] font-medium text-muted ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
      {children}
    </span>
  );
}

/* ============================================================
   SECTION HEADING - left-aligned by default (anti-center bias)
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
  void invert; // one ramp now - headings are --color-fg on every surface
  const h2 =
    size === "lg"
      ? "text-[clamp(2.25rem,5vw,4rem)]"
      : "text-[clamp(2rem,3.8vw,3rem)]";

  const heading = (
    <>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`${
          eyebrow ? "mt-5" : ""
        } ${h2} font-medium leading-[1.06] tracking-[-0.03em] text-balance text-fg`}
      >
        {title}
      </h2>
    </>
  );

  const ledeEl = lede ? (
    <p className="text-base leading-relaxed text-body sm:text-[17px]">{lede}</p>
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
   CHIP - a tag, so a tag's radius
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
  void tone;
  void dark;
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-ink-2 px-3 py-1.5 text-[13px] text-body transition-colors duration-200 hover:border-line-strong hover:text-fg ${className}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   BADGE - quiet text, sentence case
============================================================ */

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "live" | "dark";
}) {
  const variants = {
    default: "border-line bg-ink-2 text-body",
    live: "border-line bg-ink-2 text-live",
    dark: "border-line bg-ink-2 text-fg",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-2xs ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   LIVE DOT - static. Nothing on this page is streaming, so nothing
   pings. The dot is a state marker, not an animation.
============================================================ */

export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-live ${className}`}
      aria-hidden="true"
    />
  );
}

export function Status({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  void dark;
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-line bg-ink-2 px-2.5 py-1 font-mono text-2xs text-body">
      <LiveDot />
      {children}
    </span>
  );
}

/* ============================================================
   INDEX - the signature.

   Every index numeral on the site is struck into the surface, the
   way a part number is stamped into a casting. See `.serial` in
   globals.css. Indices only, nowhere else.
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
  void dark;
  return (
    <span className={`serial font-mono text-xs text-muted ${className}`}>
      {children}
    </span>
  );
}
