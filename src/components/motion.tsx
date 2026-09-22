"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  useScroll,
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
   Springs for interactive elements; expo-out for reveals.
========================================================= */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;
export const SPRING_SNAPPY = { type: "spring", stiffness: 260, damping: 24 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const clipUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 24 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const stagger = (step = 0.08, delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

/* =========================================================
   REVEAL — a section that plays its variants once in view
========================================================= */

export function Reveal({
  children,
  className = "",
  amount = 0.15,
  step = 0.08,
  delay = 0.05,
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
   WORD REVEAL — headline words rise in sequence
========================================================= */

export function Words({
  text,
  className = "",
  delay = 0,
  step = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: delay + i * step,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   MAGNETIC — pulls toward the cursor. Motion values only.
========================================================= */

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   TILT — 3D parallax card following the cursor
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   SPOTLIGHT — border illuminates under the cursor
========================================================= */

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
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const color = dark ? "rgba(109,155,255,0.35)" : "rgba(59,116,230,0.28)";

  return (
    <div
      onMouseMove={onMove}
      className={`group/spot relative ${className}`}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: useTransform(
            [x, y],
            ([cx, cy]) =>
              `radial-gradient(360px circle at ${cx}px ${cy}px, ${color}, transparent 55%)`
          ),
          maskImage:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}

/* =========================================================
   COUNTER — spring-counted number on enter
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
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22, mass: 1 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) =>
      setDisplay(v.toFixed(decimals))
    );
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
   PARALLAX — image drifts with scroll
========================================================= */

export function Parallax({
  children,
  className = "",
  range = 40,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [range, -range]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* =========================================================
   MARQUEE — infinite kinetic band
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
   TYPEWRITER — cycles through phrases with a caret
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
