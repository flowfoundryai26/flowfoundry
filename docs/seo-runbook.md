# FlowFoundry SEO Runbook

Operational reference for search, indexing, authority and content.
Last updated: 2026-09-25

---

## 0. The one thing that mattered most

Before this pass, six of seven pages served an identical `<title>`, an identical
`<meta description>`, and `<link rel="canonical" href="https://flowfoundryai.in">`
— pointing at the **homepage**.

Cause: every page was a `"use client"` component, and a client component cannot
export `metadata` in the Next.js App Router. Next fell back to the root layout's
metadata, which included `alternates: { canonical: "/" }`.

Effect: every page told Google "I am a duplicate of the homepage." Google
de-duplicates aggressively on that signal, which is why only the homepage was
being indexed.

**Do not reintroduce this.** The guard rails now in place:

1. The root layout has **no** `alternates.canonical`. Never add one back.
2. Every page builds metadata through `pageMeta()` in `src/lib/seo.ts`, where
   `path` is a **required** argument.
3. Page files are server components. Interactive markup lives in a sibling
   `view.tsx` marked `"use client"`.

If you add a page, copy an existing `page.tsx` wrapper. If you ever see
`"use client"` at the top of a `page.tsx`, that page has lost its metadata.

---

## 1. Canonical host

**`https://www.flowfoundryai.in` is canonical.**

The apex `flowfoundryai.in` 308-redirects to `www`, so `www` is what the server
actually returns 200 for. `SITE.url` in `src/lib/site.ts` now matches that.

If you ever switch to apex-canonical, you must change **both**: the hosting
redirect *and* `SITE.url`. Changing one without the other recreates the problem
where canonicals point at a redirect.

Verify after any DNS or hosting change:

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://flowfoundryai.in/
curl -s -o /dev/null -w "%{http_code}\n" https://www.flowfoundryai.in/
curl -s https://www.flowfoundryai.in/ | grep -o '<link rel="canonical"[^>]*>'
```

---

## 2. Google Search Console

### 2.1 Verify the property

Use a **Domain property**, not a URL-prefix property. A domain property covers
`http`, `https`, apex and `www` in one place, which matters here because the
apex redirects to `www`.

1. Go to <https://search.google.com/search-console> and sign in with the Google
   account that should own this long-term (not a personal account that may leave).
2. Click the property dropdown → **Add property** → **Domain**.
3. Enter `flowfoundryai.in` (no scheme, no `www`).
4. Google shows a TXT record like `google-site-verification=xxxxxxxx`.
5. In your DNS provider, add a TXT record on the root/apex (`@`) with that value.
6. Wait for propagation (usually minutes, up to 48h) then click **Verify**.

Check propagation before clicking verify:

```bash
nslookup -type=TXT flowfoundryai.in
```

If a domain property is impossible, fall back to a URL-prefix property for
`https://www.flowfoundryai.in/` — the `www` one, since that is canonical.

### 2.2 Submit the sitemap

1. Search Console → **Sitemaps** (left sidebar).
2. Enter `sitemap.xml` and submit.
3. Expected status: **Success**, 33 discovered URLs.

The sitemap is generated from `src/app/sitemap.ts` and is derived from the same
content modules that generate the pages, so it cannot drift out of sync. It
deliberately excludes `/thank-you` (noindex).

### 2.3 Request indexing for priority pages

Do the homepage first, then these in order. Use **URL Inspection** → paste the
URL → **Request indexing**. There is a daily quota, so spread across a few days.

Day 1:
- `https://www.flowfoundryai.in/`
- `https://www.flowfoundryai.in/solutions`
- `https://www.flowfoundryai.in/contact`

Day 2:
- All six `/solutions/*` pages

Day 3:
- `/industries` and all five `/industries/*` pages

Day 4:
- `/case-studies` + the four case studies
- `/insights` + the three articles
- `/about`, `/how-we-work`, `/authors/sri-harsha`

### 2.4 Inspect a URL properly

URL Inspection tells you four things that matter. Check all four:

| Field | What you want to see |
|---|---|
| Coverage | "URL is on Google" |
| User-declared canonical | The page's own URL |
| Google-selected canonical | **The same URL** |
| Indexing allowed? | Yes |

**If Google-selected canonical differs from user-declared**, Google is
overriding you — that is the exact failure this pass fixed. Investigate before
doing anything else.

Also click **Test live URL** → **View crawled page** → **Screenshot** to confirm
Google renders the page. The pages use client-side motion, so it is worth
confirming the rendered HTML contains the real content (it does — content is
server-rendered and the animation only affects opacity/transform).

### 2.5 Ongoing monitoring

**Weekly (5 minutes):**
- Pages report → is "Indexed" climbing? Any new "Excluded" reasons?
- Watch specifically for "Duplicate, Google chose different canonical" and
  "Alternate page with proper canonical tag". Either means a regression.

**Monthly (20 minutes):**
- Performance report → set date range to last 28 days, compare to previous.
- Filter by **Page** to see which of the new pages earn impressions.
- Filter by **Query** → sort by impressions with low CTR → those are titles and
  descriptions worth rewriting.
- Check **Core Web Vitals** and **Mobile Usability** for new failures.

**After every deploy that changes content:**
- Re-submit the sitemap (it is cheap and re-triggers discovery).
- Spot-check one changed URL with URL Inspection.

### 2.6 What "good" looks like at 90 days

Realistic for a site with a near-zero starting index and no backlinks:

- All 33 sitemap URLs indexed (this is achievable and is the main goal).
- Impressions on long-tail queries matching the industry and solution pages.
- Very few clicks yet. Rankings for competitive terms like "AI automation
  company" take much longer than 90 days without authority.

Do not judge this by rankings at 90 days. Judge it by **indexation coverage**
and **impression growth**, which are the leading indicators.

---

## 3. Business information consistency (NAP)

Google cross-references your business details across the web. Inconsistency
weakens entity confidence. Use exactly these values everywhere.

| Field | Canonical value |
|---|---|
| Business name | FlowFoundry AI Solutions |
| Short name | FlowFoundry |
| Website | https://www.flowfoundryai.in |
| Email | info@flowfoundryai.in |
| Phone / WhatsApp | +91 73309 37354 |
| Founder | Sri Harsha M |
| Category | AI automation and custom software development |
| Service area | India |

### Checklist

- [ ] Website footer and contact page — done, matches the table
- [ ] Organization schema — done, generated from `src/lib/site.ts`
- [ ] Company LinkedIn page — create, then paste the URL into `PROFILES.companyLinkedIn`
- [ ] Founder LinkedIn — paste into `PROFILES.founderLinkedIn`
- [ ] GitHub — paste into `PROFILES.founderGitHub`
- [ ] Email signatures across the team
- [ ] Any directory listing you create
- [ ] Invoices and proposals

### On Google Business Profile

**Only create one if you are eligible**, which means either a physical location
customers can visit, or a defined service area you genuinely travel to serve.

The site currently presents FlowFoundry as a remote-first distributed team and
makes no office claim — that was a deliberate decision. Creating a GBP with a
residential address you do not actually receive clients at risks suspension and
contradicts the site. If you do have a real business address, a GBP is one of
the highest-value local signals available, and you should then add the address
back to `organizationSchema()` in `src/lib/schema.ts` so the two agree.

**Never** create fake locations in other cities to chase local rankings.

---

## 4. Backlink and authority strategy

You currently have effectively no authority. That is normal and it is the real
ceiling on rankings — not on-page work, which is now in good shape.

### What to actually do, in priority order

**1. Client project mentions (highest value, lowest effort)**
When a client project goes live, ask for a credit link. A footer "Built by
FlowFoundry" or a line on their About page. Put this in the contract up front so
it is not an awkward ask later. Relevant, contextual, and genuinely earned.

**2. Founder presence**
A real LinkedIn presence for Sri Harsha, posting the same material as the
Insights articles. This does not pass link equity directly but it builds the
entity association between the person and the topic, which feeds E-E-A-T.

**3. GitHub**
Open-source something small and genuinely useful from the work you are already
doing — a WhatsApp template validator, a timezone-safe scheduling helper, an
idempotency wrapper. A GitHub profile with real repos is a credible signal for a
technical company and a natural link source.

**4. Startup and technology directories**
Only ones with real editorial standards and real traffic. Worth it: Product
Hunt (when LeadPulz launches), relevant Indian startup directories, AI tool
directories that actually review submissions. Not worth it: anything that
accepts every submission automatically.

**5. Guest technical articles**
Pitch the *specific* engineering content — the commission ledger design, the
voice latency work, timezone-safe scheduling. Publications want specificity, and
you have genuinely unusual material in the case studies.

**6. Product launch**
When LeadPulz is ready, a proper launch is one of the few events that generates
a burst of natural links. Prepare for it rather than doing it casually.

**7. Case-study collaborations**
Co-publish a write-up with a client. They get content, you get a link and a
third-party validation you cannot self-declare.

### Do not do any of this

Paid link farms, bulk backlink packages, PBNs, automated directory submission,
comment links, fake guest posts on sites that exist only to sell links, or
reciprocal link schemes. These carry real penalty risk and the recovery cost
exceeds any short-term gain.

---

## 5. Conversion tracking

Event names are defined in `src/lib/analytics.ts` and pushed to
`window.dataLayer`, which is GTM-native and GA4-compatible.

| Event | Fires when |
|---|---|
| `book_consultation_click` | A primary CTA is clicked |
| `contact_form_start` | First interaction with any contact form field |
| `contact_form_submit` | Contact form passes validation and submits |
| `whatsapp_click` | Any WhatsApp link |
| `phone_click` | Any `tel:` link |
| `email_click` | Any `mailto:` link |
| `case_study_view` | A case study page is viewed |
| `service_page_view` | A solution page is viewed |
| `article_cta_click` | The in-article CTA is clicked |

**Nothing is tracked until you install a container.** `track()` is a no-op when
`window.dataLayer` does not exist — so the site ships with no tracking by
default, which is the honest default. To enable:

1. Create a GTM container, add the snippet to `src/app/layout.tsx`.
2. In GTM, create a GA4 Event tag per event name above, triggered by a Custom
   Event trigger matching that name.
3. In GA4, mark `contact_form_submit` and `book_consultation_click` as
   conversions.
4. Update `/privacy` to disclose analytics before you enable it, and add a
   consent mechanism if you are targeting EU visitors.

---

## 6. 90-day content plan

Three articles are published. The principle is **few and substantial** — thin
pages dilute topical signal and give a reader no reason to trust you. One
genuinely good article a fortnight beats four shallow ones a week.

Each article should follow the pattern already established: a real workflow, a
concrete example, an explicit statement of what *not* to automate, an FAQ, and
internal links to the relevant solution, industry and case-study pages.

### Days 1–30 — indexation and foundations

Content is secondary this month. Priority is getting the existing 33 pages
indexed.

| Week | Action |
|---|---|
| 1 | Deploy. Verify GSC domain property. Submit sitemap. Request indexing on the homepage, `/solutions`, `/contact`. |
| 1 | Fill in `PROFILES` in `src/lib/site.ts` with real LinkedIn and GitHub URLs. Redeploy. |
| 2 | Request indexing on all six solution pages. Publish **"What happens during an automation consultation"** — short, high commercial intent, directly supports the primary conversion. |
| 3 | Request indexing on industry and case-study pages. Begin founder LinkedIn posting, reusing article material. |
| 4 | Publish **"How AI lead qualification actually works"**. Links to `/solutions/crm-automation` and `/solutions/ai-voice-agents`. Review first GSC coverage data. |

### Days 31–60 — depth on what shows traction

Check GSC Performance at day 30. Whichever solution or industry page earns
impressions first, write toward it.

| Week | Action |
|---|---|
| 5 | Publish **"How to connect AI voice agents with your CRM"**. The most technically specific piece; strongest candidate for genuine links. |
| 6 | Add a fourth case study, or add verified metrics to an existing one. Any real measured number materially strengthens the whole section. |
| 7 | Publish **"Shopify automation: the workflows worth automating first"**. Supports `/solutions/shopify-automation` and `/industries/ecommerce`, both currently thin on inbound links. |
| 8 | First backlink push: client credit links, one directory submission, one guest pitch. Review GSC: which queries appear? |

### Days 61–90 — authority and conversion

| Week | Action |
|---|---|
| 9 | Publish **"How we design multi-level affiliate commission systems"**. Unusual, specific, drawn from real work — the best link-earning candidate in the backlog. |
| 10 | Publish **"What a custom business operations portal can replace"**. Supports `/solutions/custom-business-portals`, currently the least-supported solution page. |
| 11 | Conversion review: GA4 funnel from page view to `contact_form_submit`. Rewrite the weakest-CTR titles identified in GSC. |
| 12 | Publish **"AI calling vs traditional sales calling"**. Review the quarter: indexation coverage, impressions by page, conversion count. Plan the next 90 days from that data rather than from this list. |

### Backlog beyond 90 days

- "WhatsApp automation compliance: templates, opt-in and what gets you banned"
- "Why we do not automate complaints"
- "Choosing between building and buying an internal tool"
- An industry page for a vertical that shows unexpected traction in GSC

### Rules for every article

1. Draw from work actually done. If you cannot describe a real mechanism, do not
   write it.
2. Include at least one thing you would *not* automate. This is the most
   credible thing on the page.
3. Never quote an industry statistic you have not verified. Describe operational
   change instead.
4. Internal-link to at least one solution page, one industry page and one case
   study.
5. Update `updated` in `src/lib/content/insights.ts` when you materially revise
   an article. It feeds `dateModified` in the schema and `lastmod` in the sitemap.
6. Do not publish stubs. `PLANNED_ARTICLES` exists so the plan is visible
   without shipping empty pages.

---

## 7. Adding content without breaking anything

All content lives in `src/lib/content/`. Adding an entry generates the page, the
sitemap entry, the schema and the internal links automatically.

| To add | Edit | Page appears at |
|---|---|---|
| A solution | `content/solutions.ts` | `/solutions/<slug>` |
| An industry | `content/industries.ts` | `/industries/<slug>` |
| A case study | `content/case-studies.ts` | `/case-studies/<slug>` |
| An article | `content/insights.ts` | `/insights/<slug>` |

Cross-references (`relatedSolutions`, `relatedIndustries`, `relatedCaseStudies`)
are slug arrays. Get one wrong and the link silently disappears rather than
404ing — so check the page after adding.

### Publishing a verified metric

In `content/case-studies.ts`, a `results` entry renders as "Pending measurement"
until it has **both** `value` and `verifiedOn`:

```ts
{
  label: "Time to first response",
  value: "4 minutes",        // only when actually measured
  verifiedOn: "2026-11-14",  // required alongside value
  method: "Median across 90 days of CRM timestamps",
}
```

This is enforced in the UI, not by convention. Do not remove the guard.

### Before every deploy

```bash
npm run typecheck
npm run build
```

The build fails on a bad slug reference or a broken import, so a green build
means the routes and links are structurally sound.
