/**
 * Case studies at /case-studies/<slug>.
 *
 * HARD RULE ON RESULTS
 * --------------------
 * `results` is a list of metric SLOTS. Each has a label and an optional `value`.
 * A slot with no `value` renders as "Pending measurement" and is never presented
 * as an achievement. Nothing in this file may claim a number that has not been
 * measured, and `status` states plainly when a platform is still in development.
 *
 * This is why there are no percentages here. When a real figure exists, fill in
 * `value` and add `verifiedOn`.
 */

import type { Faq } from "./solutions";

export type MetricSlot = {
  label: string;
  /** Leave undefined until measured. Undefined renders as pending. */
  value?: string;
  /** ISO date the figure was verified. Required whenever `value` is set. */
  verifiedOn?: string;
  /** How the figure is measured, so it can be re-checked. */
  method?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  /** Rendered verbatim as a status badge. Honesty over polish. */
  status: "In development" | "Live";
  /** One-line positioning for cards. */
  summary: string;
  image: string;
  overview: string;
  businessProblem: { title: string; body: string };
  requirements: string[];
  /** Architecture described in layers, matching the site's system model. */
  architecture: { layer: string; detail: string }[];
  technologies: { group: string; items: string[] }[];
  coreFeatures: { title: string; body: string }[];
  challenges: { challenge: string; approach: string }[];
  implementation: string[];
  integrations: string[];
  /** Metric slots. Empty values render as pending, never as results. */
  results: MetricSlot[];
  lessons: string[];
  faqs: Faq[];
  relatedSolutions: string[];
  relatedIndustries: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "leadpulz",
    name: "LeadPulz",
    h1: "LeadPulz: an AI voice platform for lead qualification and booking.",
    metaTitle: "LeadPulz Case Study | AI Voice Platform",
    metaDescription:
      "How we are building LeadPulz: an AI voice platform for inbound and outbound calling, lead qualification, appointment booking and CRM sync. In development.",
    category: "AI revenue platform",
    status: "In development",
    summary:
      "Our own AI voice platform: inbound and outbound calling, structured qualification, calendar-aware booking and CRM synchronisation.",
    image: "/images/dashboard.jpeg",
    overview:
      "LeadPulz is a FlowFoundry product rather than a client engagement. It exists because the same requirement kept appearing in client conversations: answer the calls nobody is free to take, qualify the caller properly, and make sure the outcome reaches the CRM. Assembling that from disconnected tools each time was slower and more fragile than building the platform once. LeadPulz is currently in active development and is not generally available.",
    businessProblem: {
      title: "Voice is the highest-intent channel and the least instrumented",
      body:
        "A phone enquiry signals more intent than almost any web form, and yet it is the channel with the least data attached. Calls go unanswered outside business hours, qualification questions are asked inconsistently, and what the caller actually wanted survives only in someone's memory. Existing voice tools tended to solve the conversation and stop there — leaving the part that matters commercially, the write-back into calendars and CRM systems, as an exercise for the buyer.",
    },
    requirements: [
      "Answer inbound calls on configurable rules including after-hours and overflow",
      "Run outbound calling campaigns against a lead list",
      "Capture structured qualification fields, not just a transcript",
      "Read live calendar availability and write confirmed bookings back",
      "Create and update CRM records with the call outcome attached",
      "Trigger follow-up sequences based on the call result",
      "Let a non-developer configure conversation flow and business knowledge",
      "Escalate to a human with the gathered context on defined conditions",
      "Store transcripts, recordings and captured fields for review",
    ],
    architecture: [
      {
        layer: "Conversation",
        detail:
          "Telephony via Twilio handles call setup and media. Speech-to-text, the language model and text-to-speech run as a streaming pipeline, because perceived latency is what determines whether a caller stays on the line.",
      },
      {
        layer: "Business logic",
        detail:
          "A configurable flow engine holds the qualification script, branching rules, escalation conditions and the boundaries of what the agent may assert. Business rules live here rather than inside prompts, so they are testable.",
      },
      {
        layer: "Knowledge",
        detail:
          "A per-tenant knowledge base supplies retrieval context for answering questions, scoped so an agent can only read its own tenant's data.",
      },
      {
        layer: "Data",
        detail:
          "Postgres via Supabase stores tenants, agents, flows, call records, captured fields and transcripts, with row-level security enforcing tenant isolation at the database rather than in application code.",
      },
      {
        layer: "Actions",
        detail:
          "An integration layer performs the outward writes — calendar events, CRM records, follow-up triggers, notifications — behind a retry and idempotency wrapper so a network failure cannot double-book a slot.",
      },
      {
        layer: "Interface",
        detail:
          "A Next.js dashboard for configuring agents, reviewing conversations and inspecting captured data and outcomes.",
      },
    ],
    technologies: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "TypeScript", "REST APIs", "Webhooks"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row-level security"] },
      { group: "Voice", items: ["Twilio", "Streaming speech-to-text", "Text-to-speech"] },
      { group: "AI", items: ["Large language models", "Retrieval over tenant knowledge"] },
      { group: "Integrations", items: ["Google Calendar", "Outlook", "HubSpot", "Zoho", "WhatsApp"] },
    ],
    coreFeatures: [
      { title: "Inbound call handling", body: "Answers on configurable rules — after hours, ring count, or overflow when the team is engaged." },
      { title: "Outbound campaigns", body: "Works a lead list with configurable pacing, retry rules and outcome recording." },
      { title: "Structured qualification", body: "Captures named, typed fields the CRM can filter and report on." },
      { title: "Calendar-aware booking", body: "Offers only genuinely free slots and writes the confirmed event back." },
      { title: "CRM synchronisation", body: "Creates or updates the contact and attaches the call summary and captured fields." },
      { title: "Follow-up automation", body: "Triggers sequences on call outcome and qualification status." },
      { title: "Custom knowledge", body: "Answers questions from a tenant-scoped knowledge base." },
      { title: "Conversation review", body: "Transcript, recording, captured fields and outcome in one view." },
    ],
    challenges: [
      {
        challenge: "Conversational latency",
        approach:
          "A caller notices a pause long before they notice a wrong word. We stream every stage rather than waiting for complete results, and start speech synthesis on the first usable clause instead of the full response.",
      },
      {
        challenge: "Interruptions and overlapping speech",
        approach:
          "Real callers talk over the agent. Barge-in detection stops playback and re-listens, which matters more to how natural a call feels than response quality does.",
      },
      {
        challenge: "Keeping the agent inside its remit",
        approach:
          "Allowed actions are a whitelist in the flow engine, not an instruction in a prompt. The agent cannot quote a price or make a commitment that is not in its configuration, because the capability is absent rather than discouraged.",
      },
      {
        challenge: "Double-booking under failure",
        approach:
          "Booking is idempotent and keyed per conversation. A retry after a timeout resolves to the same event rather than creating a second one.",
      },
      {
        challenge: "Tenant isolation",
        approach:
          "Row-level security in Postgres rather than filtering in application queries, so a missed WHERE clause cannot leak another tenant's calls.",
      },
    ],
    implementation: [
      "Mapped the call flows of the businesses that prompted the product",
      "Built the telephony and streaming voice pipeline first, because latency determines viability",
      "Added the flow engine so qualification logic is configuration rather than code",
      "Implemented the data model with tenant isolation enforced at the database",
      "Built the integration layer for calendars and CRMs with retries and idempotency",
      "Added the dashboard for configuration and conversation review",
      "Currently: hardening edge cases, failure paths and permission boundaries",
    ],
    integrations: [
      "Twilio",
      "Google Calendar",
      "Microsoft Outlook",
      "HubSpot",
      "Zoho",
      "GoHighLevel",
      "WhatsApp",
      "Supabase",
      "REST APIs",
    ],
    results: [
      { label: "Median agent response latency", method: "Measured end to end from caller speech-end to agent speech-start" },
      { label: "Calls handled without escalation", method: "Share of calls reaching an outcome with no human transfer" },
      { label: "Booking accuracy", method: "Confirmed bookings that match a genuinely free calendar slot" },
      { label: "Qualification completeness", method: "Share of calls with all required fields captured" },
    ],
    lessons: [
      "Latency is the product. A factually perfect agent that pauses for two seconds loses the caller.",
      "Business rules belong in a testable engine, not in prompt text. Prompts drift; configuration does not.",
      "The conversation was the easy half. The write-back into calendars and CRMs is where the commercial value and most of the engineering sits.",
      "Constrain by capability rather than instruction. An agent that cannot perform an action will not be talked into it.",
      "Tenant isolation belongs in the database. Application-layer filtering is one forgotten clause away from a breach.",
    ],
    faqs: [
      {
        q: "Can we use LeadPulz today?",
        a: "Not as a self-serve product — it is in active development. We do deploy the underlying capability as part of client engagements, which is how it gets tested against real call volume. If voice automation is what you need, that is the route to start on.",
      },
      {
        q: "Does it work in languages other than English?",
        a: "The pipeline is language-configurable and we are testing Indian-language handling, including mid-conversation switching, which is normal on real calls. Quality varies by language and we would rather show you a live test on yours than quote a claim.",
      },
      {
        q: "How is this different from an IVR?",
        a: "An IVR routes against a fixed menu. This holds a conversation, answers from your knowledge base, captures structured data, and completes an action like a booking. The practical difference is that the caller does not have to know which option they need before they call.",
      },
    ],
    relatedSolutions: ["ai-voice-agents", "crm-automation", "whatsapp-automation"],
    relatedIndustries: ["dental-clinics", "healthcare-clinics", "real-estate", "local-service-businesses"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ilovesurprises",
    name: "iLoveSurprises",
    h1: "iLoveSurprises: Shopify commerce with a multi-level affiliate engine.",
    metaTitle: "iLoveSurprises | Shopify Affiliate Platform",
    metaDescription:
      "How we are building a Shopify-integrated eCommerce platform with multi-level affiliate commissions, referral attribution, partner dashboards and payout ledgers.",
    category: "eCommerce platform",
    status: "In development",
    summary:
      "A Shopify-integrated platform with multi-level affiliate commissions, referral attribution, partner dashboards and an auditable payout ledger.",
    image: "/images/use-cases/ecommerce.webp",
    overview:
      "A client eCommerce platform built around Shopify, where the storefront is only part of the requirement. The commercial model depends on an affiliate network with multi-level commissions, which means attribution, commission calculation, partner visibility and payouts all need to be correct and auditable. That is the part Shopify does not do, and the part where a spreadsheet stops being viable. The platform is in active development.",
    businessProblem: {
      title: "Commission maths in a spreadsheet does not survive growth",
      body:
        "Affiliate programmes fail on trust. A partner who cannot see what they earned, or who is paid an amount they cannot reconcile, stops promoting. Doing multi-level commission calculation by hand means month-end reconstruction from links and memory, no clear audit trail, and disputes that cannot be settled with evidence. Add returns — which should claw back commission already accrued — and manual calculation becomes untenable.",
    },
    requirements: [
      "Integrate with Shopify for catalogue, orders and fulfilment events",
      "Capture referral attribution reliably at the point of sale",
      "Calculate multi-level commissions on configurable rules",
      "Give partners a dashboard showing referrals, earnings and payout status",
      "Maintain an auditable ledger from order to payout",
      "Handle returns and cancellations with commission clawback",
      "Prevent self-referral and circular referral structures",
      "Provide admin tooling for partner approval, rates and payout runs",
      "Automate customer order and shipping notifications",
    ],
    architecture: [
      {
        layer: "Storefront",
        detail:
          "Shopify owns catalogue, cart, checkout and payment. Deliberately not rebuilt — it is the part that already works and is PCI-handled.",
      },
      {
        layer: "Attribution",
        detail:
          "Referral codes and links resolve to a partner at order creation and are persisted on the order. Attribution is captured at the event rather than inferred later, because later is when it becomes guesswork.",
      },
      {
        layer: "Commission engine",
        detail:
          "A rules engine walks the partner tree and computes per-level commission as ledger entries. Every entry references the order and the rule version that produced it, so a historical payout can still be explained after rates change.",
      },
      {
        layer: "Ledger",
        detail:
          "Append-only entries with states — accrued, approved, paid, reversed. Nothing is edited in place, which is what makes the ledger auditable and disputes resolvable.",
      },
      {
        layer: "Data",
        detail:
          "Postgres via Supabase with row-level security, so a partner can only read their own tree and their own earnings.",
      },
      {
        layer: "Interfaces",
        detail:
          "A partner dashboard for referrals and earnings, and an admin console for approvals, rate configuration, payout runs and reconciliation.",
      },
    ],
    technologies: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "TypeScript", "Webhooks", "Scheduled jobs"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row-level security"] },
      { group: "Commerce", items: ["Shopify Admin API", "Shopify webhooks"] },
      { group: "Messaging", items: ["WhatsApp Business API", "Transactional email"] },
    ],
    coreFeatures: [
      { title: "Shopify integration", body: "Catalogue, order and fulfilment synchronisation over the Admin API and webhooks." },
      { title: "Referral attribution", body: "Code and link resolution persisted on the order at creation." },
      { title: "Multi-level commissions", body: "Configurable per-level rates computed across the partner tree." },
      { title: "Partner dashboard", body: "Referrals, conversions, earnings by state and payout history." },
      { title: "Payout ledger", body: "Append-only entries with a traceable path from order to payment." },
      { title: "Clawback handling", body: "Returns and cancellations reverse the corresponding commission entries." },
      { title: "Admin console", body: "Partner approval, rate configuration, payout runs and reconciliation reports." },
      { title: "Order notifications", body: "Automated confirmation and shipping updates on WhatsApp and email." },
    ],
    challenges: [
      {
        challenge: "Attribution when the customer journey is messy",
        approach:
          "Customers click a partner link, leave, and return directly days later. We persist attribution server-side against the resolved code with a defined window and a documented last-touch rule, rather than depending on a cookie that may not survive the journey.",
      },
      {
        challenge: "Commission correctness across rate changes",
        approach:
          "Ledger entries reference the rule version used. Changing a rate never rewrites history, so a payout made last quarter can still be explained.",
      },
      {
        challenge: "Returns after commission is paid",
        approach:
          "Reversal entries rather than deletions. The ledger shows the accrual, the payment and the clawback as separate facts, which is what makes a dispute settleable.",
      },
      {
        challenge: "Self-referral and circular structures",
        approach:
          "Validation at partner registration and at attribution time, plus cycle detection when walking the tree so commission calculation cannot loop.",
      },
      {
        challenge: "Reconciliation",
        approach:
          "Scheduled jobs compare Shopify order totals against ledger accruals and flag divergence, because an unreconciled ledger is a liability rather than a record.",
      },
    ],
    implementation: [
      "Modelled partners, referrals, orders, commission entries and payouts",
      "Built the Shopify webhook ingestion path with idempotent handling",
      "Implemented attribution resolution and persistence at order creation",
      "Built the commission engine against the partner tree with rule versioning",
      "Added the append-only ledger with explicit state transitions",
      "Built the partner dashboard and admin console",
      "Added reconciliation jobs and clawback handling",
      "Currently: payout workflows and reconciliation hardening",
    ],
    integrations: [
      "Shopify",
      "WhatsApp Business API",
      "Stripe",
      "Supabase",
      "Google Sheets",
      "REST APIs",
    ],
    results: [
      { label: "Attribution accuracy", method: "Share of partner-referred orders correctly attributed on audit" },
      { label: "Ledger reconciliation variance", method: "Difference between store order totals and ledger accruals per cycle" },
      { label: "Manual effort per payout cycle", method: "Admin hours per payout run, baselined against the spreadsheet process" },
      { label: "Commission dispute rate", method: "Disputes raised per hundred payouts" },
    ],
    lessons: [
      "Do not rebuild checkout. Shopify already handles payment and compliance better than a custom build will.",
      "Attribution must be captured at the event. Reconstructing it later is guesswork dressed as reporting.",
      "An append-only ledger is not over-engineering for money. It is the only version that survives a dispute.",
      "Version the rules, not just the data. Rate changes are inevitable and history has to remain explainable.",
      "Partner trust is a technical outcome. Visible, reconcilable earnings are what keep a network active.",
    ],
    faqs: [
      {
        q: "Why not use an existing affiliate app?",
        a: "Apps cover single-level programmes well and we would recommend one for that. The multi-level tree, the clawback rules and the payout ledger this business model needs sit outside what the off-the-shelf options do, and bending an app into that shape is usually more fragile than building the commission layer properly.",
      },
      {
        q: "Can this pattern be applied to another store?",
        a: "The architecture transfers — webhook ingestion, attribution, a versioned commission engine, an append-only ledger. The commission rules themselves are always business-specific, so it is a reusable pattern rather than a reusable product.",
      },
    ],
    relatedSolutions: ["shopify-automation", "custom-business-portals", "whatsapp-automation"],
    relatedIndustries: ["ecommerce"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "talkbridge",
    name: "TalkBridge",
    h1: "TalkBridge: a bilingual conversation school platform.",
    metaTitle: "TalkBridge | Bilingual Education Platform",
    metaDescription:
      "How we are building TalkBridge: a Japanese-English conversation school platform with student, teacher and admin portals, scheduling and localised workflows.",
    category: "Education platform",
    status: "In development",
    summary:
      "A Japanese–English conversation school platform with three role-specific portals, timezone-aware lesson scheduling and full bilingual localisation.",
    image: "/images/use-cases/custom.webp",
    overview:
      "A client platform for an online Japanese–English conversation school. Three distinct user types — students, teachers and administrators — need genuinely different interfaces over the same scheduling and lesson data, and the entire product has to work equally well in Japanese and English. Neither localisation nor timezone handling is a feature here; both are structural constraints that shape the data model. In active development.",
    businessProblem: {
      title: "Scheduling across timezones, in two languages, for three roles",
      body:
        "Conversation schools live and die on scheduling. Teachers set availability in their local time, students book in theirs, and a one-hour error means a missed lesson and a refund. Running that on shared calendars and messaging does not survive growth: teachers double-book, students cannot self-serve reschedules, and administrators have no reliable view of delivery. Doing it bilingually adds a requirement most scheduling tools handle poorly — every date, time and notification has to be correct in both languages and locales.",
    },
    requirements: [
      "Separate student, teacher and administrator portals over shared data",
      "Teacher availability management in the teacher's local timezone",
      "Student booking that displays and confirms in the student's timezone",
      "Lesson lifecycle: booked, completed, cancelled, no-show, rescheduled",
      "Complete Japanese and English localisation including dates and times",
      "Cancellation and reschedule policy enforced in code",
      "Lesson credit or package tracking per student",
      "Administrative reporting on delivery, attendance and utilisation",
      "Automated reminders in the recipient's language and timezone",
    ],
    architecture: [
      {
        layer: "Identity and roles",
        detail:
          "One authentication system with role-based authorisation. Student, teacher and admin capabilities are distinct permission sets over shared entities rather than three separate applications.",
      },
      {
        layer: "Scheduling core",
        detail:
          "All instants stored in UTC; every display converts to the viewer's timezone. Availability is modelled as recurring rules plus explicit exceptions, not as pre-generated slot rows, which keeps the data tractable as teachers change their patterns.",
      },
      {
        layer: "Booking logic",
        detail:
          "Availability, existing bookings, notice periods, student credits and cancellation policy are evaluated atomically, so two students cannot take the same slot.",
      },
      {
        layer: "Localisation",
        detail:
          "Message catalogues plus locale-aware date, time and number formatting. Locale is a user property that flows through the UI and every outbound notification.",
      },
      {
        layer: "Data",
        detail:
          "Postgres via Supabase with row-level security: a student reads only their own lessons, a teacher only their own schedule.",
      },
      {
        layer: "Notifications",
        detail:
          "Reminder and confirmation messages rendered in the recipient's locale and timezone, scheduled relative to the lesson instant.",
      },
    ],
    technologies: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "TypeScript", "Scheduled jobs"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row-level security"] },
      { group: "Internationalisation", items: ["Message catalogues", "Locale-aware formatting", "IANA timezones"] },
      { group: "Notifications", items: ["Transactional email", "In-app notifications"] },
    ],
    coreFeatures: [
      { title: "Student portal", body: "Browse teachers, book and reschedule lessons, track remaining credits and lesson history." },
      { title: "Teacher portal", body: "Manage recurring availability and exceptions, view the schedule, record lesson outcomes." },
      { title: "Admin portal", body: "Manage users, packages and policies; view delivery, attendance and utilisation reporting." },
      { title: "Timezone-correct scheduling", body: "UTC storage with per-viewer conversion so both parties see the same moment in their own time." },
      { title: "Bilingual interface", body: "Full Japanese and English coverage including locale-correct dates and times." },
      { title: "Policy enforcement", body: "Notice periods, cancellation windows and credit rules applied in code rather than by staff judgement." },
      { title: "Lesson credits", body: "Package purchase, consumption and expiry tracked per student." },
      { title: "Automated reminders", body: "Sent in the recipient's language and timezone ahead of each lesson." },
    ],
    challenges: [
      {
        challenge: "Timezones and daylight saving",
        approach:
          "Store UTC, convert at display, and store recurring availability as rules against an IANA timezone rather than fixed offsets. Japan has no DST but students do, and a rule stored as an offset breaks silently twice a year.",
      },
      {
        challenge: "Concurrent booking of one slot",
        approach:
          "Availability, conflicts, notice period and credits are validated inside a single transaction with the slot locked. Checking then writing leaves a race that will eventually be hit.",
      },
      {
        challenge: "Localisation beyond string replacement",
        approach:
          "Japanese date conventions, name ordering and text length all differ. Locale is threaded through formatting and layout rather than handled by swapping strings into an English-shaped UI.",
      },
      {
        challenge: "Three roles over one dataset",
        approach:
          "Row-level security in the database so authorisation is structural. Three portals filtering in application code is three chances to leak.",
      },
      {
        challenge: "Reschedules against policy",
        approach:
          "Policy is encoded — notice period, remaining reschedules, credit treatment — so students self-serve within the rules instead of negotiating each case with an administrator.",
      },
    ],
    implementation: [
      "Modelled users, roles, availability rules, lessons, packages and credits",
      "Built the scheduling core with UTC storage and rule-based availability",
      "Implemented transactional booking with conflict and policy validation",
      "Built the three role-specific portals over the shared model",
      "Added the localisation layer across UI and notifications",
      "Implemented credit tracking and policy enforcement",
      "Added administrative reporting",
      "Currently: reporting depth and notification coverage",
    ],
    integrations: [
      "Supabase",
      "Transactional email",
      "Google Calendar",
      "Payment gateway",
      "REST APIs",
    ],
    results: [
      { label: "Scheduling conflicts per term", method: "Double-bookings and timezone errors recorded per academic term" },
      { label: "Self-served reschedules", method: "Share of reschedules completed without administrator involvement" },
      { label: "Lesson attendance rate", method: "Completed lessons as a share of booked lessons" },
      { label: "Administrative hours per week", method: "Staff time on scheduling, baselined against the previous process" },
    ],
    lessons: [
      "Timezone handling is an architectural decision. Retrofitting it means rewriting the scheduling core.",
      "Store recurring availability as rules against a named timezone, never as generated slots or fixed offsets.",
      "Localisation is layout and formatting, not a string table. Japanese and English do not occupy the same space.",
      "Encode the cancellation policy. Every case left to staff judgement becomes an inconsistency and then a complaint.",
      "Role separation belongs in the database when three interfaces share one dataset.",
    ],
    faqs: [
      {
        q: "Why not use an off-the-shelf booking tool?",
        a: "Generic booking tools handle one-to-one appointments well. They do not handle lesson credits, package expiry, bilingual notifications, reschedule policy and three-role reporting over shared data. The school had already assembled four tools to approximate it, which is usually the signal that one system is cheaper.",
      },
      {
        q: "Does this only work for language schools?",
        a: "The scheduling core and role model transfer to any tutoring, coaching or consultation business with recurring availability and package-based billing. The localisation depth is specific to this client's bilingual requirement.",
      },
    ],
    relatedSolutions: ["custom-business-portals", "workflow-automation"],
    relatedIndustries: ["local-service-businesses"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "foundrypulse",
    name: "FoundryPulse",
    h1: "FoundryPulse: the operations platform we run FlowFoundry on.",
    metaTitle: "FoundryPulse | Internal Operations Platform",
    metaDescription:
      "How we built our own operations platform: lead tracking, project management, team allocation, client records, tasks and operational reporting in one system.",
    category: "Internal operations platform",
    status: "In development",
    summary:
      "Our internal platform: lead tracking, projects, team allocation, client records, tasks and reporting — replacing the spreadsheet stack we had outgrown.",
    image: "/images/use-cases/operations.webp",
    overview:
      "FoundryPulse is the system FlowFoundry runs its own business on. We built it for the ordinary reason a business builds internal software: the spreadsheets worked until they did not. It is included here because it is the most honest example we can offer — we are the client, we absorb every design mistake ourselves, and it demonstrates the same architecture we propose for operational portals. In active development and used daily.",
    businessProblem: {
      title: "We were running delivery on files we could not report on",
      body:
        "Leads sat in one sheet, projects in another, allocation in a third, and the connection between them existed only in the founder's head. Answering a basic question — who is over-allocated next week, which leads went quiet, what is the status of a client's work — meant opening several files and reconciling them by eye. That is exactly the condition we tell clients to fix, and continuing to operate that way while advising against it was not defensible.",
    },
    requirements: [
      "Track leads from first contact through to won or lost with an owner and stage",
      "Manage projects with milestones, tasks and delivery status",
      "Allocate team members and surface over-commitment before it becomes a delivery problem",
      "Maintain client records linked to projects and communication history",
      "Role-based access separating founder, lead and team-member views",
      "Operational reporting on pipeline, delivery and utilisation from live data",
      "One source of truth so operational and reported figures match",
      "An audit trail on meaningful changes",
    ],
    architecture: [
      {
        layer: "Domain model",
        detail:
          "Leads, clients, projects, milestones, tasks, people and allocations as first-class related entities. The relationships are the point — they are what a spreadsheet cannot express.",
      },
      {
        layer: "Workflow and state",
        detail:
          "Leads and projects move through explicit states with defined permitted transitions, so status means the same thing to everyone.",
      },
      {
        layer: "Allocation",
        detail:
          "Capacity modelled per person per period, with committed allocation compared against it so over-commitment is visible before the week starts rather than after it fails.",
      },
      {
        layer: "Data",
        detail:
          "Postgres via Supabase with row-level security. A team member sees their own tasks and allocations, not the full commercial picture.",
      },
      {
        layer: "Reporting",
        detail:
          "Dashboards query live data directly. There is no export step, which is what keeps the operational number and the reported number identical.",
      },
      {
        layer: "Audit",
        detail:
          "Meaningful changes write an entry with actor and timestamp, so a disputed status change can be traced.",
      },
    ],
    technologies: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "TypeScript", "Scheduled jobs"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row-level security"] },
      { group: "Integrations", items: ["Google Workspace", "WhatsApp", "Transactional email"] },
    ],
    coreFeatures: [
      { title: "Lead tracking", body: "Pipeline with ownership, stages, activity history and follow-up prompts." },
      { title: "Project management", body: "Projects, milestones, tasks and dependencies with delivery status." },
      { title: "Team allocation", body: "Capacity versus commitment per person and period, with over-allocation flagged." },
      { title: "Client management", body: "Client records linked to projects, contacts and communication history." },
      { title: "Task management", body: "Assignment, priority, due dates and completion tracking." },
      { title: "Operational reporting", body: "Live pipeline, delivery and utilisation views with no export step." },
      { title: "Role-based access", body: "Founder, lead and team-member permission sets over shared data." },
      { title: "Activity log", body: "Attributed, timestamped record of meaningful changes." },
    ],
    challenges: [
      {
        challenge: "Migrating ambiguous spreadsheet data",
        approach:
          "Extraction was trivial; deciding what half-filled rows meant was not. We resolved ambiguity deliberately during migration rather than importing it, because importing it would have made the new system untrustworthy on day one.",
      },
      {
        challenge: "Modelling capacity honestly",
        approach:
          "Capacity is not hours available. We model committed allocation against realistic availability, excluding the coordination overhead that made earlier estimates consistently optimistic.",
      },
      {
        challenge: "Avoiding a system nobody updates",
        approach:
          "The internal-tool failure mode is data entry with no payoff. We kept required fields minimal and made the allocation view genuinely useful, so updating it serves the person doing it.",
      },
      {
        challenge: "Reporting that matches reality",
        approach:
          "Dashboards read live data rather than a snapshot. Every export step is a chance for the reported figure to diverge from the operational one.",
      },
    ],
    implementation: [
      "Documented how we actually ran delivery, including the undocumented parts",
      "Modelled the domain and its relationships before building any interface",
      "Built lead tracking first, because escaped leads were the measurable cost",
      "Added projects, milestones and tasks",
      "Implemented capacity and allocation with over-commitment surfacing",
      "Migrated historical data, resolving ambiguity explicitly",
      "Added role-based access and the activity log",
      "Currently: deepening reporting and utilisation analysis",
    ],
    integrations: [
      "Supabase",
      "Google Workspace",
      "WhatsApp",
      "Transactional email",
      "REST APIs",
    ],
    results: [
      { label: "Time to answer an allocation question", method: "Minutes from question to answer, baselined against the spreadsheet process" },
      { label: "Leads without an owner", method: "Share of open leads with no assigned owner" },
      { label: "Over-allocation caught before the week starts", method: "Conflicts surfaced in advance versus discovered during delivery" },
      { label: "Reporting preparation time", method: "Hours spent assembling operational reports per month" },
    ],
    lessons: [
      "Model the domain before building screens. Every entity we skipped came back as a schema migration.",
      "Migrating a spreadsheet means resolving its ambiguity, not copying it. The ambiguity is the actual work.",
      "An internal tool that demands data entry without giving something back gets abandoned. Usefulness is a retention feature.",
      "Live dashboards beat exports. Every export is a chance for two numbers to disagree.",
      "Building it ourselves changed how we scope client portals — we now argue for a narrower first module, because that is what worked here.",
    ],
    faqs: [
      {
        q: "Is FoundryPulse available as a product?",
        a: "No. It is internal software shaped around how we specifically work, and that specificity is the reason it fits us. We share the architecture because the pattern transfers; the product would not.",
      },
      {
        q: "Why show your own internal tool as a case study?",
        a: "Because we can be completely open about it. There is no client to protect, so we can describe the design mistakes and the migration difficulties honestly — which is more useful to someone evaluating us than a polished summary would be.",
      },
    ],
    relatedSolutions: ["custom-business-portals", "workflow-automation", "crm-automation"],
    relatedIndustries: ["local-service-businesses", "real-estate"],
  },
];

export const caseStudyBySlug = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

/** True only when a metric has a real, dated figure. Drives the results UI. */
export const hasVerifiedValue = (m: MetricSlot) =>
  Boolean(m.value && m.verifiedOn);
