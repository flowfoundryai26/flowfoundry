/**
 * Articles at /insights/<slug>.
 *
 * Deliberately few and long. Three substantial articles drawn from work we have
 * actually done beat ten generic posts: thin pages dilute the site's topical
 * signal and give a reader no reason to trust us. The remaining planned titles
 * live in the 90-day content plan, not as empty stubs.
 *
 * Body content is a small block union rather than raw HTML so headings stay
 * semantic, the table of contents can be generated, and nothing is injected.
 */

import type { Faq } from "./solutions";

export type Block =
  | { t: "p"; text: string }
  /** Renders <h2> and becomes a table-of-contents entry. */
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  /** A labelled step sequence — the diagram substitute that stays readable. */
  | { t: "flow"; title: string; steps: { step: string; detail: string }[] }
  /** Side-by-side comparison. */
  | { t: "compare"; title: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { t: "quote"; text: string }
  | { t: "callout"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Short deck under the H1. */
  lede: string;
  /** ISO dates. */
  published: string;
  updated: string;
  readingMinutes: number;
  category: string;
  image: string;
  body: Block[];
  faqs: Faq[];
  relatedSolutions: string[];
  relatedIndustries: string[];
  relatedCaseStudies: string[];
};

export const ARTICLES: Article[] = [
  /* ================================================================== */
  {
    slug: "ai-voice-agents-dental-clinic-enquiries",
    title: "How AI voice agents handle dental clinic enquiries",
    h1: "How AI voice agents handle dental clinic enquiries",
    metaTitle: "How AI Voice Agents Handle Dental Enquiries",
    metaDescription:
      "A practical breakdown of how an AI voice agent answers dental enquiry calls, triages urgency, books against real availability and where it must hand to a human.",
    lede:
      "A dental practice does not lose enquiries because of bad marketing. It loses them because the person who answers the phone is also the person assisting in the chair. Here is what automating that call actually involves.",
    published: "2026-08-14",
    updated: "2026-09-25",
    readingMinutes: 9,
    category: "AI Agents",
    image: "/images/use-cases/services.webp",
    body: [
      { t: "p", text: "Every dental practice we have looked at has the same structural problem, and it has nothing to do with demand. The front desk is staffed by someone who is also assisting chairside, processing payments, and handling walk-ins. When the phone rings during a procedure, it rings out." },
      { t: "p", text: "That matters more in dentistry than in most sectors because dental demand is local and comparison-shopped. A patient with a chipped tooth is calling three practices, not one. The practice that answers gets the appointment. The other two never learn the call happened." },
      { t: "callout", title: "The number worth checking first", text: "Before considering any automation, get your answered-call rate from your telephony provider. Most practices are surprised by it, and it is the only figure that tells you whether this problem is worth solving in your case." },

      { t: "h2", text: "What actually happens on a dental enquiry call", id: "the-call" },
      { t: "p", text: "A dental enquiry is not one conversation. It is four decisions happening in sequence, and each one is a place the call can be lost." },
      { t: "ol", items: [
        "Is this a new or existing patient? Determines which records to open and which pricing applies.",
        "Is this urgent? A chipped tooth this evening is not the same as a routine cleaning next month.",
        "What treatment is needed? Determines appointment duration and which clinician.",
        "When can they come in? Requires knowing real availability for that treatment length and clinician.",
      ]},
      { t: "p", text: "A trained coordinator does this in ninety seconds. The problem is not the difficulty of the task — it is that the task requires someone's undivided attention at an unpredictable moment." },

      { t: "h2", text: "What the agent handles, and what it must not", id: "boundaries" },
      { t: "p", text: "This is the part most discussions of AI in healthcare get wrong, so it is worth being precise. The boundary is not a matter of tuning or of how good the model is. It is a design decision enforced in configuration." },
      { t: "compare", title: "Scope of an AI voice agent in a dental practice", left: { title: "Appropriate to automate", items: [
        "Confirming practice hours, location and parking",
        "Explaining which treatments are offered",
        "Establishing whether the caller is a new or existing patient",
        "Routing on urgency signals to the right appointment type",
        "Checking live calendar availability",
        "Booking and confirming a routine appointment",
        "Capturing name and contact details",
        "Sending a written confirmation",
      ]}, right: { title: "Must reach a person", items: [
        "Any question about a symptom or its likely cause",
        "Whether a patient should take medication",
        "Whether something constitutes an emergency, clinically",
        "Treatment-specific pricing beyond a published range",
        "Insurance eligibility and claim questions",
        "Complaints, or anything about a previous treatment",
        "Any caller who asks to speak to a person",
      ]}},
      { t: "p", text: "Note the distinction on urgency. The agent can recognise urgency signals and prioritise an emergency assessment slot — that is a scheduling decision. It cannot tell a patient whether their situation is clinically serious. Those two things sound adjacent and are not." },
      { t: "p", text: "The way to enforce this is to make the unwanted behaviour impossible rather than discouraged. In our own platform, the actions an agent can take are a whitelist in the flow configuration. An agent with no capability to discuss medication will not be talked into discussing medication, which is not something you can say about an instruction in a prompt." },

      { t: "h2", text: "The workflow, step by step", id: "workflow" },
      { t: "flow", title: "After-hours enquiry to confirmed appointment", steps: [
        { step: "Call arrives outside hours", detail: "The agent answers on a rule you set — after hours, after a ring count, or on overflow while the team is engaged. Your existing number is unchanged." },
        { step: "Disclosure", detail: "The opening line states the caller is speaking to an automated assistant and that a person is available. This is both an ethical baseline and, in practice, what stops callers feeling misled when they realise." },
        { step: "Intent capture", detail: "The agent establishes what the caller needs in their own words, rather than presenting a menu." },
        { step: "Urgency triage", detail: "Defined signals — pain, bleeding, trauma, swelling — route to an emergency assessment slot or straight to the on-call clinician. This path is tested explicitly before launch." },
        { step: "Patient status", detail: "New or existing. Existing patients are matched on phone number against the practice record." },
        { step: "Availability check", detail: "The agent reads live availability for the right appointment duration and clinician, and offers only slots that are genuinely free." },
        { step: "Booking", detail: "The appointment is written back to the practice calendar. Booking is idempotent, so a retry after a network timeout cannot create a duplicate." },
        { step: "Confirmation", detail: "A WhatsApp or SMS confirmation goes out with clinician, time, location and, where relevant, preparation instructions." },
        { step: "Record", detail: "The call outcome, captured fields and transcript are written against the patient record — including for calls that did not book, which is the data most practices currently have none of." },
      ]},

      { t: "h2", text: "Why the calendar integration is the hard part", id: "calendar" },
      { t: "p", text: "The conversation is the visible half of this and the easier half. The engineering difficulty is in writing back correctly." },
      { t: "p", text: "Dental appointments have variable durations by treatment type, are tied to a specific clinician, often require specific equipment or a specific room, and sit in a practice-management system that may or may not expose a usable API. An agent that offers a slot it cannot actually fill creates more work than it saves — the coordinator now has to call the patient back and move them, which is worse than never having answered." },
      { t: "p", text: "Two rules make this reliable. First, read availability at the moment of offering, never from a cache. Second, make the booking write idempotent and keyed to the conversation, so a timeout-and-retry resolves to the same appointment instead of two." },
      { t: "callout", title: "Check this before scoping", text: "Whether your practice-management software exposes an API, or at minimum supports two-way calendar sync, materially changes what this costs to build. It is the first thing to establish, not something to discover mid-project." },

      { t: "h2", text: "The reminder loop is usually worth more", id: "reminders" },
      { t: "p", text: "Most practices approach this wanting the enquiry call solved. In our experience the reminder and recall loop is the higher-return automation, and it is simpler to build." },
      { t: "p", text: "The reason is arithmetic. A missed enquiry costs you one potential patient. A no-show costs you a slot that was already booked, already staffed, and cannot be resold at short notice. Reminder calls are also the first task dropped on a busy day — which is exactly the day the schedule can least afford a gap." },
      { t: "flow", title: "Reminder and recovery sequence", steps: [
        { step: "On booking", detail: "Immediate confirmation with date, time, clinician and location." },
        { step: "48 hours before", detail: "Reminder with one-tap confirm or reschedule." },
        { step: "Morning of", detail: "Short reminder including travel and arrival guidance." },
        { step: "On reschedule", detail: "The freed slot is flagged and offered to the waitlist in booking order." },
        { step: "On no-show", detail: "Same-day recovery message offering to rebook." },
        { step: "Always", detail: "The no-show is recorded against the patient record so a pattern becomes visible." },
      ]},
      { t: "p", text: "Note the waitlist step. Automating reminders reduces no-shows; automatically offering the freed slot to a waitlist is what recovers the revenue from the ones that still happen. Practices routinely implement the first and skip the second." },

      { t: "h2", text: "Patient data, handled properly", id: "data" },
      { t: "p", text: "Patient contact and appointment data is sensitive even when no clinical detail is involved. Three practices we hold to:" },
      { t: "ul", items: [
        "Capture the minimum needed to book — name, contact number, treatment type, urgency. Nothing clinical.",
        "Keep automated message content free of treatment detail. A phone may be seen by someone other than the patient.",
        "Enforce access at the database level with row-level security, rather than filtering in application code where one missing condition becomes a disclosure.",
      ]},

      { t: "h2", text: "How to tell whether it worked", id: "measurement" },
      { t: "p", text: "Baseline two numbers from your own systems before launch, and compare against them afterwards. Anything else is an assertion." },
      { t: "ul", items: [
        "Answered-call rate, from your telephony provider, split into in-hours and out-of-hours.",
        "No-show rate, from your practice-management system, over a period long enough to be meaningful.",
        "New patient enquiries that resulted in a booking.",
        "Front-desk time spent on the phone, if you can sample it.",
      ]},
      { t: "p", text: "We deliberately do not quote industry averages for these. Practice-to-practice variation is wide enough that a benchmark tells you nothing useful about your own situation, and a vendor quoting one is usually quoting the best case." },

      { t: "h2", text: "Where to start", id: "start" },
      { t: "p", text: "One workflow. If your answered-call rate is poor, start with after-hours call handling — the scope is narrow and the comparison is clean. If your no-show rate is the bigger cost, start with the reminder loop, which is cheaper to build and faster to show a result." },
      { t: "p", text: "What we would avoid is attempting both plus recalls plus insurance queries in one project. Broad first phases take longer to reach production and make it harder to tell which part actually helped." },
    ],
    faqs: [
      { q: "Will patients accept talking to an AI agent?", a: "In our experience acceptance depends on two things: the agent disclosing what it is, and it handing over to a person quickly when the caller wants that. What patients react badly to is discovering mid-call that they were misled, or being trapped in automation with no way out. Both are design choices, not inherent properties." },
      { q: "What if the agent mishears something important?", a: "It confirms critical details back — name, time, contact number — before completing a booking. For anything clinical it does not act at all; it routes to a person. The design assumption is that the agent will sometimes be wrong, so no unrecoverable action depends on it being right." },
      { q: "Does this replace our front-desk coordinator?", a: "No. It answers the calls that currently go unanswered and handles the routine part of the ones it does take. The coordinator's attention returns to the patients physically present, which is the part that cannot be automated and that patients notice." },
      { q: "How long does a dental implementation take?", a: "The determining factor is your practice-management software. With a usable API or reliable calendar sync, a single after-hours booking path is a short engagement. A closed system, multi-clinician routing and treatment-specific durations take longer. We establish which situation you are in during discovery rather than quoting before seeing it." },
    ],
    relatedSolutions: ["ai-voice-agents", "whatsapp-automation", "crm-automation"],
    relatedIndustries: ["dental-clinics", "healthcare-clinics"],
    relatedCaseStudies: ["leadpulz"],
  },

  /* ================================================================== */
  {
    slug: "whatsapp-automation-indian-businesses",
    title: "WhatsApp automation for Indian businesses: a practical workflow",
    h1: "WhatsApp automation for Indian businesses: a practical workflow",
    metaTitle: "WhatsApp Automation for Indian Businesses",
    metaDescription:
      "How to automate WhatsApp enquiries properly: the Business API, template rules, qualification flows, CRM sync and the mistakes that get a number banned.",
    lede:
      "For most Indian businesses WhatsApp is the primary enquiry channel and the only one with no reporting attached. This is how to automate it without losing the thing that made it work.",
    published: "2026-08-28",
    updated: "2026-09-25",
    readingMinutes: 10,
    category: "Automation",
    image: "/images/use-cases/support.webp",
    body: [
      { t: "p", text: "Ask an Indian business owner where enquiries come from and WhatsApp is usually the first answer. Ask to see the pipeline report for that channel and there generally is not one. The conversations are on someone's personal phone." },
      { t: "p", text: "That gap is the whole problem. The highest-volume channel is the least instrumented, the least shareable, and the most dependent on one person being available. When they go on leave, the channel stops." },

      { t: "h2", text: "Start with the API decision, because it constrains everything", id: "api" },
      { t: "p", text: "There are three ways to run WhatsApp for a business, and only one of them supports automation at business scale." },
      { t: "ul", items: [
        "The consumer app. One device, no automation, no shared access. Fine for a sole trader, a dead end otherwise.",
        "The WhatsApp Business app. Adds labels, quick replies and a catalogue. Still fundamentally one device and no real automation surface.",
        "The WhatsApp Business Platform, commonly called the Business API. Supports verified sending, approved message templates, a shared team inbox, and programmatic automation.",
      ]},
      { t: "callout", title: "Do not automate a personal number through unofficial tooling", text: "There is a category of tool that automates the consumer app by driving it programmatically. It works until the number is banned, and the number being banned takes your primary enquiry channel and its entire history with it. The saving is not worth the exposure." },
      { t: "p", text: "The API route means going through a Business Solution Provider, verifying the business, and accepting that business-initiated messages use pre-approved templates. Those constraints feel like friction. They are also what makes the channel reliable enough to build on." },

      { t: "h2", text: "The rule that shapes every WhatsApp automation", id: "window" },
      { t: "p", text: "WhatsApp draws a hard line between two situations, and almost every design decision follows from it." },
      { t: "compare", title: "The two messaging modes", left: { title: "Customer-initiated window", items: [
        "Opens when the customer messages you",
        "Lasts 24 hours from their most recent message",
        "Free-form replies allowed",
        "This is where conversational automation belongs",
        "Each new customer message resets the window",
      ]}, right: { title: "Business-initiated messages", items: [
        "Used when you contact the customer first",
        "Must use a pre-approved template",
        "Requires prior opt-in",
        "Charged per message",
        "Marketing templates face stricter approval and can be blocked",
      ]}},
      { t: "p", text: "Practically: qualification, support and conversational flows run inside the 24-hour window and can be as natural as you like. Reminders, order updates and follow-ups reach outside it and must be templated. Designing a follow-up sequence that assumes free-form messaging is the most common mistake we see, and it surfaces only after build." },

      { t: "h2", text: "A qualification flow that does not feel like a form", id: "qualification" },
      { t: "p", text: "The failure mode of WhatsApp automation is turning a conversation into an interrogation. Customers abandon a chat that fires six questions at them, and abandoning is one tap." },
      { t: "p", text: "What works is asking one question per message, acknowledging the answer before moving on, and accepting unstructured replies instead of demanding a format." },
      { t: "flow", title: "New enquiry to qualified lead", steps: [
        { step: "Inbound message", detail: "Arrives on the business number. The 24-hour window opens." },
        { step: "Intent classification", detail: "New enquiry, existing customer, support issue, or booking change. Routing happens before any question is asked." },
        { step: "Acknowledge first", detail: "Confirm receipt and state what happens next, before asking anything. This single step measurably reduces drop-off." },
        { step: "One question at a time", detail: "Ask, acknowledge the answer, then ask the next. Never batch." },
        { step: "Accept messy input", detail: "'around 15 lakhs', '15L', 'about fifteen' all resolve to the same value. Rejecting input and asking again is where people leave." },
        { step: "Answer their questions too", detail: "A qualification flow that will not answer a customer's own question reads as extraction. Route routine questions to the knowledge base mid-flow." },
        { step: "Act", detail: "Book, quote, escalate or route based on the captured answers." },
        { step: "Write to CRM", detail: "Contact, captured fields and conversation summary. This is the step that makes the channel reportable." },
        { step: "Hand over cleanly", detail: "When a human takes the thread, automation steps aside and does not resume mid-conversation." },
      ]},

      { t: "h2", text: "Getting off the personal phone", id: "shared-inbox" },
      { t: "p", text: "The operational change that matters most is often not the automation. It is that conversations move into a shared inbox the whole team can see." },
      { t: "ul", items: [
        "Any team member can pick up a thread, with the full history visible.",
        "Someone being on leave stops being a single point of failure.",
        "Unanswered conversations can be counted — you cannot manage what you cannot see.",
        "Conversation history belongs to the business rather than to a departing employee's device.",
        "Two staff members stop answering the same customer differently.",
      ]},
      { t: "p", text: "Several businesses we have worked with got most of their improvement from this alone, before a single automated flow went live. It is worth doing first for that reason." },

      { t: "h2", text: "Language, as it is actually used", id: "language" },
      { t: "p", text: "Indian business WhatsApp is frequently code-mixed. A customer writes in English, switches to Hindi or Telugu mid-sentence, and uses Roman script for both. An agent configured for one language and one script will mishandle a large share of real messages." },
      { t: "p", text: "Two things to get right: handle transliterated input, since 'kitna hoga' will not match a Devanagari pattern, and reply in the language the customer used rather than the one you configured as default." },

      { t: "h2", text: "What not to automate", id: "limits" },
      { t: "p", text: "The line is narrower than vendors suggest." },
      { t: "ul", items: [
        "Complaints. A frustrated customer receiving an automated reply escalates rather than settles.",
        "Final pricing on anything non-standard. Capture the requirement and route it.",
        "Negotiation of any kind.",
        "Medical, legal or financial advice. Route without exception.",
        "Anything irreversible without a human approval step — refunds, cancellations, payouts.",
      ]},
      { t: "p", text: "And one absolute rule: a customer who asks for a human gets one, immediately, without having to ask twice. Automation that resists this does more reputational damage than the efficiency is worth." },

      { t: "h2", text: "Sequencing an implementation", id: "sequence" },
      { t: "ol", items: [
        "Move to the Business API and get the number verified. Everything else depends on it.",
        "Set up the shared inbox and work manually for a fortnight. You will learn what the real questions are.",
        "Automate the acknowledgement and intent routing only. Measure the response-time change.",
        "Add the knowledge base for the repeated questions you now have evidence for.",
        "Add the qualification flow for new enquiries.",
        "Connect the CRM so the channel appears in reporting.",
        "Add templated reminders and follow-ups last, since they carry the approval overhead.",
      ]},
      { t: "p", text: "Step two is the one people skip and the one that most improves the result. Two weeks of manual handling in a shared inbox tells you what customers actually ask, which is reliably different from what the business assumes." },
    ],
    faqs: [
      { q: "Can we automate our existing WhatsApp Business app number?", a: "You can migrate that number to the Business API, which is the correct path and preserves it. What you should not do is drive the app programmatically with unofficial tooling — it risks a ban that takes the number and its history with it." },
      { q: "How much does the Business API cost to run?", a: "There is a per-message charge on business-initiated conversations that varies by country and category, plus whatever your solution provider charges. Customer-initiated conversations are considerably cheaper. Cost scales with volume, so we model expected monthly spend during scoping rather than after launch." },
      { q: "Will automation make us look impersonal?", a: "It can, if it answers questions it should not or refuses to hand over. Used on acknowledgement, routing, confirmations and reminders it usually reads as more responsive, because the alternative is a reply four hours later." },
      { q: "Do we still need a website if WhatsApp is our main channel?", a: "Yes — they do different jobs. WhatsApp converts an enquiry that already exists; the website is how that enquiry gets created, and it is the only one of the two that search engines can index. Businesses that treat WhatsApp as a replacement tend to find their enquiry volume is capped by referral alone." },
    ],
    relatedSolutions: ["whatsapp-automation", "crm-automation", "ai-voice-agents"],
    relatedIndustries: ["ecommerce", "real-estate", "local-service-businesses", "dental-clinics"],
    relatedCaseStudies: ["leadpulz", "ilovesurprises"],
  },

  /* ================================================================== */
  {
    slug: "crm-automation-leads-falling-through-cracks",
    title: "How CRM automation stops leads falling through the cracks",
    h1: "How CRM automation stops leads falling through the cracks",
    metaTitle: "How CRM Automation Prevents Lost Leads",
    metaDescription:
      "Why CRMs go stale and how automation fixes it: multi-source capture, deduplication, ownership rules, response clocks and follow-up that survives a rep being away.",
    lede:
      "A CRM rarely fails because the software is wrong. It fails because keeping it accurate is manual work nobody is rewarded for. That is an automation problem, not a training problem.",
    published: "2026-09-11",
    updated: "2026-09-25",
    readingMinutes: 8,
    category: "Automation",
    image: "/images/mission.webp",
    body: [
      { t: "p", text: "The usual diagnosis for a stale CRM is that the team needs more discipline. We have not found that to be true. When updating a CRM is pure overhead for the person doing it, entry slips — and no amount of training changes an incentive." },
      { t: "p", text: "The useful question is not why the team is not updating the CRM. It is which updates should never have required a human in the first place." },

      { t: "h2", text: "Where leads are actually lost", id: "where" },
      { t: "p", text: "Five specific gaps account for most of it, and each has a different fix." },
      { t: "ol", items: [
        "The lead never enters the CRM. It arrived on WhatsApp, as a phone call, or as a referral mentioned in a meeting.",
        "It enters but has no owner. Everyone assumes someone else has it.",
        "It has an owner who is unavailable. There is no reassignment rule, so it simply waits.",
        "First response is too slow. The lead has already engaged a competitor.",
        "Follow-up stops after one attempt. Nobody knows, because nothing tracks attempt count.",
      ]},
      { t: "p", text: "Note that only the fourth is about sales skill. The other four are process gaps that automation closes directly." },

      { t: "h2", text: "Capture everything, in one shape", id: "capture" },
      { t: "p", text: "Leads arrive from website forms, phone calls, WhatsApp, email, ad platforms and referrals. Each has a different shape, and the usual result is either separate spreadsheets per source or a daily manual consolidation that is always behind." },
      { t: "p", text: "The fix is one normalised intake path. Every source writes through the same function, which produces the same fields regardless of origin." },
      { t: "flow", title: "Normalised lead intake", steps: [
        { step: "Source event", detail: "Form submission, completed call, inbound WhatsApp message, ad lead, or email parse." },
        { step: "Normalise", detail: "Map to one schema. Phone numbers to E.164, names to consistent case, source and campaign always populated." },
        { step: "Match before create", detail: "Look up by phone and email first. Most duplicates come from a returning enquirer, not a system fault." },
        { step: "Enrich", detail: "Attach source, campaign, the page or property enquired about, and any existing history." },
        { step: "Score", detail: "Apply your criteria consistently — service, budget band, region, timeline." },
        { step: "Assign", detail: "Set an owner by rule, with a named fallback so nothing lands unassigned." },
        { step: "Start the clock", detail: "Record the creation timestamp. This is what makes response time measurable rather than anecdotal." },
      ]},
      { t: "callout", title: "Deduplicate on phone number in India", text: "Email is unreliable as a primary key here — many enquirers give none, or a different one each time. Phone number normalised to E.164 is the field that actually identifies a returning lead." },

      { t: "h2", text: "Ownership and the response clock", id: "ownership" },
      { t: "p", text: "Two rules remove a surprising share of lost leads." },
      { t: "h3", text: "Every lead has exactly one owner" },
      { t: "p", text: "Assignment by rule — territory, service line, round-robin, value band — with an explicit fallback. A lead with no owner has no one accountable, and a lead with three owners has none either." },
      { t: "h3", text: "Every lead has a response deadline" },
      { t: "p", text: "A clock starts at creation. If no logged activity occurs within your window, it escalates: reassign, notify a manager, or trigger an automated first touch. The specific window matters less than having one that is enforced." },
      { t: "p", text: "This is where automation beats discipline. A rep with sixty leads and a full calendar is not being negligent when one ages out. The system should catch it, because the system does not get busy." },

      { t: "h2", text: "Follow-up that survives a holiday", id: "follow-up" },
      { t: "p", text: "Most sales processes assume follow-up is a personal responsibility, which means it stops when that person is unavailable. It also means nobody knows how many attempts were actually made." },
      { t: "p", text: "Structured sequences fix both, with a constraint worth being careful about." },
      { t: "compare", title: "What to automate in follow-up", left: { title: "Automate freely", items: [
        "Reminders to the rep that a follow-up is due",
        "Confirmations and calendar invitations",
        "Requested information — brochures, specifications, pricing sheets",
        "Status updates on an existing enquiry",
        "Long-cycle nurture for leads months from deciding",
        "Internal escalation when a sequence completes with no reply",
      ]}, right: { title: "Draft, but send manually", items: [
        "Anything written to read as a personal message",
        "A proposal, quote or commercial commitment",
        "A response to an objection",
        "Re-engagement after a lead went quiet following a real conversation",
      ]}},
      { t: "p", text: "The distinction is about how it reads. A prospect who realises they are inside a sequence disengages, and that recognition costs more than the time saved. Automating the reminder and having the rep send is usually the right trade." },

      { t: "h2", text: "Make stages mean something", id: "stages" },
      { t: "p", text: "Pipeline stages updated from memory before a review meeting are not data. They are recollection formatted as a report, and the forecast built on them is a guess." },
      { t: "p", text: "Where possible, drive stage transitions from real events:" },
      { t: "ul", items: [
        "A booked meeting in the calendar moves the lead to Meeting Scheduled.",
        "A sent proposal document moves it to Proposal Sent.",
        "A received payment moves it to Won.",
        "A completed follow-up sequence with no reply moves it to Dormant.",
      ]},
      { t: "p", text: "Some stages genuinely need human judgement — whether a prospect is seriously evaluating cannot be inferred from an event. Automate the observable ones and leave the judgement calls to people, rather than pretending either extreme works." },

      { t: "h2", text: "Existing bad data", id: "bad-data" },
      { t: "p", text: "Automation does not retroactively clean a messy CRM, and anyone claiming otherwise is overselling. What it can do:" },
      { t: "ul", items: [
        "Merge duplicates that match unambiguously on a normalised phone number.",
        "Normalise formatting across phone, name and region fields.",
        "Flag records missing fields required by your process.",
        "Surface genuinely ambiguous records in a review queue for a human decision.",
      ]},
      { t: "p", text: "That last point is the important one. A merge rule aggressive enough to resolve every ambiguous record will also merge two genuinely different people, and that error is worse than the duplicate. Queue it for a person." },

      { t: "h2", text: "Measuring it honestly", id: "measure" },
      { t: "p", text: "Baseline these from your own CRM before changing anything:" },
      { t: "ul", items: [
        "Median time from lead creation to first logged activity.",
        "Share of open leads with no assigned owner.",
        "Share of leads with more than one logged follow-up attempt.",
        "Leads created per source, compared against what each source reports sending.",
        "Median age of leads sitting in each stage.",
      ]},
      { t: "p", text: "That fourth one is often the most revealing. A gap between what a source reports and what reached the CRM is a capture failure, and it is usually larger than anyone expects." },
    ],
    faqs: [
      { q: "Do we need to change CRM to do this?", a: "Usually not. Most automation of this kind works on HubSpot, Zoho, Salesforce or GoHighLevel through their APIs. Changing CRM is a large project that rarely addresses the actual bottleneck, which is that updating the current one is manual." },
      { q: "We are on spreadsheets. Should we buy a CRM first?", a: "Not necessarily first. Automating capture and follow-up around a well-structured sheet is often the faster path to a result, and it tells you what you actually need from a CRM. Buying one before you know that tends to produce an expensive tool nobody fills in." },
      { q: "How long before this shows a result?", a: "Capture and assignment changes show up in days, because response time moves immediately. Pipeline accuracy takes a cycle or two, since it depends on new leads flowing through the corrected process rather than on fixing historical records." },
      { q: "Will the sales team resist this?", a: "Less than expected, provided the automation removes work rather than adding surveillance. Reps generally welcome not having to log basic activity. Resistance appears when a system is framed as a monitoring tool, which is a communication decision more than a technical one." },
    ],
    relatedSolutions: ["crm-automation", "workflow-automation", "whatsapp-automation"],
    relatedIndustries: ["real-estate", "local-service-businesses", "healthcare-clinics"],
    relatedCaseStudies: ["foundrypulse", "leadpulz"],
  },
];

export const articleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

/** Headings become the table of contents. */
export const tocOf = (a: Article) =>
  a.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");

/** Rough word count for Article schema. Cheap and good enough. */
export const wordCountOf = (a: Article) => {
  let n = 0;
  for (const b of a.body) {
    if (b.t === "p" || b.t === "h2" || b.t === "h3") n += b.text.split(/\s+/).length;
    else if (b.t === "ul" || b.t === "ol") n += b.items.join(" ").split(/\s+/).length;
    else if (b.t === "flow") n += b.steps.map((s) => `${s.step} ${s.detail}`).join(" ").split(/\s+/).length;
    else if (b.t === "compare") n += [...b.left.items, ...b.right.items].join(" ").split(/\s+/).length;
    else if (b.t === "quote" || b.t === "callout") n += b.text.split(/\s+/).length;
  }
  return n;
};

/**
 * Planned but unwritten. Kept here as a plan, NOT rendered as empty pages —
 * publishing stubs to fill a content calendar is how a site accumulates
 * thin pages that drag down everything else.
 */
export const PLANNED_ARTICLES = [
  "How we design multi-level affiliate commission systems",
  "AI calling versus traditional sales calling: where each one wins",
  "How to connect AI voice agents with your CRM",
  "What a custom business operations portal can replace",
  "Shopify automation: the workflows worth automating first",
  "How AI lead qualification actually works",
  "What happens during an automation consultation",
] as const;
