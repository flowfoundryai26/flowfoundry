"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
  type Variants,
  type MotionProps,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/* =========================================================
   TOKENS

   One easing curve and a short set of durations. Entrances rise
   8px, not 28; a press takes 2% off. Nothing springs, nothing
   overshoots, nothing loops.
========================================================= */

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Kept as named exports because call sites import them. Both are now
   the one curve with a duration, not a spring, so no UI overshoots. */
export const SPRING = { duration: 0.32, ease: EASE } as const;
export const SPRING_SNAPPY = { duration: 0.18, ease: EASE } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

/* No scale on enter any more - a card that grows into place is the
   thing the brief asks us to remove. Kept as a name so the twenty
   call sites compile; it is a fade and rise like everything else. */
export const scaleIn: Variants = fadeUp;

export const stagger = (step = 0.05, delay = 0.04): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

/* =========================================================
   REVEAL - a section that plays its variants once in view
========================================================= */

export function Reveal({
  children,
  className = "",
  amount = 0.15,
  step = 0.05,
  delay = 0.04,
  as = "div",
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  step?: number;
  delay?: number;
  id?: string;
  as?: "div" | "section" | "ul" | "ol" | "article" | "header" | "footer";
} & Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport">) {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger(step, delay)}
      className={className}
      id={id}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   WORDS - one fade and rise for a headline

   Not a per-word assembly. The headline settles; it does not
   perform. The text stays one text node, so assistive tech reads
   it directly.
========================================================= */

export function Words({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Retained so existing call sites keep type-checking; no longer used. */
  step?: number;
}) {
  return (
    <motion.span
      className={`inline ${className}`}
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {text}
    </motion.span>
  );
}

/* =========================================================
   TILT / SPOTLIGHT - now plain containers.

   Both used to track the cursor: Tilt rotated the card in 3D and
   painted a 420px white radial under the pointer, Spotlight lit its
   border with a blue glow. Three cursor-following effects on one
   page is a trend, not a design, and neither told the reader
   anything. The components stay so call sites compile; the hover
   state that matters now lives on the element itself.
========================================================= */

export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  void max;
  return <div className={`relative ${className}`}>{children}</div>;
}

export function Spotlight({
  children,
  className = "",
  dark = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
} & ComponentPropsWithoutRef<"div">) {
  void dark;
  return (
    <div
      className={`relative transition-colors duration-200 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* =========================================================
   COUNTER - a changed number tweens to its new value
========================================================= */

export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 26, mass: 1 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to.toFixed(decimals));
      return;
    }
    mv.set(to);
  }, [inView, mv, to, reduce, decimals]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v.toFixed(decimals)));
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* =========================================================
   MARQUEE - the integrations strip.

   The one loop left on the page, and it earns it: the strip is
   wider than the window, so the loop is how the rest of the marks
   are reachable. It pauses on hover.
========================================================= */

export function Marquee({
  children,
  duration = 40,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee w-full overflow-hidden ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TYPEWRITER - the voice demo on /leadpulz.

   Kept because it explains something: the product transcribes a
   call as it happens, and the text appearing IS the thing being
   shown. Nowhere else.
========================================================= */

export function Typewriter({
  phrases,
  className = "",
  typeMs = 38,
  holdMs = 1800,
}: {
  phrases: string[];
  className?: string;
  typeMs?: number;
  holdMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setLen(phrases[0].length);
      return;
    }
    const phrase = phrases[idx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && len < phrase.length) {
      t = setTimeout(() => setLen(len + 1), typeMs);
    } else if (!deleting && len === phrase.length) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && len > 0) {
      t = setTimeout(() => setLen(len - 1), typeMs / 2);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIdx((idx + 1) % phrases.length);
      }, 240);
    }
    return () => clearTimeout(t);
  }, [len, deleting, idx, phrases, typeMs, holdMs, reduce]);

  return (
    <span className={`caret ${className}`}>{phrases[idx].slice(0, len)}</span>
  );
}
