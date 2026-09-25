/**
 * Industry pages at /industries/<slug>.
 *
 * These exist to explain a specific operational workflow, not to spray a
 * location or vertical keyword across a template. Five substantial pages,
 * each describing the manual process that vertical actually runs today.
 */

import type { Faq } from "./solutions";

export type Industry = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  lede: string;
  image: string;
  /** The operational problem, stated in the vertical's own terms. */
  problem: { title: string; body: string };
  /** The workflow as it runs manually today. */
  manualWorkflow: { step: string; detail: string }[];
  /** What we recommend building, and why. */
  recommendation: { title: string; body: string };
  /** A concrete automation example for this vertical. */
  exampleAutomation: { title: string; trigger: string; steps: string[] };
  /** A concrete AI agent conversation flow. */
  exampleAgentFlow: { title: string; turns: { who: string; line: string }[] };
  integrations: string[];
  benefits: string[];
  /** Vertical-specific constraints we design around. Honest, not alarmist. */
  considerations: string[];
  faqs: Faq[];
  relatedSolutions: string[];
  relatedCaseStudies: string[];
};

export const INDUSTRIES: Industry[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-clinics",
    name: "Dental Clinics",
    h1: "Automation for dental clinics that never stops answering the phone.",
    metaTitle: "AI Automation for Dental Clinics",
    metaDescription:
      "AI voice and WhatsApp automation for dental clinics: answer enquiry calls, book appointments, send reminders and cut no-shows without adding front-desk staff.",
    eyebrow: "Healthcare",
    lede:
      "A dental practice loses enquiries for one structural reason: the person who answers the phone is also the person assisting in the chair.",
    image: "/images/use-cases/services.webp",
    problem: {
      title: "The front desk cannot be in two places",
      body:
        "Between chairside assistance, payments, insurance paperwork and walk-ins, the phone is the first thing to go unanswered. A new-patient enquiry that rings out does not call back — dental demand is local and comparison-shopped, so the next clinic in the search results gets the appointment. Meanwhile the reminder calls that prevent no-shows are the easiest task to skip when the day is busy, which is exactly when the schedule can least afford a gap.",
    },
    manualWorkflow: [
      { step: "Call arrives", detail: "Often while the coordinator is chairside or mid-payment." },
      { step: "Caller waits or rings out", detail: "No voicemail left; the enquiry is simply gone with no record it existed." },
      { step: "Manual triage", detail: "New patient or existing? Routine or emergency? Which treatment? Asked ad hoc and inconsistently." },
      { step: "Calendar lookup", detail: "Coordinator checks practice-management software for a slot matching the treatment duration." },
      { step: "Booking", detail: "Appointment entered manually; patient details re-keyed." },
      { step: "Reminders", detail: "Called or messaged individually the day before, when someone has time." },
      { step: "Recalls", detail: "Six-month checkup recalls tracked on a list that gradually goes stale." },
    ],
    recommendation: {
      title: "Start with the enquiry call, then the reminder loop",
      body:
        "Two workflows carry almost all of the value. First, an AI voice agent that answers overflow and after-hours calls, triages the enquiry, and books routine appointments against real availability. Second, an automated reminder and recall loop over WhatsApp, which is where patients actually read messages. Neither requires replacing your practice-management software, and both are measurable within weeks: answered-call rate and no-show rate.",
    },
    exampleAutomation: {
      title: "Reminder and no-show recovery loop",
      trigger: "An appointment is booked in the practice calendar",
      steps: [
        "Immediate WhatsApp confirmation with date, time, clinician and location",
        "Reminder 48 hours before, with one-tap confirm or reschedule",
        "Reminder on the morning of the appointment",
        "If the patient reschedules, the freed slot is flagged to the front desk",
        "The freed slot is offered to the waitlist in booking order",
        "If the patient does not attend, a recovery message goes out the same day",
        "No-show is written to the patient record so the pattern is visible",
      ],
    },
    exampleAgentFlow: {
      title: "New-patient enquiry, received at 8:40pm",
      turns: [
        { who: "Agent", line: "Good evening, you've reached Riverside Dental. I'm an automated assistant — I can book appointments or answer questions, and I can take a callback request for anything clinical. How can I help?" },
        { who: "Caller", line: "I chipped a tooth this evening. Can someone see me?" },
        { who: "Agent", line: "I'm sorry to hear that. Is there significant pain or bleeding right now?" },
        { who: "Caller", line: "It aches but it's not bleeding." },
        { who: "Agent", line: "Understood. I can hold the first emergency assessment slot tomorrow morning. Dr. Vasudha has 9:15am, or there's 11:40am. Which suits you better?" },
        { who: "Caller", line: "9:15 works." },
        { who: "Agent", line: "Booked for 9:15am. Can I take your name and a mobile number for the confirmation?" },
        { who: "Caller", line: "Meera Krishnan, 98450 11276." },
        { who: "Agent", line: "Thank you. You'll get a WhatsApp confirmation in a moment. If the pain worsens overnight, please call the number in that message and it will reach the on-call clinician directly." },
      ],
    },
    integrations: [
      "Google Calendar",
      "Microsoft Outlook",
      "WhatsApp",
      "Twilio",
      "Zoho",
      "HubSpot",
      "Google Sheets",
      "Practice-management software with an API",
    ],
    benefits: [
      "After-hours and overflow enquiries get answered",
      "Every enquiry leaves a record, including the ones that do not book",
      "Reminders go out on a schedule rather than when there is time",
      "Cancelled slots get offered to the waitlist the same day",
      "Front-desk attention returns to the patients physically present",
      "Recall lists stay current instead of decaying",
    ],
    considerations: [
      "Clinical questions are never answered by the agent. They are routed to a clinician or a callback.",
      "Patient health information is treated as sensitive: minimal data capture, access controls, and no clinical detail in automated messages.",
      "Triage is limited to urgency routing, which is a scheduling decision, not a diagnosis.",
      "Disclosure that the caller is speaking to an automated assistant is built into the opening line.",
    ],
    faqs: [
      {
        q: "Can the agent handle a dental emergency correctly?",
        a: "It handles the scheduling side of one. It can recognise urgency signals, prioritise an emergency assessment slot, and escalate to an on-call clinician. It does not give clinical advice — the boundary is deliberate and configured explicitly, not left to the model's judgement.",
      },
      {
        q: "Will this work with our practice-management software?",
        a: "If it exposes an API or supports calendar sync, yes. Where a system is genuinely closed, we run the booking layer against a synced calendar and write back through whatever import path exists. We confirm this in discovery before scoping, because it materially changes the build.",
      },
      {
        q: "What about patient data and privacy?",
        a: "We capture the minimum needed to book — name, contact number, treatment type, urgency — and nothing clinical. Access is role-based, data is stored in systems you control, and automated messages never include treatment detail that would be a problem if the phone were seen by someone else.",
      },
      {
        q: "How do we measure whether it worked?",
        a: "Two numbers you already have: the proportion of inbound calls that get answered, and your no-show rate. Both are baselined before launch so the comparison is against your own data rather than an industry claim.",
      },
    ],
    relatedSolutions: ["ai-voice-agents", "whatsapp-automation", "crm-automation"],
    relatedCaseStudies: ["leadpulz"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "healthcare-clinics",
    name: "Healthcare Clinics",
    h1: "Automation for clinics with more enquiries than front-desk hours.",
    metaTitle: "AI Automation for Healthcare Clinics",
    metaDescription:
      "Appointment booking, enquiry handling and reminder automation for multi-speciality clinics — built around your existing scheduling system and escalation rules.",
    eyebrow: "Healthcare",
    lede:
      "Multi-speciality clinics have a routing problem before they have a volume problem. The caller does not know which department they need, and the front desk becomes a switchboard.",
    image: "/images/use-cases/support.webp",
    problem: {
      title: "Routing consumes the front desk",
      body:
        "A caller describes a symptom and expects to be told which consultant to see. That conversation is repeated dozens of times a day, it requires knowing every consultant's schedule and speciality, and it happens while patients queue at the counter. Add insurance queries, report collection and follow-up scheduling, and the desk is saturated with work that is procedural rather than clinical.",
    },
    manualWorkflow: [
      { step: "Enquiry arrives", detail: "By phone, WhatsApp or in person, often describing a symptom rather than a department." },
      { step: "Manual routing", detail: "Staff map the description to a speciality using their own knowledge." },
      { step: "Consultant availability", detail: "Checked across several individual schedules." },
      { step: "Booking", detail: "Entered into the scheduling system; patient details re-keyed." },
      { step: "Pre-visit instructions", detail: "Fasting, documents or prior reports communicated verbally and often forgotten." },
      { step: "Reminders", detail: "Handled inconsistently depending on the day's load." },
      { step: "Follow-up scheduling", detail: "Depends on the patient remembering to call back." },
    ],
    recommendation: {
      title: "Automate routing and pre-visit instructions first",
      body:
        "The highest-value workflow is not booking — it is the triage conversation that precedes it. An agent that maps described needs to the right department using rules you define, checks that consultant's live availability, books, and then sends the correct pre-visit instructions for that appointment type removes the bulk of repetitive desk work. Pre-visit instructions in particular are worth automating because a patient who arrives unprepared costs a slot.",
    },
    exampleAutomation: {
      title: "Appointment-type-aware pre-visit sequence",
      trigger: "An appointment is booked with a department and appointment type",
      steps: [
        "Look up the instruction set for that appointment type",
        "Send confirmation with consultant, department, date, time and location",
        "Send preparation instructions specific to the appointment type",
        "Send a document checklist — ID, insurance, prior reports, referral",
        "Reminder 24 hours before with a confirm or reschedule option",
        "If unconfirmed, escalate to the front desk for a call",
        "After the visit, trigger the follow-up booking prompt on the consultant's protocol",
      ],
    },
    exampleAgentFlow: {
      title: "Symptom-to-department routing",
      turns: [
        { who: "Agent", line: "Thank you for calling Anjaneya Multi-Speciality. This is an automated assistant — I can help with appointments and directions, and I'll connect you to a person for anything clinical. What do you need?" },
        { who: "Caller", line: "I need to see someone about persistent knee pain." },
        { who: "Agent", line: "I can book you with Orthopaedics. Has this been assessed here before, or is this a first visit?" },
        { who: "Caller", line: "First visit." },
        { who: "Agent", line: "Dr. Raghunath has Thursday 10:30am, or Dr. Preetha has Friday 4:00pm. Either works for a first orthopaedic consultation." },
        { who: "Caller", line: "Thursday, please." },
        { who: "Agent", line: "Booked. You'll receive a WhatsApp message with the consultant, the time, and what to bring — including any previous X-rays if you have them. Shall I also note your preferred language for the consultation?" },
      ],
    },
    integrations: [
      "Google Calendar",
      "Microsoft Outlook",
      "WhatsApp",
      "Twilio",
      "Zoho",
      "Google Sheets",
      "Supabase",
      "Hospital scheduling systems with an API",
    ],
    benefits: [
      "Routing happens on defined rules rather than individual knowledge",
      "Pre-visit instructions are always sent and always correct for the appointment type",
      "Fewer wasted slots from unprepared arrivals",
      "Front-desk time returns to patients at the counter",
      "Follow-up scheduling stops relying on patient recall",
    ],
    considerations: [
      "The agent routes to a department; it does not assess, diagnose or advise.",
      "Escalation to a human is immediate on any clinical question or on request.",
      "Data capture is minimised to scheduling fields; clinical records stay in your systems.",
      "Automated messages avoid clinical detail so a shared phone does not become a privacy problem.",
      "Emergency intent is routed straight to a person, never queued behind automation.",
    ],
    faqs: [
      {
        q: "Is it safe to let automation near patient scheduling?",
        a: "Scheduling, yes — with strict boundaries. The agent selects a department and a slot using rules you write, and hands anything clinical to a person. We treat the scope as a whitelist rather than a filter: the agent can only do what it is explicitly allowed to do.",
      },
      {
        q: "What happens with an emergency call?",
        a: "Emergency intent is a first-class rule, not an edge case. Detected urgency bypasses the entire booking flow and connects to a person or your emergency number immediately. This path is tested explicitly before launch.",
      },
      {
        q: "Can it handle multiple languages?",
        a: "Yes, and in Indian clinics it usually needs to. The agent can be configured per language and can handle switching mid-conversation, which is normal in practice.",
      },
      {
        q: "Do we need to change our scheduling system?",
        a: "Generally no. We integrate with what you run. If the system is closed, the booking layer works against a synced calendar with a defined write-back path. Either way it is verified in discovery, not assumed.",
      },
    ],
    relatedSolutions: ["ai-voice-agents", "whatsapp-automation", "workflow-automation"],
    relatedCaseStudies: ["leadpulz"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "real-estate",
    name: "Real Estate",
    h1: "Real estate automation for the first five minutes that decide the deal.",
    metaTitle: "AI Automation for Real Estate",
    metaDescription:
      "Automate property enquiry response, lead qualification, site-visit scheduling and follow-up so high-intent buyers reach an agent while they are still interested.",
    eyebrow: "Real Estate",
    lede:
      "Property enquiries are won on response time. A buyer who fills three portal forms in an evening speaks to whoever calls back first.",
    image: "/images/use-cases/sales.webp",
    problem: {
      title: "High lead volume, thin qualification, slow first response",
      body:
        "Leads arrive from portals, ad campaigns, WhatsApp and walk-ins, and most are unqualified — wrong budget, wrong location, wrong timeline, or simply browsing. Agents spend their day filtering rather than selling, and because filtering is slow, the genuinely serious buyer waits alongside everyone else. By the time someone calls, a competitor has already booked the site visit.",
    },
    manualWorkflow: [
      { step: "Lead arrives", detail: "From a portal, ad form, WhatsApp or a walk-in, into different inboxes." },
      { step: "Manual collation", detail: "Someone consolidates sources into a sheet or CRM, usually in a daily batch." },
      { step: "Assignment", detail: "Distributed to agents over chat, with no ownership record." },
      { step: "First call", detail: "Happens when the agent gets to it — often hours or days later." },
      { step: "Qualification", detail: "Budget, location, configuration, timeline and finance asked inconsistently." },
      { step: "Site visit", detail: "Coordinated over several messages between agent and buyer." },
      { step: "Follow-up", detail: "Depends entirely on individual discipline; most leads simply go cold." },
    ],
    recommendation: {
      title: "Qualify instantly, route the serious ones, nurture the rest",
      body:
        "Automate the first touch so it happens in minutes rather than hours: capture from every source into one pipeline, qualify against budget, location, configuration and timeline, then route only genuinely matched leads to an agent with the answers already attached. Everything unqualified goes into a long-run nurture sequence rather than being discarded, because property timelines are long and a buyer who is six months out is still a buyer.",
    },
    exampleAutomation: {
      title: "Multi-source capture with instant qualification",
      trigger: "A lead arrives from any portal, ad form, website or WhatsApp",
      steps: [
        "Normalise the lead into one schema and deduplicate on phone number",
        "Enrich with the source, campaign and the specific property enquired about",
        "Trigger qualification over WhatsApp or an AI call within minutes",
        "Capture budget band, preferred location, configuration, timeline and finance status",
        "Score against active inventory and assign an owner by territory",
        "Matched leads: notify the agent instantly with the full qualification summary",
        "Unmatched leads: enter a long-cycle nurture sequence with new inventory alerts",
        "No agent contact within the response window escalates to the sales manager",
      ],
    },
    exampleAgentFlow: {
      title: "Portal enquiry qualified over WhatsApp, four minutes after submission",
      turns: [
        { who: "Agent", line: "Hi Aravind — thanks for your enquiry about Sattva Greenscape. This is Anika, an automated assistant from the sales desk. A few quick questions so I connect you with the right person. Which configuration are you looking at?" },
        { who: "Buyer", line: "3BHK ideally." },
        { who: "Agent", line: "Got it. Is your budget broadly within 1.4 to 1.8 crore for that configuration?" },
        { who: "Buyer", line: "Up to about 1.6." },
        { who: "Agent", line: "That works for two of the available units. Are you looking to buy within the next three months, or planning further ahead?" },
        { who: "Buyer", line: "Next two months, we've already got a loan pre-approval." },
        { who: "Agent", line: "That's helpful. Ravi from the sales team handles this project and I'm passing him your details now — he'll call within the hour. Would Saturday morning suit you for a site visit? I can hold 11am." },
        { who: "Buyer", line: "Saturday 11 is fine." },
        { who: "Agent", line: "Held. Ravi will confirm on his call and send the location and the documents to bring." },
      ],
    },
    integrations: [
      "HubSpot",
      "Zoho",
      "Salesforce",
      "GoHighLevel",
      "WhatsApp",
      "Twilio",
      "Google Calendar",
      "Google Sheets",
      "Property portal lead APIs",
      "Meta and Google ad lead forms",
    ],
    benefits: [
      "First response measured in minutes rather than hours",
      "Agents receive qualified leads with the answers already gathered",
      "Every lead source lands in one pipeline with one schema",
      "Unqualified leads are nurtured rather than discarded",
      "Site visits are booked inside the first conversation",
      "Unworked leads escalate instead of quietly ageing",
    ],
    considerations: [
      "Price, availability and possession dates are quoted only from a source you maintain, never generated.",
      "Negotiation and commitments stay with a licensed agent.",
      "Qualification questions are worded to inform, not to pressure.",
      "Opt-out is honoured immediately across every channel.",
    ],
    faqs: [
      {
        q: "Will buyers object to an automated first contact?",
        a: "In our experience the response speed matters more than the channel, provided two things hold: the automation identifies itself, and it hands to a human quickly once intent is clear. What buyers object to is a slow callback or being asked the same questions three times.",
      },
      {
        q: "Can this pull leads from portals like 99acres or Housing?",
        a: "Where the portal offers a lead API or webhook, yes, directly. Where it does not, we capture from the notification email or an export, which is slower but still removes the manual collation step. The specific portals you use get checked during discovery.",
      },
      {
        q: "How do you stop the agent quoting the wrong price?",
        a: "It only reads from an inventory source you maintain, and it is constrained to stating ranges and availability rather than negotiating. Anything outside that list is routed to a person instead of being answered.",
      },
      {
        q: "What about leads that are not ready to buy?",
        a: "They go into a long-cycle nurture track with inventory and price updates, not a discard pile. Property cycles run in months, so a buyer who is six months out is worth staying in front of — and automation is the only economical way to do that at volume.",
      },
    ],
    relatedSolutions: ["crm-automation", "whatsapp-automation", "ai-voice-agents"],
    relatedCaseStudies: ["leadpulz", "foundrypulse"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ecommerce",
    name: "eCommerce",
    h1: "eCommerce automation for everything that happens after checkout.",
    metaTitle: "AI Automation for eCommerce",
    metaDescription:
      "Automate order updates, customer support, affiliate commissions and back-office workflows for Shopify and WooCommerce stores without adding headcount.",
    eyebrow: "eCommerce",
    lede:
      "The storefront is the solved part. The cost of growth sits in order updates, delivery questions, returns and commission maths.",
    image: "/images/use-cases/ecommerce.webp",
    problem: {
      title: "Post-order operations scale linearly with orders",
      body:
        "Double the orders and you double the delivery questions, the courier coordination, the return requests and the affiliate reconciliation. None of that work is differentiated, none of it is visible in the store analytics, and all of it currently resolves to a person on WhatsApp. That is why a growing store's first instinct is to hire, when the actual constraint is that the work was never automated.",
    },
    manualWorkflow: [
      { step: "Order placed", detail: "Store records it; downstream systems do not know yet." },
      { step: "Manual export", detail: "Order details moved to fulfilment by CSV or re-typing." },
      { step: "Customer messaging", detail: "Confirmation and dispatch updates sent by hand, or not at all." },
      { step: "Delivery questions", detail: "Answered one at a time by checking the courier site." },
      { step: "Returns", detail: "Negotiated over chat with no consistent policy application." },
      { step: "Affiliate attribution", detail: "Reconstructed at month end from memory and links." },
      { step: "Commission payout", detail: "Calculated in a spreadsheet and manually verified." },
    ],
    recommendation: {
      title: "Start with order messaging and status enquiries",
      body:
        "Order and shipping notifications, plus an agent that answers status questions from live order data, remove the largest single block of repetitive work and are measurable immediately in support volume. Once that is running, the affiliate and commission layer is the next highest-value piece for stores with a partner programme, because manual commission maths does not just cost time — it erodes partner trust when it is wrong.",
    },
    exampleAutomation: {
      title: "Order lifecycle messaging with attribution",
      trigger: "Shopify emits an order-created webhook",
      steps: [
        "Resolve and store the referral or affiliate attribution on the order",
        "Send an order confirmation on WhatsApp with items and expected timeline",
        "Create the internal fulfilment task and adjust inventory",
        "On dispatch, send tracking details and a delivery window",
        "Answer inbound status questions from live order data, without human involvement",
        "On delivery, request a review and trigger the replenishment sequence for consumables",
        "Compute affiliate commission and write it to the payout ledger",
        "On a return, reverse the commission and update the ledger",
      ],
    },
    exampleAgentFlow: {
      title: "Delivery status enquiry on WhatsApp",
      turns: [
        { who: "Customer", line: "where is my order" },
        { who: "Agent", line: "Hi Deepthi — I can check that. I have order #4471 placed on the 21st, two items. It was dispatched yesterday via Delhivery and is currently at the Hyderabad hub, on track for delivery tomorrow. Tracking: DL-88214077." },
        { who: "Customer", line: "can i change the address" },
        { who: "Agent", line: "Because it's already dispatched I can't change the address myself, but the courier can redirect within the same city. Shall I raise that request with our team? Someone will confirm within the hour." },
        { who: "Customer", line: "yes please" },
        { who: "Agent", line: "Raised — reference RQ-2209. You'll get a confirmation here once the redirect is accepted." },
      ],
    },
    integrations: [
      "Shopify",
      "WooCommerce",
      "WhatsApp",
      "Stripe",
      "Supabase",
      "Google Sheets",
      "Slack",
      "Courier tracking APIs",
      "HubSpot",
      "Zoho",
    ],
    benefits: [
      "Support volume stops rising in step with order volume",
      "Customers get status updates without having to ask",
      "Attribution is captured at the point of sale rather than reconstructed",
      "Commission calculation becomes auditable instead of manual",
      "Returns follow a consistent policy",
      "Repeat purchase prompts run on their own schedule",
    ],
    considerations: [
      "Refunds, cancellations and payouts are approval steps, not autonomous actions.",
      "The agent reads live order data rather than generating a status, so it cannot invent a delivery date.",
      "Marketing messages run inside WhatsApp template policy and opt-in rules.",
      "Payment details are never handled by the agent — it links to the store's own secure flow.",
    ],
    faqs: [
      {
        q: "Will this replace our support team?",
        a: "No, and framing it that way usually produces a worse result. It removes the repetitive tier — status, tracking, policy questions — so the team handles exceptions, complaints and the conversations where judgement matters. That is where support actually affects repeat purchase.",
      },
      {
        q: "Does this work with WooCommerce too?",
        a: "Yes. The pattern is webhook in, business logic, action out, so the store platform is an integration target rather than the architecture. Shopify and WooCommerce both expose what is needed.",
      },
      {
        q: "Can you build a multi-level affiliate programme?",
        a: "Yes — it is one of the things we are building on iLoveSurprises. The difficult part is not commission percentages; it is attribution rules, self-referral prevention, clawbacks on returns, and a ledger that reconciles cleanly. That is where the design effort goes.",
      },
      {
        q: "We already pay for several Shopify apps. Is this redundant?",
        a: "Not usually. Where an app does a job well, keep it. Custom work earns its place on logic specific to your business and on integrations between systems that have no shared connector. We will tell you when an app covers it more cheaply.",
      },
    ],
    relatedSolutions: ["shopify-automation", "whatsapp-automation", "custom-business-portals"],
    relatedCaseStudies: ["ilovesurprises"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "local-service-businesses",
    name: "Local Service Businesses",
    h1: "Automation for service businesses where the owner is the bottleneck.",
    metaTitle: "AI Automation for Service Businesses",
    metaDescription:
      "Answer every enquiry call, quote faster, schedule jobs and chase follow-ups automatically — automation for service businesses without an operations team.",
    eyebrow: "Service Businesses",
    lede:
      "In most local service businesses one person is sales, scheduling, dispatch and accounts. Every one of those roles competes for the same attention.",
    image: "/images/use-cases/services.webp",
    problem: {
      title: "The owner is the single point of coordination",
      body:
        "Enquiries arrive while the owner is on site, quoting, or driving. Calls go unanswered, quotes are promised and delayed, jobs are scheduled from memory, and follow-up on an unaccepted quote almost never happens. The business is not short of demand — it is short of a coordination layer, and hiring for that is expensive before revenue is predictable.",
    },
    manualWorkflow: [
      { step: "Enquiry arrives", detail: "By call or WhatsApp, usually while the owner is mid-job." },
      { step: "Call missed", detail: "No record the enquiry existed; the customer calls a competitor." },
      { step: "Requirement gathering", detail: "Repeated back-and-forth to establish job type, location and access." },
      { step: "Site visit or estimate", detail: "Scheduled informally, often rearranged." },
      { step: "Quote", detail: "Prepared in the evening, sent late." },
      { step: "Follow-up", detail: "Rarely happens; unaccepted quotes are simply dropped." },
      { step: "Job scheduling", detail: "Held in the owner's head and a paper diary." },
    ],
    recommendation: {
      title: "Capture the enquiry, then chase the quote",
      body:
        "Two automations change the economics. First, never miss an enquiry: an agent answers, captures job type, location, urgency and access details, and books the estimate. Second, chase every quote automatically — a structured three-touch follow-up on quotes that have not been accepted is usually the single highest-return automation a service business can run, because the work is already scoped and priced.",
    },
    exampleAutomation: {
      title: "Quote follow-up sequence",
      trigger: "A quote is marked as sent and remains unaccepted",
      steps: [
        "Day 2: WhatsApp message confirming the quote arrived and offering to answer questions",
        "Day 5: message addressing the two most common objections for that job type",
        "Day 9: final check-in with a clear yes or no ask",
        "Any reply stops the sequence and notifies the owner immediately",
        "Accepted quotes convert to a scheduled job and a calendar block",
        "Declined quotes record a reason code for later review",
        "No response after the sequence moves the lead to a quarterly re-engagement list",
      ],
    },
    exampleAgentFlow: {
      title: "Enquiry captured while the owner is on a job",
      turns: [
        { who: "Agent", line: "Thanks for calling Sundara Electricals. This is an automated assistant — Bhaskar is on a job right now, but I can take the details and get you a callback. What do you need doing?" },
        { who: "Caller", line: "Half the power in my flat has gone out." },
        { who: "Agent", line: "That sounds like it needs looking at quickly. Is there any burning smell or visible damage?" },
        { who: "Caller", line: "No smell, the lights in two rooms just stopped." },
        { who: "Agent", line: "Understood, I'll mark it urgent but not an emergency. What's the address and which floor?" },
        { who: "Caller", line: "Flat 3B, Kalyani Residency, Gachibowli." },
        { who: "Agent", line: "Got it. Is there lift access, and will someone be home this afternoon?" },
        { who: "Caller", line: "Yes to both." },
        { who: "Agent", line: "Bhaskar has a slot at 4:30pm today. I'll hold it and he'll confirm by message within fifteen minutes. Can I take your name and number?" },
      ],
    },
    integrations: [
      "WhatsApp",
      "Twilio",
      "Google Calendar",
      "Google Sheets",
      "GoHighLevel",
      "Zoho",
      "Stripe",
      "REST APIs",
    ],
    benefits: [
      "Enquiries are captured even when nobody can answer",
      "Job details arrive complete, without a back-and-forth",
      "Quotes get followed up without the owner remembering to",
      "The schedule lives in a system rather than one person's head",
      "Urgent work is separated from routine work at the point of enquiry",
      "Revenue stops depending on the owner's available attention",
    ],
    considerations: [
      "Pricing is quoted only from a rate card you maintain, or deferred to the owner.",
      "Safety-relevant enquiries — gas, electrical damage, water ingress — escalate immediately rather than being scheduled.",
      "The agent states it is automated and offers a callback from a person.",
      "Follow-up sequences stop on any reply and honour opt-out.",
    ],
    faqs: [
      {
        q: "We are a small team. Is this worth it at our size?",
        a: "It is most worth it at small size, because the constraint is attention rather than headcount. Start with one automation — missed-call capture or quote follow-up — and judge it on a number you can see, like quotes accepted. If it does not move, it was a small commitment.",
      },
      {
        q: "Can it quote prices?",
        a: "For standard jobs with a fixed rate card, yes. For anything that needs assessment it captures the requirement and books the estimate instead. Letting an agent improvise a price on a non-standard job is how you end up honouring a quote you cannot deliver.",
      },
      {
        q: "What if customers just want to talk to me?",
        a: "Most do, and the automation is built to get them to you faster with the details already gathered. It answers when you genuinely cannot, and the alternative to an automated answer is not a personal one — it is a missed call.",
      },
      {
        q: "How much does this cost to run?",
        a: "Ongoing cost is mostly third-party usage — telephony minutes, WhatsApp message fees, AI model calls — which scales with volume and is usually modest at small-business levels. We put the expected running cost in front of you during scoping, because a solution you cannot afford to operate is not a solution.",
      },
    ],
    relatedSolutions: ["ai-voice-agents", "whatsapp-automation", "workflow-automation"],
    relatedCaseStudies: ["leadpulz", "foundrypulse"],
  },
];

export const industryBySlug = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);
