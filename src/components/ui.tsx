import Link from "next/link";
import type { ReactNode } from "react";

/* ============================================================
   TONES — shared across all components
   ============================================================ */

type Tone = "indigo" | "cyan" | "violet" | "emerald" | "amber" | "rose";

const TONES: Record<
  Tone,
  {
    border: string;
    bg: string;
    text: string;
    gradient: string;
    ring: string;
  }
> = {
  indigo: {
    border: "border-[#4F6BFF]/20",
    bg: "bg-[#4F6BFF]/5",
    text: "text-[#4F6BFF]",
    gradient: "from-[#4F6BFF] to-[#8B5CF6]",
    ring: "focus-visible:ring-[#4F6BFF]",
  },
  cyan: {
    border: "border-[#06B6D4]/20",
    bg: "bg-[#06B6D4]/5",
    text: "text-[#0891B2]",
    gradient: "from-[#06B6D4] to-[#4F6BFF]",
    ring: "focus-visible:ring-[#06B6D4]",
  },
  violet: {
    border: "border-[#8B5CF6]/20",
    bg: "bg-[#8B5CF6]/5",
    text: "text-[#7C3AED]",
    gradient: "from-[#8B5CF6] to-[#4F6BFF]",
    ring: "focus-visible:ring-[#8B5CF6]",
  },
  emerald: {
    border: "border-[#10B981]/20",
    bg: "bg-[#10B981]/5",
    text: "text-[#047857]",
    gradient: "from-[#10B981] to-[#06B6D4]",
    ring: "focus-visible:ring-[#10B981]",
  },
  amber: {
    border: "border-[#F59E0B]/20",
    bg: "bg-[#F59E0B]/5",
    text: "text-[#B45309]",
    gradient: "from-[#F59E0B] to-[#F472B6]",
    ring: "focus-visible:ring-[#F59E0B]",
  },
  rose: {
    border: "border-[#F472B6]/20",
    bg: "bg-[#F472B6]/5",
    text: "text-[#BE185D]",
    gradient: "from-[#F472B6] to-[#8B5CF6]",
    ring: "focus-visible:ring-[#F472B6]",
  },
};

/* ============================================================
   BUTTONS
============================================================ */

type BtnVariant = "primary" | "secondary" | "onDark" | "outlineOnDark" | "ghost";
type BtnSize = "sm" | "md" | "lg";

const BTN_BASE =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-all duration-200 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-60";

const BTN_SIZE: Record<BtnSize, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

const BTN_VARIANT: Record<BtnVariant, string> = {
  primary:
    "bg-[#0A1330] text-white " +
    "shadow-[0_10px_30px_-12px_rgba(10,19,48,0.5)] " +
    "hover:bg-[#0F1B3D] hover:shadow-[0_16px_40px_-12px_rgba(10,19,48,0.55)] " +
    "focus-visible:ring-[#0A1330] focus-visible:ring-offset-white",
  secondary:
    "border border-slate-200 bg-white text-ink " +
    "hover:border-slate-300 hover:shadow-[0_10px_30px_-12px_rgba(15,27,61,0.15)] " +
    "focus-visible:ring-[#4F6BFF] focus-visible:ring-offset-white",
  // Primary action on dark surfaces: same brand gradient family as the
  // light-surface primary, so the CTA reads as one identity site-wide.
  onDark:
    "bg-gradient-to-r from-[#4F6BFF] to-[#8B5CF6] text-white " +
    "shadow-[0_10px_30px_-12px_rgba(79,107,255,0.6)] " +
    "hover:brightness-110 hover:shadow-[0_16px_40px_-12px_rgba(79,107,255,0.7)] " +
    "focus-visible:ring-white focus-visible:ring-offset-[#0A1330]",
  outlineOnDark:
    "border border-white/15 bg-white/5 text-white backdrop-blur-sm " +
    "hover:border-white/30 hover:bg-white/10 " +
    "focus-visible:ring-white focus-visible:ring-offset-[#0A1330]",
  ghost:
    "text-slate hover:bg-slate-100 hover:text-ink " +
    "focus-visible:ring-[#4F6BFF] focus-visible:ring-offset-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${
        full ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13m-5-5 5 5-5 5" />
    </svg>
  );
}

/* ============================================================
   EYEBROW
============================================================ */

export function Eyebrow({
  children,
  tone = "indigo",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  if (isDark) {
    return (
      <span
        className={`inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm ${className}`}
      >
        <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-70" />
        <span className="truncate">{children}</span>
      </span>
    );
  }

  const t = TONES[tone];
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] ${t.border} ${t.bg} ${t.text} ${className}`}
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-70" />
      <span className="truncate">{children}</span>
    </span>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = true,
  align,
  tone = "indigo",
  invert = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  align?: "center" | "left";
  tone?: Tone | "dark";
  invert?: boolean;
  className?: string;
}) {
  const isCenter = align ? align === "center" : center;

  return (
    <div
      className={`${
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      } ${className}`}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] sm:text-5xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            isCenter ? "mx-auto max-w-2xl" : ""
          } ${invert ? "text-on-dark-muted" : "text-slate"}`}
        >
          {lede}
        </p>
      ) : null}
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
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone | "dark";
}) {
  if (tone === "dark") {
    return (
      <span
        className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-on-dark-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white ${className}`}
      >
        {children}
      </span>
    );
  }

  if (tone) {
    const t = TONES[tone];
    return (
      <span
        className={`inline-flex items-center rounded-full border ${t.border} ${t.bg} px-4 py-2.5 text-xs font-medium ${t.text} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(15,27,61,0.15)] ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F6BFF]/30 hover:bg-[#4F6BFF]/5 hover:text-[#4F6BFF] ${className}`}
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
  variant?: "default" | "cyan" | "success" | "warning" | "danger" | "dark";
}) {
  const variants = {
    default: "bg-[#4F6BFF]/10 text-[#4F6BFF]",
    cyan: "bg-[#06B6D4]/10 text-[#0891B2]",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
    dark: "border border-white/15 bg-white/5 text-white backdrop-blur-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-2xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

export function FeatureCard({
  icon,
  index,
  title,
  body,
  tone = "indigo",
  className = "",
}: {
  icon?: ReactNode;
  index?: string;
  title: string;
  body: string;
  tone?: Tone;
  className?: string;
}) {
  const t = TONES[tone];

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] md:p-8 ${t.border} ${className}`}
    >
      {/* Watermark number */}
      {index ? (
        <span
          className={`pointer-events-none absolute -right-2 -top-6 text-[88px] font-bold leading-none tracking-tighter opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09] bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent`}
        >
          {index}
        </span>
      ) : null}

      <div className="relative">
        {icon ? (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${t.gradient} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,0.5)]`}
          >
            {icon}
          </div>
        ) : null}

        {index ? (
          <span
            className={`mt-6 block text-2xs font-semibold uppercase tracking-[0.18em] ${t.text}`}
          >
            {index}
          </span>
        ) : null}

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate">{body}</p>

        {/* Animated underline */}
        <div
          className={`mt-6 h-px w-12 bg-gradient-to-r ${t.gradient} transition-all duration-500 group-hover:w-full`}
        />
      </div>
    </article>
  );
}