"use client";

import { useEffect } from "react";
import Image from "next/image";

/* =========================================================
   LOADING SCREEN

   Brand splash for full page loads. Deliberately NOT a
   hydration-gated overlay: the markup is server-rendered so it is
   painted with the first frame, otherwise it would pop in after
   hydration — worse than no splash at all.

   Dismissal is driven by real signals, not a fixed timer:
     - window "load", or
     - MAX_MS, whichever lands first (a stalled third-party
       request must never hold the page hostage)

   It shows once per tab. The inline script below reads that flag
   before first paint, so a repeat load never flashes the splash.
   Client-side route changes do not re-run this at all — the layout
   is not re-rendered — so navigation feedback is the job of the
   loading.tsx skeletons instead.
========================================================= */

const MAX_MS = 1400;
const KEY = "ff:splash-seen";

/** Runs before paint. Kept tiny and dependency-free on purpose. */
const PRE_PAINT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(
  KEY,
)})){document.documentElement.setAttribute("data-splash","done")}}catch(e){}})()`;

export default function LoadingScreen() {
  useEffect(() => {
    const root = document.documentElement;

    // Already dismissed by the pre-paint script on a repeat load.
    if (root.getAttribute("data-splash") === "done") return;

    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      root.setAttribute("data-splash", "done");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        // Private mode / storage disabled — the splash simply shows again.
      }
    };

    // A cap, so a slow font or image never strands the visitor.
    const timer = window.setTimeout(dismiss, MAX_MS);

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      <div className="splash" role="status" aria-live="polite">
        <div className="splash-mark">
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            sizes="56px"
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <span className="splash-word">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            FlowFoundry
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-on-dark-muted">
            AI Solutions
          </span>
        </span>

        <div className="splash-rail" aria-hidden="true">
          <div className="splash-bar" />
        </div>

        <span className="sr-only">Loading FlowFoundry AI Solutions</span>
      </div>
    </>
  );
}
