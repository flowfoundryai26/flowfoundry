/**
 * Solution detail pages. One entry = one indexable page at /solutions/<slug>.
 *
 * Every entry must carry a genuine workflow explanation. These are not thin
 * keyword pages: if an entry cannot describe the manual process it replaces and
 * the steps it runs instead, it does not belong here.
 */

export type Faq = { q: string; a: string };

export type Solution = {
  slug: string;
  /** Nav + card label. */
  name: string;
  /** Page H1. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Hero paragraph. */
  lede: string;
  /** Hero photo, reused from the existing library. */
  image: string;
  /** What the business is dealing with before anything is built. */
  problem: { title: string; body: string; symptoms: string[] };
  /** The manual version of the process, step by step. */
  manualToday: string[];
  /** The automated route. Each step is one hop in the system. */
  automatedFlow: { step: string; detail: string }[];
  /** What we actually build. */
  capabilities: { title: string; body: string }[];
  /** Named integration targets. */
  integrations: string[];
  /** Business outcomes. Never quantified unless verified. */
  benefits: string[];
  /** Where a human stays in the loop. Required — supports the trust positioning. */
  humanOversight: string;
  faqs: Faq[];
  relatedSolutions: string[];
  relatedIndustries: string[];
  relatedCaseStudies: string[];
};

export const SOLUTIONS: Solution[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    h1: "AI voice agents that answer, qualify and book.",
    metaTitle: "AI Voice Agents for Businesses",
    metaDescription:
      "AI voice agents that answer inbound calls, qualify leads, book appointments and sync every conversation to your CRM. Built around your existing phone workflow.",
    eyebrow: "AI Agents",
    lede:
      "A voice agent that picks up when your team cannot, asks the questions a receptionist would ask, and writes the outcome straight into the systems you already use.",
    image: "/images/use-cases/sales.webp",
    problem: {
      title: "Missed calls are missed revenue",
      body:
        "For most service businesses the phone is still the highest-intent channel — and the least reliably answered. Calls arrive while the team is with a customer, after hours, or during a rush. The caller does not leave a voicemail. They call the next business on the list.",
      symptoms: [
        "Calls ring out during busy periods and after hours",
        "Enquiry details live in someone's memory, not the CRM",
        "Callbacks depend on whoever remembers to make them",
        "No record of what a caller actually wanted",
        "Reception time is consumed by routine, repeated questions",
      ],
    },
    manualToday: [
      "Phone rings; whoever is free answers it",
      "Staff member asks for name, requirement and preferred time",
      "Details are written on paper or into a chat message",
      "Someone checks the calendar for availability",
      "A callback is promised and sometimes happens",
      "The CRM is updated later, if at all",
    ],
    automatedFlow: [
      {
        step: "Call arrives",
        detail:
          "Inbound call hits your existing number. The agent answers on a configured rule — after hours, after N rings, or on overflow when the team is engaged.",
      },
      {
        step: "Agent converses",
        detail:
          "The agent greets the caller with your business context, answers questions from a knowledge base you control, and captures the reason for the call.",
      },
      {
        step: "Qualification",
        detail:
          "It asks your qualifying questions in your order — service needed, location, urgency, budget band — and records structured answers rather than a transcript blob.",
      },
      {
        step: "Availability check",
        detail:
          "The agent reads live availability from your calendar instead of guessing, and offers only slots that are genuinely open.",
      },
      {
        step: "Booking or routing",
        detail:
          "A qualified caller is booked directly. Anything outside the agent's remit is routed to a human with the context already gathered.",
      },
      {
        step: "System update",
        detail:
          "A CRM record is created or updated, the calendar event is written, and the assigned owner is notified with the call summary.",
      },
      {
        step: "Follow-up",
        detail:
          "If the call did not reach an outcome, a follow-up sequence is triggered on your rules — SMS, WhatsApp or email.",
      },
    ],
    capabilities: [
      {
        title: "Inbound receptionist",
        body:
          "Answers overflow and after-hours calls with your greeting, your service list and your qualifying questions.",
      },
      {
        title: "Outbound calling",
        body:
          "Works a list of new or ageing leads, confirms interest, and hands warm conversations to your team.",
      },
      {
        title: "Appointment booking",
        body:
          "Reads and writes real calendar availability so a confirmed booking means a confirmed slot.",
      },
      {
        title: "Structured qualification",
        body:
          "Captures named fields your CRM can filter and report on, not just a recording nobody listens to.",
      },
      {
        title: "Custom knowledge",
        body:
          "Answers from a knowledge base you maintain — services, pricing bands, hours, locations, policies.",
      },
      {
        title: "Escalation rules",
        body:
          "Defines exactly when a call must reach a person, and transfers with the context already collected.",
      },
      {
        title: "Conversation records",
        body:
          "Transcript, captured fields, outcome and recording stored against the CRM record for review.",
      },
      {
        title: "Multi-language handling",
        body:
          "Configurable for the languages your customers actually call in.",
      },
    ],
    integrations: [
      "Twilio",
      "HubSpot",
      "Salesforce",
      "Zoho",
      "GoHighLevel",
      "Google Calendar",
      "Microsoft Outlook",
      "Calendly",
      "WhatsApp",
      "Google Sheets",
      "REST APIs",
    ],
    benefits: [
      "Enquiries get a response outside business hours",
      "Every call produces a structured record",
      "Reception time shifts from routine questions to real customers",
      "Qualification questions are asked consistently on every call",
      "Bookings land in the calendar without a coordination round-trip",
      "Follow-up stops depending on memory",
    ],
    humanOversight:
      "You decide what the agent may do on its own. Booking and record-keeping are usually safe to automate; pricing commitments, clinical questions, refunds and escalations are normally routed to a person. The agent transfers with the context already gathered, so the handover is not a restart.",
    faqs: [
      {
        q: "Do we have to change our phone number?",
        a: "No. The agent sits behind your existing number using a telephony provider such as Twilio. You keep the number your customers already have and choose the rule that decides when the agent answers — after hours, after a set number of rings, or when the team is already on a call.",
      },
      {
        q: "Will the caller know they are talking to an AI agent?",
        a: "That is your choice, and we recommend disclosure. A short opening line stating the caller is speaking to an automated assistant sets expectations, reduces confusion, and keeps you on the right side of disclosure norms in most jurisdictions.",
      },
      {
        q: "What happens if the agent cannot handle the call?",
        a: "You define the escalation rules. The agent can transfer to a person, take a callback request, or offer to send details over WhatsApp. In every case the conversation so far is written to the CRM, so whoever picks it up is not starting from nothing.",
      },
      {
        q: "Can it book into the calendar we already use?",
        a: "Yes. The agent reads live availability from Google Calendar, Outlook or Calendly and writes the confirmed event back. It offers only slots that are genuinely free, which is what prevents double bookings.",
      },
      {
        q: "How long does an implementation take?",
        a: "It depends on how many call paths you need and how clean the CRM and calendar integration is. A single inbound path with booking is a short engagement; multi-service routing with outbound campaigns and custom qualification logic takes longer. We scope it in discovery rather than quoting a number before seeing the workflow.",
      },
    ],
    relatedSolutions: ["crm-automation", "whatsapp-automation", "workflow-automation"],
    relatedIndustries: ["dental-clinics", "healthcare-clinics", "real-estate", "local-service-businesses"],
    relatedCaseStudies: ["leadpulz"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    h1: "WhatsApp automation for the channel your customers actually use.",
    metaTitle: "WhatsApp AI Automation",
    metaDescription:
      "WhatsApp automation for Indian businesses: qualify enquiries, send follow-ups, confirm appointments and sync conversations to your CRM without losing the personal channel.",
    eyebrow: "AI Agents",
    lede:
      "In India, WhatsApp is where the enquiry actually lands. We automate the repetitive half of that conversation — qualification, confirmation, reminders and follow-up — without turning it into a phone tree.",
    image: "/images/use-cases/support.webp",
    problem: {
      title: "The enquiry channel nobody can report on",
      body:
        "WhatsApp is usually the fastest way a customer reaches an Indian business, and almost always the least instrumented. Conversations sit on one person's phone. Nothing reaches the CRM. When that person is on leave, the thread stops.",
      symptoms: [
        "Enquiries live on a personal device with no shared visibility",
        "No record of which enquiries were never answered",
        "Follow-ups depend on scrolling back through chats",
        "Two staff members answer the same customer differently",
        "Nothing about the channel appears in any pipeline report",
      ],
    },
    manualToday: [
      "Customer messages the business number",
      "Whoever has the phone reads it, eventually",
      "They answer the same five questions they answered yesterday",
      "Details are retyped into a CRM or a spreadsheet, or lost",
      "A reminder is set mentally and often missed",
      "The thread goes quiet and the enquiry cools",
    ],
    automatedFlow: [
      {
        step: "Message arrives",
        detail:
          "An inbound WhatsApp message hits your business number through the WhatsApp Business API.",
      },
      {
        step: "Intent detection",
        detail:
          "The agent classifies what the message is about — new enquiry, existing customer, support issue, booking change — and routes accordingly.",
      },
      {
        step: "Qualification",
        detail:
          "For a new enquiry it asks your qualifying questions conversationally, one at a time, and stores structured answers.",
      },
      {
        step: "Answer from knowledge",
        detail:
          "Routine questions about services, hours, location or process are answered from a knowledge base you maintain.",
      },
      {
        step: "Action",
        detail:
          "Depending on the outcome the agent books a slot, shares a catalogue or form, raises a ticket, or hands off to a person.",
      },
      {
        step: "CRM sync",
        detail:
          "Contact, conversation summary and captured fields are written to the CRM so the channel finally appears in your pipeline.",
      },
      {
        step: "Scheduled follow-up",
        detail:
          "Template-based follow-ups and reminders go out on your rules, inside WhatsApp's messaging policy.",
      },
    ],
    capabilities: [
      {
        title: "Enquiry qualification",
        body:
          "Conversational capture of the fields your team needs before a human gets involved.",
      },
      {
        title: "Appointment confirmation and reminders",
        body:
          "Confirmations, reminders and reschedule handling using approved message templates.",
      },
      {
        title: "Follow-up sequences",
        body:
          "Structured follow-up for enquiries that went quiet, triggered by CRM stage or elapsed time.",
      },
      {
        title: "Shared team inbox",
        body:
          "Conversations move off a personal phone into a channel the whole team can see and hand over.",
      },
      {
        title: "Human handover",
        body:
          "Clean escalation to a named person, with the conversation history and captured fields attached.",
      },
      {
        title: "Order and status updates",
        body:
          "Automated updates driven by your store, ERP or internal system rather than typed by hand.",
      },
    ],
    integrations: [
      "WhatsApp Business API",
      "HubSpot",
      "Zoho",
      "Salesforce",
      "GoHighLevel",
      "Shopify",
      "Google Sheets",
      "Google Calendar",
      "Supabase",
      "REST APIs",
    ],
    benefits: [
      "Enquiries are answered on the channel customers prefer",
      "The WhatsApp channel becomes reportable in the CRM",
      "Routine questions stop consuming staff attention",
      "Follow-up happens on a rule instead of a memory",
      "Conversations survive a staff member being unavailable",
    ],
    humanOversight:
      "Automation handles qualification, confirmation and status updates. Anything involving a commitment — final pricing, a complaint, a medical or legal question — escalates to a person. We also set a hard rule that a customer who asks for a human gets one.",
    faqs: [
      {
        q: "Does this need the official WhatsApp Business API?",
        a: "For anything automated at business scale, yes. The API is what allows verified sending, approved templates and a shared inbox. Automating a personal or WhatsApp Business app account through unofficial tooling risks the number being banned, which is not a risk worth taking with your primary enquiry channel.",
      },
      {
        q: "Can we still reply manually?",
        a: "Yes, and you should. The automation handles the repetitive portion and steps aside the moment a human joins the thread. Staff keep full ability to take over any conversation at any point.",
      },
      {
        q: "What about WhatsApp's rules on marketing messages?",
        a: "WhatsApp distinguishes between a user-initiated conversation window and business-initiated template messages, and marketing templates need prior approval and opt-in. We build inside those constraints rather than around them, because a banned number costs far more than a blocked campaign.",
      },
      {
        q: "Can it handle more than one language?",
        a: "Yes. The agent can be configured for the languages your customers actually message in, including switching mid-conversation, which is common in Indian business chats.",
      },
    ],
    relatedSolutions: ["ai-voice-agents", "crm-automation", "shopify-automation"],
    relatedIndustries: ["ecommerce", "dental-clinics", "real-estate", "local-service-businesses"],
    relatedCaseStudies: ["leadpulz", "ilovesurprises"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    h1: "Workflow automation that removes the coordination, not the control.",
    metaTitle: "Business Workflow Automation",
    metaDescription:
      "Workflow automation that connects your existing tools, moves data between systems and triggers the right action automatically — without replacing your software stack.",
    eyebrow: "Automation",
    lede:
      "Most operational delay is not work. It is waiting: for a handover, an approval, a copy-paste between two systems. We automate the coordination layer and leave the decisions with your team.",
    image: "/images/use-cases/operations.webp",
    problem: {
      title: "The work between the work",
      body:
        "A process that looks like five steps on a whiteboard is usually twenty in practice, and most of the extra steps are someone moving information from one tool to another. That work is invisible, unreported, and the first thing to break when volume rises.",
      symptoms: [
        "The same data is entered into two or three systems",
        "Work stalls waiting on an approval nobody chased",
        "Handovers happen over chat and get lost",
        "Status questions are answered by asking a person",
        "Onboarding a new team member means teaching undocumented steps",
      ],
    },
    manualToday: [
      "A trigger arrives — a form, an order, an email, a request",
      "Someone notices it, at some point",
      "They copy details into the system of record",
      "They message the next person in the chain",
      "That person acts, then updates a sheet",
      "A status report is assembled by hand at the end of the week",
    ],
    automatedFlow: [
      {
        step: "Trigger",
        detail:
          "A defined event starts the workflow: form submission, new order, stage change, inbound message, scheduled time, or webhook.",
      },
      {
        step: "Validate and enrich",
        detail:
          "Input is checked against your rules and enriched from existing records, so bad data is caught at the entry point.",
      },
      {
        step: "Route on business rules",
        detail:
          "The workflow evaluates your conditions — value, region, service type, ownership — and routes to the right path.",
      },
      {
        step: "Act across systems",
        detail:
          "Records are created and updated in every system that needs them, once, from one source of truth.",
      },
      {
        step: "Human approval where required",
        detail:
          "Steps you flag as needing sign-off pause and wait for a person, with the context they need to decide.",
      },
      {
        step: "Notify",
        detail:
          "The right owner is told on the channel they actually read, with a link to the record rather than a summary to retype.",
      },
      {
        step: "Log",
        detail:
          "Every step writes an audit entry, which is what makes the workflow debuggable and reportable later.",
      },
    ],
    capabilities: [
      {
        title: "Lead routing and assignment",
        body:
          "Route incoming leads by territory, service line, value or round-robin, with escalation when nobody responds.",
      },
      {
        title: "Approval workflows",
        body:
          "Multi-step approvals with delegation, timeouts and a record of who approved what and when.",
      },
      {
        title: "Data synchronisation",
        body:
          "Keep records consistent across CRM, sheets, databases and internal tools without manual re-entry.",
      },
      {
        title: "Customer onboarding",
        body:
          "Sequence the document collection, account setup, welcome messaging and internal tasks a new customer triggers.",
      },
      {
        title: "Notifications and alerts",
        body:
          "Threshold and exception alerts to the channel a team already watches, instead of a dashboard nobody opens.",
      },
      {
        title: "Scheduled operations",
        body:
          "Recurring reconciliation, reporting, cleanup and reminder jobs that currently depend on someone remembering.",
      },
    ],
    integrations: [
      "HubSpot",
      "Salesforce",
      "Zoho",
      "GoHighLevel",
      "Google Workspace",
      "Google Sheets",
      "Slack",
      "WhatsApp",
      "Stripe",
      "Shopify",
      "Supabase",
      "REST APIs",
    ],
    benefits: [
      "Handovers stop depending on someone remembering",
      "Data is entered once and lands everywhere it is needed",
      "Approvals have a timestamp and an owner",
      "Status is visible without asking a person",
      "Process knowledge lives in the system, not in one employee's head",
    ],
    humanOversight:
      "We automate the movement of information and leave judgement with people. Any step that commits money, changes a customer relationship, or is hard to reverse is built as a human approval gate by default, not an autonomous action.",
    faqs: [
      {
        q: "Do we have to replace the tools we already use?",
        a: "No, and we would usually argue against it. The automation layer connects what you already run. Replacing a working CRM is a separate, much larger project, and it is rarely what the actual bottleneck requires.",
      },
      {
        q: "What if our process is not documented?",
        a: "That is the normal starting point. Discovery and workflow mapping exist precisely to write the process down — including the undocumented exceptions people handle by instinct. Those exceptions are usually where the automation earns its value.",
      },
      {
        q: "Where should we start?",
        a: "One workflow, chosen because it has a measurable cost today: the one that causes the most rework, the longest delay, or the most escaped leads. Starting narrow means you get something in production quickly and can judge the approach before committing further.",
      },
      {
        q: "What happens when an automated step fails?",
        a: "Failures are logged, retried where retrying is safe, and escalated to a person when it is not. A workflow that fails silently is worse than a manual process, so error handling is part of the build rather than an afterthought.",
      },
    ],
    relatedSolutions: ["crm-automation", "custom-business-portals", "ai-voice-agents"],
    relatedIndustries: ["local-service-businesses", "real-estate", "ecommerce", "healthcare-clinics"],
    relatedCaseStudies: ["foundrypulse", "ilovesurprises"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "crm-automation",
    name: "CRM Automation",
    h1: "CRM automation that stops leads falling through the cracks.",
    metaTitle: "CRM Automation & Integration",
    metaDescription:
      "CRM automation that captures every lead, assigns an owner, enforces follow-up and keeps your pipeline accurate — on HubSpot, Zoho, Salesforce or GoHighLevel.",
    eyebrow: "Automation",
    lede:
      "Most CRMs do not fail because of the software. They fail because updating them is manual work nobody is rewarded for. We automate the record-keeping so the pipeline reflects reality.",
    image: "/images/mission.webp",
    problem: {
      title: "A CRM the team works around",
      body:
        "When the CRM is a reporting obligation rather than a working tool, data entry slips. Stages go stale, owners are unclear, and the forecast becomes a guess. The fix is rarely more training — it is removing the manual entry that made the CRM unreliable in the first place.",
      symptoms: [
        "Leads arrive in channels the CRM never sees",
        "Deal stages are updated in a rush before a review",
        "Nobody is certain who owns a given lead",
        "Follow-up depends on individual discipline",
        "Duplicate contacts accumulate across sources",
      ],
    },
    manualToday: [
      "A lead arrives by form, call, WhatsApp or referral",
      "Someone eventually types it into the CRM, or does not",
      "Assignment is decided in a chat message",
      "The first follow-up happens when the rep has time",
      "Stage changes are entered from memory later",
      "Reporting is reconciled by hand before each review",
    ],
    automatedFlow: [
      {
        step: "Capture from every source",
        detail:
          "Website forms, phone calls, WhatsApp, email and ad platforms all write into the CRM through one normalised path.",
      },
      {
        step: "Deduplicate",
        detail:
          "Incoming contacts are matched against existing records on phone and email before a new one is created.",
      },
      {
        step: "Score and qualify",
        detail:
          "Your criteria — service, budget band, region, urgency, source — are applied consistently to every lead.",
      },
      {
        step: "Assign an owner",
        detail:
          "Ownership is set by rule, with a named fallback, so no lead sits unassigned.",
      },
      {
        step: "Enforce first response",
        detail:
          "A response clock starts on creation. If nothing happens inside your window, it escalates.",
      },
      {
        step: "Sequence follow-up",
        detail:
          "Multi-step follow-up runs on stage and elapsed time, and stops the moment the prospect replies.",
      },
      {
        step: "Keep stages honest",
        detail:
          "Stage changes are driven by real events — a booking made, a proposal sent, a payment received — not by manual recall.",
      },
    ],
    capabilities: [
      {
        title: "Multi-channel lead capture",
        body:
          "One normalised intake path from forms, calls, WhatsApp, email and ad platforms into the CRM.",
      },
      {
        title: "Deduplication and data hygiene",
        body:
          "Match-before-create logic, field normalisation and scheduled cleanup jobs.",
      },
      {
        title: "Assignment and escalation",
        body:
          "Rule-based ownership with response-time SLAs and automatic escalation when they are missed.",
      },
      {
        title: "Follow-up sequences",
        body:
          "Stage-aware sequences across email, WhatsApp and SMS that halt on a genuine reply.",
      },
      {
        title: "Pipeline accuracy",
        body:
          "Stage transitions triggered by system events, so the pipeline is a record rather than an estimate.",
      },
      {
        title: "Reporting foundations",
        body:
          "Consistent source, stage and outcome fields — the prerequisite for any report worth reading.",
      },
    ],
    integrations: [
      "HubSpot",
      "Salesforce",
      "Zoho",
      "GoHighLevel",
      "Google Calendar",
      "WhatsApp",
      "Twilio",
      "Google Sheets",
      "Stripe",
      "REST APIs",
    ],
    benefits: [
      "Every lead has a record, an owner and a response clock",
      "First response stops depending on who is free",
      "Duplicate and malformed records are caught at entry",
      "Follow-up continues when a rep is on leave",
      "Pipeline reporting reflects what actually happened",
    ],
    humanOversight:
      "Automation handles capture, assignment, reminders and record-keeping. The sales conversation stays human. We do not auto-send anything that reads as a commitment or a quote without a person approving it.",
    faqs: [
      {
        q: "Which CRMs do you work with?",
        a: "Most commonly HubSpot, Zoho, Salesforce and GoHighLevel. Anything with a documented API is workable. If you are on spreadsheets today, we can automate around those first and migrate later — starting with a CRM purchase is often the wrong order.",
      },
      {
        q: "Will this fix our existing bad data?",
        a: "Partly. We can deduplicate, normalise fields and flag records that cannot be resolved automatically. Genuinely ambiguous records still need a human decision, so we surface them in a review queue rather than guessing and making the data worse.",
      },
      {
        q: "Can automation send follow-ups on a rep's behalf?",
        a: "It can, and we would keep that narrow. Reminders, confirmations and status updates automate cleanly. Anything that reads as a personal sales message is better drafted automatically and sent by the rep, because a prospect who realises they are in a sequence disengages.",
      },
      {
        q: "How do we know it is working?",
        a: "We instrument the specific numbers the workflow was built to change — time to first response, percentage of leads with an owner, follow-ups completed on schedule, stage-change latency. Those are measured from your own data, not asserted by us.",
      },
    ],
    relatedSolutions: ["workflow-automation", "ai-voice-agents", "whatsapp-automation"],
    relatedIndustries: ["real-estate", "dental-clinics", "local-service-businesses", "healthcare-clinics"],
    relatedCaseStudies: ["leadpulz", "foundrypulse"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "custom-business-portals",
    name: "Custom Business Portals",
    h1: "Custom portals for the process no product quite fits.",
    metaTitle: "Custom Business Software & Portals",
    metaDescription:
      "Custom business portals, operations dashboards and internal tools built around your actual workflow — replacing the spreadsheet stack your team works around.",
    eyebrow: "Custom Software",
    lede:
      "Every business has one process that no off-the-shelf product handles, so it lives in a spreadsheet with six tabs and one person who understands it. That is what a portal is for.",
    image: "/images/use-cases/custom.webp",
    problem: {
      title: "The spreadsheet that became a system",
      body:
        "It started as a tracker. Now it holds pricing logic, assignments, commissions and history, three people edit it simultaneously, and nobody can change the formulas without breaking something. It is load-bearing infrastructure with no access control and no audit trail.",
      symptoms: [
        "A critical spreadsheet only one person fully understands",
        "No record of who changed what, or when",
        "Everyone sees everything because there are no permissions",
        "The same figure is reported differently by two teams",
        "Adding a step means adding another tab",
      ],
    },
    manualToday: [
      "Data is entered into a shared sheet by several people",
      "Formulas encode business rules nobody has documented",
      "Status is communicated by colour-coding cells",
      "Reports are produced by copying ranges into a deck",
      "Access is all-or-nothing",
      "Errors are found downstream, if at all",
    ],
    automatedFlow: [
      {
        step: "Model the domain",
        detail:
          "Define the real entities — client, project, allocation, task, payout — and the relationships between them, instead of inferring them from columns.",
      },
      {
        step: "Encode the rules",
        detail:
          "Pricing, commission, eligibility and approval logic move from spreadsheet formulas into tested application code.",
      },
      {
        step: "Role-based access",
        detail:
          "Each role sees and edits only what it should. Admin, manager, team member and external partner are genuinely separated.",
      },
      {
        step: "Workflow and state",
        detail:
          "Records move through defined states with the transitions each role is permitted to make.",
      },
      {
        step: "Integrate",
        detail:
          "The portal reads from and writes to the CRM, accounting, payment and messaging systems you already run.",
      },
      {
        step: "Report",
        detail:
          "Dashboards read live data, so an operational figure and a reported figure are the same number.",
      },
      {
        step: "Audit",
        detail:
          "Every meaningful change is logged with actor and timestamp, which is what makes the system trustworthy for money-adjacent processes.",
      },
    ],
    capabilities: [
      {
        title: "Operations dashboards",
        body:
          "Live views of pipeline, workload, delivery status and exceptions for the people who act on them.",
      },
      {
        title: "Client and partner portals",
        body:
          "Scoped external access so customers or partners self-serve status, documents and requests.",
      },
      {
        title: "Project and task management",
        body:
          "Projects, milestones, tasks and dependencies modelled the way your delivery actually runs.",
      },
      {
        title: "Team allocation",
        body:
          "Capacity and assignment tracking that shows who is over-committed before it becomes a delivery problem.",
      },
      {
        title: "Lead management",
        body:
          "A working queue with ownership, stages, activity history and reporting.",
      },
      {
        title: "Commission and payout engines",
        body:
          "Multi-level commission calculation with an auditable trail from transaction to payout.",
      },
      {
        title: "Document workflows",
        body:
          "Structured collection, versioning and approval of the documents a process depends on.",
      },
      {
        title: "Role-based administration",
        body:
          "Granular permissions, user management and an activity log across every module.",
      },
    ],
    integrations: [
      "Supabase",
      "Google Workspace",
      "HubSpot",
      "Zoho",
      "Stripe",
      "Shopify",
      "WhatsApp",
      "Google Sheets",
      "REST APIs",
    ],
    benefits: [
      "Business rules live in tested code, not in undocumented formulas",
      "Access reflects role rather than being all-or-nothing",
      "Operational and reported numbers come from one source",
      "Money-adjacent processes gain an audit trail",
      "Process knowledge survives an individual leaving",
    ],
    humanOversight:
      "A portal makes authority explicit rather than removing it. Approvals, overrides and exception handling are first-class features, and every one of them is attributed and logged.",
    faqs: [
      {
        q: "Why build instead of buying a product?",
        a: "Buy whenever a product fits — it is cheaper and better supported. Building is the right call when the process is genuinely specific to how you operate, when you are paying for ten products to cover one workflow, or when the workaround has become the risk. We will say so if an off-the-shelf tool would serve you better.",
      },
      {
        q: "What happens to the data in our spreadsheets?",
        a: "It gets migrated. Extracting it is usually the straightforward part; the real work is deciding what the ambiguous rows actually meant. We handle that during discovery rather than importing the ambiguity into a new system.",
      },
      {
        q: "Can we start with one module?",
        a: "Yes, and that is the pattern we recommend. Model the domain properly up front, then ship the module with the clearest pain first. It reaches production sooner and the remaining scope gets defined by real usage.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Ownership, repository access and deployment details are settled in writing at the start of the engagement, not negotiated at the end of it.",
      },
    ],
    relatedSolutions: ["workflow-automation", "crm-automation", "shopify-automation"],
    relatedIndustries: ["real-estate", "ecommerce", "local-service-businesses", "healthcare-clinics"],
    relatedCaseStudies: ["foundrypulse", "talkbridge", "ilovesurprises"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "shopify-automation",
    name: "Shopify Automation",
    h1: "Shopify automation beyond the checkout.",
    metaTitle: "Shopify Automation & Integrations",
    metaDescription:
      "Shopify automation and integrations: order workflows, customer messaging, affiliate and referral tracking, and syncing your store with the systems behind it.",
    eyebrow: "Integrations",
    lede:
      "Shopify handles the storefront well. The work that follows an order — messaging, fulfilment coordination, attribution, commissions, support — is usually still manual.",
    image: "/images/use-cases/ecommerce.webp",
    problem: {
      title: "Everything after the order is still manual",
      body:
        "The store converts. Then someone exports a CSV, updates a courier sheet, messages the customer, calculates an affiliate commission by hand, and answers the same delivery question for the twentieth time. Volume growth turns all of that into a hiring decision.",
      symptoms: [
        "Order data is moved between systems by CSV export",
        "Customers chase status updates over WhatsApp",
        "Affiliate and referral commissions are calculated manually",
        "Support answers the same delivery questions repeatedly",
        "Inventory and pricing are reconciled by hand across channels",
      ],
    },
    manualToday: [
      "An order is placed on the store",
      "Someone exports or re-keys it into the fulfilment process",
      "The customer is messaged manually, or not at all",
      "Delivery questions arrive on WhatsApp and are answered one by one",
      "Referral attribution is reconstructed from memory at month end",
      "Commissions are calculated in a spreadsheet",
    ],
    automatedFlow: [
      {
        step: "Order webhook",
        detail:
          "Shopify emits the order event and the workflow picks it up immediately — no export, no polling delay.",
      },
      {
        step: "Attribute",
        detail:
          "The referral, affiliate or campaign responsible is resolved and stored against the order at the moment it is created.",
      },
      {
        step: "Notify the customer",
        detail:
          "Confirmation and shipping updates go out on WhatsApp or email using approved templates.",
      },
      {
        step: "Coordinate fulfilment",
        detail:
          "Internal tasks, courier records and inventory adjustments are created from the order data itself.",
      },
      {
        step: "Calculate commission",
        detail:
          "Multi-level commission is computed against the order and written to an auditable ledger.",
      },
      {
        step: "Handle enquiries",
        detail:
          "An agent answers status and policy questions from live order data instead of routing them to a person.",
      },
      {
        step: "Reconcile",
        detail:
          "Scheduled jobs check store, ledger and payout figures against each other and flag the differences.",
      },
    ],
    capabilities: [
      {
        title: "Order workflow automation",
        body:
          "Webhook-driven fulfilment tasks, inventory adjustments and internal notifications.",
      },
      {
        title: "Customer messaging",
        body:
          "Order, shipping and delivery updates on WhatsApp and email, triggered by real store events.",
      },
      {
        title: "Affiliate and referral systems",
        body:
          "Attribution capture, multi-level commission calculation, partner dashboards and payout ledgers.",
      },
      {
        title: "Support automation",
        body:
          "An agent that answers status, returns and policy questions from live order data.",
      },
      {
        title: "Abandoned-cart recovery",
        body:
          "Recovery sequences on the channel the customer actually reads, within platform policy.",
      },
      {
        title: "Back-office integration",
        body:
          "Store data connected to accounting, CRM, internal portals and reporting.",
      },
    ],
    integrations: [
      "Shopify",
      "WooCommerce",
      "WhatsApp",
      "Stripe",
      "Google Sheets",
      "Supabase",
      "HubSpot",
      "Zoho",
      "Slack",
      "REST APIs",
    ],
    benefits: [
      "Post-order work stops scaling with order volume",
      "Customers get status updates without asking",
      "Referral attribution is captured at the point of sale",
      "Commission calculation becomes auditable rather than manual",
      "Support handles exceptions instead of routine questions",
    ],
    humanOversight:
      "Payouts, refunds and cancellations are built as approval steps, not autonomous actions. The system calculates and presents; a person authorises anything that moves money.",
    faqs: [
      {
        q: "Is this a Shopify app?",
        a: "Usually not. Most of this is built as a service that talks to Shopify's Admin API and webhooks, which keeps your logic under your control and avoids app-store constraints. If distribution to other merchants is the goal, a proper app is the right shape and we would build it that way.",
      },
      {
        q: "Can you build multi-level affiliate commissions?",
        a: "Yes — it is one of the things we are building on iLoveSurprises. The difficult part is not the percentage maths, it is attribution rules, self-referral prevention, clawbacks on returns, and keeping a ledger that reconciles. That is where the design effort goes.",
      },
      {
        q: "Will this work with WooCommerce instead?",
        a: "Yes. The pattern is the same — webhook in, business logic, action out. The store platform is an integration target rather than the architecture.",
      },
      {
        q: "What about existing Shopify apps we already pay for?",
        a: "We work alongside them. If an app already does a job well there is no reason to rebuild it. Custom work is worth it where apps cannot reach: logic specific to your business, or integration between systems that have no shared connector.",
      },
    ],
    relatedSolutions: ["whatsapp-automation", "workflow-automation", "custom-business-portals"],
    relatedIndustries: ["ecommerce", "local-service-businesses"],
    relatedCaseStudies: ["ilovesurprises"],
  },
];

export const solutionBySlug = (slug: string) =>
  SOLUTIONS.find((s) => s.slug === slug);

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug);
