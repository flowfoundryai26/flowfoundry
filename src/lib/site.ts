/**
 * Single source of truth for navigation, service data and site metadata.
 * Pages read from here so the header, footer and sitemap never drift apart.
 */

export const SITE = {
  name: "FlowFoundry AI Solutions",
  short: "FlowFoundry",
  url: "https://flowfoundryai.in",
  email: "info@flowfoundryai.in",
  whatsapp: "+917330937354",
  whatsappMessage: "Hi! I'm interested in learning more about FlowFoundry's AI solutions.",
  description:
    "FlowFoundry builds AI agents, voice automation, workflow automation, custom software and integrations that turn business processes into intelligent systems.",
} as const;

/**
 * Social links render only when a real URL is present.
 * Leave these empty until the accounts exist.
 */
export const SOCIALS: { label: string; href: string }[] = [];

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Agents", href: "/services#ai-agents" },
      { label: "Workflow Automation", href: "/services#workflow-automation" },
      { label: "Custom Software", href: "/services#custom-software" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "eCommerce", href: "/services#ecommerce" },
      { label: "Integrations", href: "/services#integrations" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Lead Generation Automation", href: "/solutions#lead-generation" },
      { label: "Sales Automation", href: "/solutions#sales" },
      { label: "Customer Support Automation", href: "/solutions#support" },
      { label: "Operations Automation", href: "/solutions#operations" },
      { label: "CRM Automation", href: "/solutions#crm" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "LeadPulz AI", href: "/leadpulz"},
  { label: "Contact", href: "/contact" },
];

/**
 * Ongoing projects. Rendered on the home page (summary cards) and the
 * /portfolio page (full detail). `tone` maps to TONES in components/ui.
 */
export type Project = {
  slug: string;
  name: string;
  category: string;
  status: "In progress";
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
    status: "In progress",
    tone: "rose",
    summary:
      "A custom Shopify-integrated eCommerce platform with affiliate marketing, multi-level commission management, referral tracking, dashboards, and backend automation.",
    highlights: [
      "Shopify integration",
      "Affiliate marketing",
      "Multi-level commission management",
      "Referral tracking",
      "Partner and admin dashboards",
      "Backend automation",
    ],
    services: ["eCommerce", "Custom Software", "Integrations"],
  },
  {
    slug: "leadpulz",
    name: "LeadPulz",
    category: "AI revenue platform",
    status: "In progress",
    tone: "indigo",
    summary:
      "An AI-powered revenue automation platform for lead qualification, voice conversations, appointment booking, follow-ups, CRM integrations, and sales analytics.",
    highlights: [
      "AI voice conversations",
      "Lead qualification",
      "Appointment booking",
      "Automated follow-ups",
      "CRM integrations",
      "Sales analytics",
    ],
    services: ["AI Agents", "Workflow Automation", "Integrations"],
    href: "/leadpulz",
  },
  {
    slug: "talkbridge",
    name: "TalkBridge",
    category: "Education platform",
    status: "In progress",
    tone: "cyan",
    summary:
      "A bilingual Japanese-English online conversation school platform for students, teachers, and administrators, with scheduling, lesson management, dashboards, and localized workflows.",
    highlights: [
      "Student, teacher and admin portals",
      "Lesson scheduling",
      "Lesson management",
      "Role-based dashboards",
      "Japanese-English localization",
      "Localized workflows",
    ],
    services: ["Custom Software", "Web Development"],
  },
  {
    slug: "operations-portal",
    name: "FlowFoundry Operations Portal",
    category: "Internal platform",
    status: "In progress",
    tone: "emerald",
    summary:
      "An internal business management platform to centralize lead tracking, project management, team allocation, client management, tasks, and operational reporting.",
    highlights: [
      "Lead tracking",
      "Project management",
      "Team allocation",
      "Client management",
      "Task management",
      "Operational reporting",
    ],
    services: ["Custom Software", "Workflow Automation"],
  },
];

export const INTEGRATIONS = [
  "HubSpot", "Salesforce", "Zoho", "GoHighLevel",
  "Google Calendar", "Microsoft Outlook", "Calendly", "WhatsApp",
  "Twilio", "Shopify", "WooCommerce", "Stripe",
  "Google Sheets", "Slack", "REST APIs", "Custom APIs",
] as const;

export const TEAM = [
  { 
    name: "Sri Harsha M", 
    role: "Founder & CTO", 
    place: "Vijayawada, Andhra Pradesh",
    avatar: "/images/team/harsha.png"
  },
  { 
    name: "Nithish", 
    role: "Tech Lead", 
    place: "Madurai, Tamil Nadu",
    avatar: "/images/team/nithish.png"
  },
  { 
    name: "Ajay", 
    role: "Backend Developer", 
    place: "Vijayawada, Andhra Pradesh",
    avatar: "/images/team/ajay.png"
  },
  { 
    name: "Janarthanan", 
    role: "Frontend Developer", 
    place: "Madurai, Tamil Nadu",
    avatar: "/images/team/jana.png"
  },
  { 
    name: "Ravi Vaghela", 
    role: "Business Development Executive", 
    place: "Ahmedabad, Gujarat",
    avatar: "/images/team/Ravi.jpeg"
  },
] as const;
