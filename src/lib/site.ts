/**
 * Single source of truth for navigation, brand facts and site metadata.
 * Pages read from here so the header, footer, sitemap and schema never drift.
 *
 * RULE: nothing in this file is aspirational. If a fact is not verified,
 * it is an empty string and every consumer renders nothing for it.
 */

export const SITE = {
  name: "FlowFoundry AI Solutions",
  short: "FlowFoundry",
  /**
   * Canonical origin. MUST match the host the infrastructure serves 200s on.
   * flowfoundryai.in 308-redirects to www, so www is canonical.
   */
  url: "https://www.flowfoundryai.in",
  email: "info@flowfoundryai.in",
  whatsapp: "+917330937354",
  whatsappDisplay: "+91 73309 37354",
  whatsappMessage:
    "Hi! I'd like to talk about automating a workflow in my business.",
  /** Where we operate. No office claim — distributed team. */
  region: "India",
  locality: "Vijayawada, Andhra Pradesh",
  responseTime: "Within one business day",
  description:
    "FlowFoundry builds AI agents, voice and WhatsApp automation, workflow automation, custom software and integrations around the way your business already works.",
  tagline: "AI · Automation · Software",
} as const;

/**
 * Verified public profiles. These feed Organization.sameAs and Person.sameAs,
 * which Google reads as identity claims — an unverified URL is worse than none.
 *
 * TODO(flowfoundry): paste the real URLs below. Anything left as an empty
 * string is omitted from the rendered UI and from structured data automatically.
 */
export const PROFILES = {
  companyLinkedIn: "",
  founderLinkedIn: "",
  founderGitHub: "",
} as const;

/** Only profiles that actually exist. Drives footer socials + schema sameAs. */
export const SOCIALS: { label: string; href: string }[] = (
  [
    { label: "LinkedIn", href: PROFILES.companyLinkedIn },
    { label: "GitHub", href: PROFILES.founderGitHub },
  ] as { label: string; href: string }[]
).filter((s) => s.href.length > 0);

export const waLink = (text: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    text
  )}`;

/* =========================================================
   NAVIGATION
========================================================= */

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "AI Voice Agents", href: "/solutions/ai-voice-agents" },
      { label: "WhatsApp Automation", href: "/solutions/whatsapp-automation" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "CRM Automation", href: "/solutions/crm-automation" },
      {
        label: "Custom Business Portals",
        href: "/solutions/custom-business-portals",
      },
      { label: "Shopify Automation", href: "/solutions/shopify-automation" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Dental Clinics", href: "/industries/dental-clinics" },
      { label: "Healthcare Clinics", href: "/industries/healthcare-clinics" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "eCommerce", href: "/industries/ecommerce" },
      {
        label: "Local Service Businesses",
        href: "/industries/local-service-businesses",
      },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About FlowFoundry", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Responsible Automation", href: "/responsible-automation" },
      { label: "All Services", href: "/services" },
      { label: "LeadPulz AI", href: "/leadpulz" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* =========================================================
   INTEGRATIONS
========================================================= */

export const INTEGRATIONS = [
  "HubSpot", "Salesforce", "Zoho", "GoHighLevel",
  "Google Calendar", "Microsoft Outlook", "Calendly", "WhatsApp",
  "Twilio", "Shopify", "WooCommerce", "Stripe",
  "Google Sheets", "Supabase", "Slack", "REST APIs",
] as const;

/** The systems we connect rather than replace. Drives the homepage trust section. */
export const EXISTING_STACK = [
  "CRM", "WhatsApp", "Email", "Calendars", "Shopify",
  "Google Sheets", "Internal tools", "Payment systems",
  "Customer databases", "APIs",
] as const;

/* =========================================================
   PEOPLE
========================================================= */

export const FOUNDER = {
  slug: "sri-harsha",
  name: "Sri Harsha M",
  role: "Founder — FlowFoundry AI Solutions",
  shortRole: "Founder & CTO",
  avatar: "/images/team/harsha.webp",
  place: "Vijayawada, Andhra Pradesh",
  bio:
    "Sri Harsha M founded FlowFoundry AI Solutions after seeing businesses told to replace their entire software stack in order to automate a single process. He works directly on delivery — mapping the workflow a business already runs, architecting the automation and integration layer, and building the AI agents and software that sit on top of it.",
  expertise: [
    "AI agent design and voice automation",
    "Workflow and CRM automation architecture",
    "Custom business software and operational portals",
    "API and third-party platform integration",
    "Business process mapping",
  ],
  /** Platforms personally worked on. Every link resolves to a real page. */
  work: [
    { label: "LeadPulz", href: "/case-studies/leadpulz" },
    { label: "iLoveSurprises", href: "/case-studies/ilovesurprises" },
    { label: "TalkBridge", href: "/case-studies/talkbridge" },
    { label: "FoundryPulse", href: "/case-studies/foundrypulse" },
  ],
} as const;

export const TEAM = [
  {
    name: "Sri Harsha M",
    role: "Founder & CTO",
    place: "Vijayawada, Andhra Pradesh",
    avatar: "/images/team/harsha.webp",
  },
  {
    name: "Nithish",
    role: "Tech Lead",
    place: "Madurai, Tamil Nadu",
    avatar: "/images/team/nithish.webp",
  },
  {
    name: "Ajay",
    role: "Backend Developer",
    place: "Vijayawada, Andhra Pradesh",
    avatar: "/images/team/ajay.webp",
  },
  {
    name: "Janarthanan",
    role: "Frontend Developer",
    place: "Madurai, Tamil Nadu",
    avatar: "/images/team/jana.webp",
  },
  {
    name: "Ravi Vaghela",
    role: "Business Development Executive",
    place: "Ahmedabad, Gujarat",
    avatar: "/images/team/Ravi.jpeg",
  },
] as const;

/* =========================================================
   PROJECTS — summary cards. Full detail in content/case-studies.
========================================================= */

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: "In development" | "Live";
  tone: "indigo" | "cyan" | "violet" | "emerald" | "amber" | "rose";
  summary: string;
  highlights: string[];
  services: string[];
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ilovesurprises",
    name: "iLoveSurprises",
    category: "eCommerce platform",
    status: "In development",
    tone: "rose",
    summary:
      "A Shopify-integrated eCommerce platform with multi-level affiliate commissions, referral tracking, partner dashboards and backend automation.",
    highlights: [
      "Shopify integration",
      "Multi-level commission engine",
      "Referral attribution",
      "Partner and admin dashboards",
      "Payout workflows",
      "Backend automation",
    ],
    services: ["eCommerce", "Custom Software", "Integrations"],
    href: "/case-studies/ilovesurprises",
  },
  {
    slug: "leadpulz",
    name: "LeadPulz",
    category: "AI revenue platform",
    status: "In development",
    tone: "indigo",
    summary:
      "An AI voice platform for lead qualification, inbound and outbound calling, appointment booking, follow-ups and CRM synchronisation.",
    highlights: [
      "AI voice conversations",
      "Lead qualification",
      "Appointment booking",
      "Automated follow-ups",
      "CRM integrations",
      "Conversation analytics",
    ],
    services: ["AI Agents", "Workflow Automation", "Integrations"],
    href: "/case-studies/leadpulz",
  },
  {
    slug: "talkbridge",
    name: "TalkBridge",
    category: "Education platform",
    status: "In development",
    tone: "cyan",
    summary:
      "A bilingual Japanese–English conversation school platform with student, teacher and admin portals, lesson scheduling and localised workflows.",
    highlights: [
      "Student, teacher and admin portals",
      "Lesson scheduling",
      "Lesson management",
      "Role-based dashboards",
      "Japanese–English localisation",
      "Timezone-aware booking",
    ],
    services: ["Custom Software", "Web Development"],
    href: "/case-studies/talkbridge",
  },
  {
    slug: "foundrypulse",
    name: "FoundryPulse",
    category: "Internal operations platform",
    status: "In development",
    tone: "emerald",
    summary:
      "The internal platform FlowFoundry runs on: lead tracking, project management, team allocation, client records, tasks and operational reporting.",
    highlights: [
      "Lead tracking",
      "Project management",
      "Team allocation",
      "Client management",
      "Task management",
      "Operational reporting",
    ],
    services: ["Custom Software", "Workflow Automation"],
    href: "/case-studies/foundrypulse",
  },
];

/* =========================================================
   HOW WE WORK — the 8-step delivery process
========================================================= */

export const PROCESS_STEPS = [
  { number: "01", title: "Discovery", body: "Understand the existing process, the tools already in use, and where the real bottleneck sits." },
  { number: "02", title: "Workflow mapping", body: "Map the conversations, data, business rules and actions that make up the workflow today." },
  { number: "03", title: "Solution architecture", body: "Decide what should be automated, what should be integrated, and what needs to be custom-built." },
  { number: "04", title: "Build", body: "Develop the AI agents, automation logic or software the architecture calls for." },
  { number: "05", title: "Integration", body: "Connect the solution to the CRM, calendars, databases and channels you already run." },
  { number: "06", title: "Testing", body: "Test the workflow end to end, including edge cases, failure paths and access permissions." },
  { number: "07", title: "Launch", body: "Deploy with monitoring and a rollback path, and hand over documentation." },
  { number: "08", title: "Optimisation", body: "Monitor real usage, measure against the original bottleneck, and refine." },
] as const;

/** Trust microcopy reused across pages. Factual, never absolute. */
export const TRUST_LINES = [
  "Built around your existing workflow.",
  "Integrates with the tools your team already uses.",
  "Start with one workflow and expand as needed.",
  "Designed around a measurable operational problem.",
  "Human oversight wherever your workflow requires it.",
] as const;
