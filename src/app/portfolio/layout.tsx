import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Platforms FlowFoundry is building right now: iLoveSurprises, LeadPulz, TalkBridge, and the FlowFoundry Operations Portal — eCommerce, AI revenue automation, education, and internal business systems.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children;
}
