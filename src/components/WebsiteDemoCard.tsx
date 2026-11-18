import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { WebsiteDemo } from "@/lib/site";
import { buttonClass } from "./ui";

export default function WebsiteDemoCard({ demo, compact = false }: { demo: WebsiteDemo; compact?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
      <div className={`relative overflow-hidden border-b border-line bg-ink-2 ${compact ? "aspect-video" : "aspect-[16/11]"}`}>
        <Image
          src={demo.preview}
          alt={demo.previewAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-5 sm:p-6" : "p-6 sm:p-7"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-2xs text-muted">{demo.category}</p>
          <span className="rounded-full border border-line-strong bg-ink-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-body">
            {demo.status}
          </span>
        </div>
        <h3 className={`${compact ? "mt-4" : "mt-5"} text-[clamp(1.35rem,2vw,1.7rem)] font-medium tracking-[-0.025em] text-fg`}>
          {demo.name}
        </h3>
        {!compact && <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{demo.description}</p>}
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${demo.name} concept demo in a new tab`}
          className={`${buttonClass({ variant: "secondary", size: "md" })} ${compact ? "mt-5" : "mt-7"} self-start`}
        >
          View Live Demo
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
