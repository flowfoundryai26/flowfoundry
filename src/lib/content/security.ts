/**
 * Content for /responsible-automation.
 *
 * This page exists because an AI agent that can write to a CRM, move money or
 * read customer records is a security surface, and a buyer evaluating us is
 * right to ask how that is controlled. Everything here describes a practice we
 * apply — no certifications are claimed, because we hold none.
 */

export const SECURITY_PRACTICES = [
  {
    title: "Least-privilege access",
    body:
      "Every integration gets its own credential, scoped to the narrowest permission set that lets it do its job. An agent that only needs to create calendar events does not get permission to delete them. Where a platform offers coarse scopes only, we say so rather than pretending the scope is tighter than it is.",
  },
  {
    title: "Role-based permissions",
    body:
      "In the software we build, authorisation is enforced at the database with row-level security rather than by filtering in application queries. The difference matters: a forgotten condition in a query is a data-exposure bug, whereas a database policy fails closed.",
  },
  {
    title: "Capability whitelisting for agents",
    body:
      "An AI agent's permitted actions are an explicit allow-list in configuration, not an instruction in a prompt. An agent with no capability to issue a refund cannot be persuaded into issuing one. We constrain by what is possible, not by what we have asked the model to avoid.",
  },
  {
    title: "Human approval on irreversible actions",
    body:
      "Payments, refunds, cancellations, payouts, deletions and anything else that is hard to undo are built as approval steps by default. The system prepares and presents; a person authorises. This is a design default we would need a specific reason to remove.",
  },
  {
    title: "Data minimisation",
    body:
      "We capture the fields a workflow actually needs and no more. For a booking that usually means name, contact and appointment type — not a full customer history. Data you never collected cannot leak.",
  },
  {
    title: "Credential management",
    body:
      "API keys and tokens live in environment configuration or a managed secret store, never in source control, never in client-side code, and never in a prompt. Credentials are rotatable, and we document what to rotate if you need to.",
  },
  {
    title: "Audit logging",
    body:
      "Automated actions write an attributed, timestamped log entry. This is what makes a disputed change traceable and an unexpected outcome debuggable. An automation you cannot audit is one you cannot trust with anything that matters.",
  },
  {
    title: "Failure handling",
    body:
      "Steps are retried where retrying is safe and escalated to a person where it is not, with idempotency keys so a retry cannot duplicate a booking or a charge. A workflow that fails silently is worse than the manual process it replaced.",
  },
  {
    title: "Testing before launch",
    body:
      "We test the failure paths explicitly, not just the happy path: what happens when an API is down, when input is malformed, when a caller says something unexpected, when two requests race. Emergency and escalation paths are tested every time.",
  },
  {
    title: "Monitoring after launch",
    body:
      "Error rates, failure patterns and unexpected agent behaviour are monitored after go-live, with alerts to a channel someone actually reads. Launch is the start of the operating period, not the end of the engagement.",
  },
] as const;

export const SENSITIVE_SURFACES = [
  {
    surface: "CRM systems",
    risk:
      "An agent with write access can corrupt records at scale faster than a person can.",
    control:
      "Scoped credentials, create-and-update only with deletion excluded, match-before-create to prevent duplicate storms, and full audit logging of every write.",
  },
  {
    surface: "Customer information",
    risk:
      "Over-collection and over-exposure — the agent holding or repeating more than it needs.",
    control:
      "Minimal field capture, role-based read access, and automated messages that deliberately exclude sensitive detail in case a device is shared.",
  },
  {
    surface: "Payments",
    risk: "An incorrect or duplicated financial action.",
    control:
      "Agents never handle card data; they link to the platform's own secure flow. Refunds and payouts are human-approved, and every financial action is idempotent.",
  },
  {
    surface: "Scheduling",
    risk:
      "Double bookings, or a slot offered that cannot actually be filled.",
    control:
      "Availability read live at the moment of offering, bookings written transactionally with a conversation-keyed idempotency key so a retry resolves to the same event.",
  },
  {
    surface: "Business databases",
    risk: "Broad read access turning one compromised credential into full exposure.",
    control:
      "Row-level security, per-integration credentials, read-only access wherever writing is not required, and no direct database access from client-side code.",
  },
] as const;

export const AI_LIMITS = [
  "We do not claim AI agents should operate unattended. The scope of autonomy is a decision you make per workflow, and we will argue for a narrower scope than most vendors.",
  "Agents disclose that they are automated. We treat this as a baseline, not an option.",
  "Anyone who asks to speak to a person gets one, immediately, without having to ask twice.",
  "Agents do not give clinical, legal or financial advice under any configuration.",
  "Agents state prices only from a source you maintain. They do not generate or negotiate pricing.",
  "Where a model could plausibly be wrong, the action it triggers is reversible or gated behind a person.",
] as const;
