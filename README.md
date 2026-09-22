# FlowFoundry AI Solutions

> Production-ready corporate website for FlowFoundry AI Solutions — showcasing AI agents, voice automation, workflow automation, custom software, integrations, and connected business systems.

FlowFoundry AI Solutions is a modern business technology website built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. It presents FlowFoundry's engineering capabilities, business solutions, team, flagship **LeadPulz AI** product, legal pages, and client inquiry experience in a responsive B2B SaaS-style interface.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Core Services](#-core-services)
- [Business Solutions](#-business-solutions)
- [LeadPulz AI](#-leadpulz-ai)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Build & Production](#-build--production)
- [Responsive Design](#-responsive-design)
- [UI/UX & Design System](#-uiux--design-system)
- [SEO & Discoverability](#-seo--discoverability)
- [Security](#-security)
- [Code Quality](#-code-quality)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Team](#-team)
- [Contact & Inquiries](#-contact--inquiries)

---

## 📖 Project Overview

FlowFoundry AI Solutions builds intelligent business systems by combining **AI, automation, software, integrations, business logic, and data**.

The website is designed to communicate a business-first engineering approach:

```text
Understand the process
        ↓
Connect the systems
        ↓
Automate the work
        ↓
Improve the outcome
```

Rather than presenting AI as an isolated technology, the platform explains how FlowFoundry connects four key layers:

1. **Conversations** — calls, forms, chat, email, lead inquiries, and customer interactions.
2. **Business Logic** — qualification, routing, approvals, rules, decisions, and workflow logic.
3. **Data** — CRM records, calendars, APIs, databases, analytics, and business knowledge.
4. **Actions** — bookings, updates, notifications, follow-ups, routing, and operational tasks.

### Designed For

- **Startups & growing businesses** looking to automate manual operations.
- **Sales teams** improving lead handling, qualification, follow-up, and booking.
- **Service businesses** connecting customer conversations to business workflows.
- **Operations teams** reducing repetitive coordination and disconnected processes.
- **Companies building custom software** around unique business requirements.
- **Businesses integrating existing tools** such as CRM, calendars, messaging, commerce, and APIs.

---

## ✨ Key Features

### 1. Modern Corporate Website

A complete multi-page business website using the Next.js App Router with dedicated routes for:

- Home
- About Us
- Services
- Solutions
- LeadPulz AI
- Contact
- Privacy Policy
- Terms
- Thank You

The global application shell includes reusable navigation, footer, responsive layouts, metadata, sitemap, and robots configuration.

### 2. Business-First Services Showcase

The Services experience presents FlowFoundry's engineering capabilities around real operational requirements instead of generic technology categories.

Core areas include:

- AI Agents
- Workflow Automation
- Custom Software
- Web Development
- eCommerce
- CRM & API Integrations

### 3. Solutions by Business Workflow

The Solutions experience focuses on business problems and operational outcomes, including:

- Lead Generation Automation
- Sales Automation
- Customer Support Automation
- Operations Automation
- CRM Automation

Each solution is positioned around the relationship between process, logic, data, integrations, and actions.

### 4. LeadPulz AI Product Experience

A dedicated `/leadpulz` product page introduces **LeadPulz AI**, FlowFoundry's AI-driven voice and revenue automation offering.

The product experience is designed around:

- AI voice conversations
- Lead engagement
- Qualification workflows
- Appointment booking
- Follow-up automation
- CRM connectivity
- Conversation insights
- Business workflow integration

### 5. Responsive Contact Experience

The `/contact` route provides:

- business contact information
- head-office location
- phone and email actions
- structured client inquiry form
- WhatsApp inquiry routing
- Google Maps location embed
- responsive mobile and desktop layouts

The current inquiry flow composes the submitted form data into a WhatsApp message and opens the conversation in a new browser tab.

### 6. Centralized Site Configuration

Shared website information is maintained in:

```text
src/lib/site.ts
```

This provides a central source for:

- company metadata
- website URL
- email
- WhatsApp configuration
- navigation
- service anchors
- solution anchors
- integrations
- team data

This helps keep the header, footer, sitemap, pages, and business information aligned.

### 7. Motion & Interactive UI

Framer Motion is used throughout the site for:

- entrance animations
- staggered content reveals
- card transitions
- mobile navigation
- scroll-triggered motion
- product and workflow visuals

Animations are intentionally restrained to support clarity and polish rather than dominate the experience.

### 8. SEO & Legal Foundation

The repository includes:

- application metadata
- `robots.ts`
- `sitemap.ts`
- Privacy Policy
- Terms page
- semantic page structure
- reusable site metadata

---

## 🧩 Core Services

### AI Agents

Intelligent conversational and task-oriented agents designed around business workflows.

Typical use cases include:

- lead qualification
- customer inquiries
- knowledge assistance
- voice interactions
- workflow triggers
- internal business support

### Workflow Automation

Connected systems that reduce repetitive manual work.

Examples include:

- lead routing
- approvals
- reminders
- notifications
- CRM updates
- follow-ups
- operational handoffs
- data synchronization

### Custom Software

Purpose-built software engineered around unique business processes.

Examples include:

- internal tools
- dashboards
- SaaS platforms
- customer portals
- administrative systems
- custom web applications

### Web Development

Modern responsive websites and web applications focused on usability, performance, conversion, and maintainability.

### eCommerce

Connected commerce experiences combining storefronts, customer journeys, integrations, order workflows, and automation.

### Integrations

Business system connectivity across tools including:

- HubSpot
- Salesforce
- Zoho
- GoHighLevel
- Google Calendar
- Microsoft Outlook
- Calendly
- WhatsApp
- Twilio
- Shopify
- WooCommerce
- Stripe
- Google Sheets
- Slack
- REST APIs
- Custom APIs

---

## 🎯 Business Solutions

FlowFoundry's solutions are organized around operational challenges rather than isolated technologies.

### Lead Generation Automation

Connect lead capture, qualification, routing, follow-up, CRM activity, and sales workflows.

### Sales Automation

Reduce repetitive coordination across prospect engagement, scheduling, follow-up, and pipeline management.

### Customer Support Automation

Use AI agents and knowledge systems to answer common questions, collect context, route requests, and support human escalation.

### Operations Automation

Connect approvals, notifications, tasks, system updates, and internal business processes.

### CRM Automation

Keep customer records aligned with real business activity by connecting conversations, forms, calendars, workflows, and other applications.

---

## ⚡ LeadPulz AI

**LeadPulz AI** is FlowFoundry's dedicated AI voice and revenue automation product experience.

```text
Conversation
     ↓
Qualification
     ↓
Business Logic
     ↓
CRM / Calendar / Data
     ↓
Next Action
```

LeadPulz is positioned separately from the broader FlowFoundry services brand while sharing the same design language and system-thinking philosophy.

Route:

```text
/leadpulz
```

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `^16.3.4` | App Router, rendering, routing, metadata, production builds |
| **UI Library** | React | `^19.2.8` | Component rendering and client interactions |
| **DOM Runtime** | React DOM | `^19.2.8` | Browser rendering |
| **Language** | TypeScript | `5.9` | Static typing and development safety |
| **Styling** | Tailwind CSS | `^4.3.3` | Utility-first responsive styling |
| **PostCSS Integration** | `@tailwindcss/postcss` | `^4.3.3` | Tailwind CSS v4 processing |
| **Animations** | Framer Motion | `^13.2.0` | Declarative motion and viewport interactions |
| **Email Library** | Nodemailer | `^10.0.1` | Available for server-side email integration |
| **Image Handling** | Next.js Image | Built-in | Responsive image optimization |
| **Routing** | Next.js App Router | Built-in | File-system application routing |

---

## 📁 Project Structure

```text
flowfoundry/
├── public/
│   ├── logo.png
│   └── images/
│       ├── about-bg.png
│       ├── contact.png
│       ├── cta-bg.png
│       ├── dashboard.jpeg
│       ├── flowfoundry-system.png
│       ├── hero-bg.png
│       ├── mission.png
│       ├── team/
│       │   ├── harsha.png
│       │   ├── nithish.png
│       │   ├── ajay.png
│       │   ├── jana.png
│       │   └── Ravi.jpeg
│       ├── use-cases/
│       └── why/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── leadpulz/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── solutions/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── thank-you/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── TeamAvatar.tsx
│   │   ├── ui.tsx
│   │   └── visuals.tsx
│   │
│   └── lib/
│       └── site.ts
│
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

> The repository structure will continue to evolve as new FlowFoundry products, case studies, integrations, and platform capabilities are added.

---

## 🚀 Getting Started

### Prerequisites

Before running the project locally, install:

- **Node.js** — modern LTS release recommended
- **npm**
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/flowfoundryai26/flowfoundry.git
cd flowfoundry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Navigate to:

```text
http://localhost:3000
```

The Next.js development server supports automatic refresh during development.

---

## 📋 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Starts the compiled Next.js production server. |
| `npm run typecheck` | Runs TypeScript with `tsc --noEmit` to validate types without generating files. |

### Development

```bash
npm run dev
```

### Type checking

```bash
npm run typecheck
```

### Production build

```bash
npm run build
```

### Production server

```bash
npm run start
```

---

## ⚙️ Environment Variables

The current public website can run locally without environment variables for its standard content and WhatsApp inquiry flow.

If server-side email delivery is enabled using Nodemailer, keep mail credentials in a local environment file such as:

```text
.env.local
```

Example configuration:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=
```

Never expose mail credentials or API secrets inside client components.

Recommended `.gitignore` protection:

```gitignore
.env
.env.local
.env*.local
```

### Environment variable rules

- Do not commit production credentials.
- Do not prefix private SMTP secrets with `NEXT_PUBLIC_`.
- Keep server-only credentials in server routes or server components.
- Configure the same variables in the production hosting platform when required.

---

## 🏗️ Build & Production

Create a production build:

```bash
npm run build
```

The Next.js build process validates the application and creates the optimized production output.

Run it locally:

```bash
npm run start
```

Before deploying, verify:

- TypeScript passes
- all navigation links work
- responsive layouts are correct
- images load correctly
- sitemap and robots output are valid
- legal pages are reachable
- external links point to the intended destinations
- contact actions are tested
- no private environment variables are committed

Recommended pre-deployment checks:

```bash
npm run typecheck
npm run build
```

---

## 📱 Responsive Design

The website follows a mobile-first responsive layout.

### Desktop — `1024px+`

- multi-column hero sections
- expanded primary navigation
- product and workflow visualizations
- multi-column service/solution cards
- large typographic hierarchy
- generous section spacing

### Tablet — `768px–1023px`

- adaptive two-column grids
- reduced heading sizes
- reflowed cards
- optimized product visuals
- touch-friendly navigation

### Mobile — `<768px`

- single-column page sections
- collapsible mobile navigation
- vertically stacked service cards
- full-width action buttons where appropriate
- simplified decorative visuals
- comfortable touch targets
- responsive typography and spacing

---

## 🎨 UI/UX & Design System

The FlowFoundry visual identity is dark-first, editorial, and restrained: off-black surfaces that match the logo, zinc neutrals, and a single desaturated electric-blue accent. Tokens live in `src/app/globals.css` (`@theme`), shared primitives in `src/components/ui.tsx`, motion helpers in `src/components/motion.tsx`, page patterns in `src/components/sections.tsx`, and perpetual-motion visuals in `src/components/visuals.tsx`.

### Color Palette

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Ink** | `#0A0D14` | Primary dark surface, hero + footer, matches the logo |
| **Ink 2 / 3** | `#10141D` / `#171C27` | Raised dark panels, dark hover states |
| **Paper** | `#F6F6F7` | Alternate light section background |
| **Foreground** | `#0E1118` | Headings on light surfaces |
| **Body / Muted** | `#4B5160` / `#7A8090` | Body copy, labels |
| **Accent** | `#3B74E6` | The only accent — links, eyebrows, active states |
| **Accent (on dark)** | `#6D9BFF` | Accent on dark surfaces |
| **Live** | `#22A06B` | Semantic only — status dots, completed actions |

No gradients on text, no purple, no glows. Shadows are tinted to the surface and kept soft.

### Typography

- **Geist** for display and body (`--font-geist`), medium weight, tight tracking (`-0.03em`)
- **Geist Mono** for eyebrows, indices, metrics, and labels (uppercase, `0.16em` tracking)
- Display sizes use `clamp()`; H1s stay under ~4.2rem

### Layout

- Left-aligned or split headings (`SectionHeading align="split"`), no centered heroes
- Asymmetric grids (`1.15fr_0.85fr`, `0.8fr_1.2fr`), row lists with `divide-y` instead of card rows
- Every asymmetric layout collapses to a single column below `lg`

### Motion

Framer Motion, spring physics for interactive elements, expo-out for reveals:

```text
Words        — headline words rise in sequence
Reveal       — staggered in-view reveal (once)
Magnetic     — CTA pulls toward the cursor (motion values only)
Tilt         — dashboard frame follows the cursor
Spotlight    — card border illuminates under the cursor
Marquee      — integrations band
AgentConsole — looping "live run" in the home hero
SystemFlow   — scroll-drawn route between the four system layers
StickyStack  — "Why FlowFoundry" cards pile as you scroll
```

All perpetual animations are isolated, memoized client components and respect `prefers-reduced-motion`.

--- | :--- | :--- |
| **FlowFoundry Violet** | `#6161FF` | Primary actions, links, active states |
| **Electric Cyan** | `#3AC9FF` | Secondary technology accent |
| **Accent Purple** | `#9450FD` | Gradient highlights |
| **Ink** | `#252830` | Main headings |
| **Slate** | `#535768` | Body text |
| **Muted Slate** | `#666C79` | Supporting copy |
| **Cloud** | `#F5F6F8` | Alternate section backgrounds |
| **Soft Surface** | `#F7F8FB` | Cards and supporting sections |
| **White** | `#FFFFFF` | Primary surface |

### Gradient Language

Primary accent gradient:

```css
linear-gradient(
  90deg,
  #3AC9FF 0%,
  #6161FF 52%,
  #9450FD 100%
)
```

Gradients are used selectively for highlighted words, product visuals, and technology accents.

### Typography

The visual system favors:

- lightweight editorial display headings
- compact uppercase eyebrow labels
- readable muted body copy
- strong spacing hierarchy
- concise business-focused messaging

### Cards

Common card treatment:

```css
background: #FFFFFF;
border: 1px solid #E6E8EF;
border-radius: 24px;
```

Large product and CTA surfaces use approximately `28px–32px` corner radii.

### Motion

Framer Motion is used for:

```text
fade in
fade in + upward movement
scale entrance
staggered content
mobile menu transitions
scroll-triggered reveals
```

Motion should remain subtle and support the information hierarchy.

---

## 🔍 SEO & Discoverability

The application includes dedicated Next.js SEO infrastructure.

### Included

- root application metadata
- page-oriented semantic structure
- `robots.ts`
- `sitemap.ts`
- descriptive content hierarchy
- optimized Next.js image handling

Recommended page metadata format:

```text
FlowFoundry AI Solutions | AI Agents, Automation & Custom Software
```

Recommended description:

```text
FlowFoundry AI Solutions builds AI agents, voice automation,
workflow automation, custom software and integrations that turn
business processes into intelligent systems.
```

---

## 🔐 Security

### Client-Side Safety

- External links should use `rel="noopener noreferrer"` when opening new tabs.
- React and TypeScript are used to reduce common state and rendering errors.
- Sensitive server credentials should never be included in browser bundles.

### Secrets

Never commit:

```text
SMTP credentials
API keys
access tokens
private keys
database passwords
client credentials
customer data
```

### Contact Forms

If the current WhatsApp inquiry flow is replaced or supplemented by a server-side API:

```text
Browser
   ↓
Next.js Form
   ↓
Server Route
   ↓
Email / CRM / Automation
```

The server route should include:

- server-side validation
- spam protection
- rate limiting where appropriate
- safe error handling
- secret environment variables
- input sanitization

---

## 🧪 Code Quality

The project uses TypeScript for type safety.

Run:

```bash
npm run typecheck
```

Before merging production changes:

```bash
npm run typecheck
npm run build
```

### Development Guidelines

- Prefer reusable components over duplicated UI.
- Keep shared site data in `src/lib/site.ts`.
- Use semantic HTML.
- Keep mobile layouts first-class.
- Use Next.js `Image` for project images where appropriate.
- Keep Framer Motion animation restrained.
- Avoid publishing unverified performance or customer claims.
- Keep private client information out of the repository.

---

## 🌐 Deployment

The project can be deployed to any hosting environment supporting Next.js.

### Vercel

Typical workflow:

```bash
npm run build
```

Then import the GitHub repository into Vercel.

Recommended settings:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
```

### Other Node.js Hosting

For a standard Node-compatible deployment:

```bash
npm install
npm run build
npm run start
```

### Production Architecture

```text
GitHub Repository
       ↓
Build / CI
       ↓
Next.js Hosting
       ↓
flowfoundryai.in
```

When server-side integrations are added, production environment variables must also be configured in the hosting platform.

---

## 🤝 Contributing

For team development:

1. Clone the repository.
2. Create a focused feature branch.
3. Implement and test the change.
4. Run type checking.
5. Run the production build.
6. Push the branch.
7. Open a pull request.
8. Review before merging.

### Example

```bash
git checkout -b feature/contact-redesign

git add .
git commit -m "feat: redesign contact experience"

npm run typecheck
npm run build

git push origin feature/contact-redesign
```

### Suggested Branch Naming

```text
feature/new-section
feature/leadpulz-update
fix/mobile-header
fix/contact-layout
refactor/shared-ui
docs/readme-update
```

### Suggested Commit Style

```text
feat: add new solutions section
fix: improve mobile navigation behavior
refactor: centralize site metadata
style: update service card layout
docs: improve repository documentation
```

---

## 📄 License

This repository does not currently include an open-source license.

Unless otherwise stated, the source code, FlowFoundry name, branding, visual assets, product materials, and associated intellectual property are proprietary to **FlowFoundry AI Solutions**.

Do not reuse FlowFoundry branding or commercial source code without permission.

---

## 👨‍💻 Team

The current website team roster is maintained centrally in `src/lib/site.ts`.

| Team Member | Role | Location |
| :--- | :--- | :--- |
| **Sri Harsha M** | Founder & CTO | Vijayawada, Andhra Pradesh |
| **Nithish** | Tech Lead | Madurai, Tamil Nadu |
| **Ajay** | Backend Developer | Vijayawada, Andhra Pradesh |
| **Janarthanan** | Frontend Developer | Madurai, Tamil Nadu |
| **Ravi Vaghela** | Business Development Executive | Ahmedabad, Gujarat |

---

## 📞 Contact & Inquiries

**FlowFoundry AI Solutions**

- **Website:** [https://flowfoundryai.in](https://flowfoundryai.in)
- **Email:** [info@flowfoundryai.in](mailto:info@flowfoundryai.in)
- **Phone / WhatsApp:** `+91 73309 37354`
- **Head Office:** Currency Nagar, Vijayawada, Andhra Pradesh, India
- **GitHub:** [flowfoundryai26/flowfoundry](https://github.com/flowfoundryai26/flowfoundry)

---

<div align="center">

### AI Agents · Automation · Custom Software · Integrations

**Build intelligent systems around the way businesses actually work.**

**FlowFoundry AI Solutions**

</div>
