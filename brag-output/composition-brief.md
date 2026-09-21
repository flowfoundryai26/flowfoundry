# Hyperframes Composition Brief: FlowFoundry AI Solutions

## Objective
Create a short launch-style brag video for FlowFoundry AI Solutions (and its flagship product, LeadPulz AI).

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 21 seconds

## Source Material
- Project root: `C:\Personal\AWS\Web_Projects\React-Apps\flowfoundry` (Next.js 16 / React 19 / Tailwind v4 site)
- Primary files read: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/site.ts`, `src/app/leadpulz/page.tsx`, `README.md`, `package.json`
- Product name: FlowFoundry AI Solutions (short: FlowFoundry); flagship product: LeadPulz AI
- Tagline / strongest claim: "Build intelligent systems around the way your business works."
- Key UI or visual moment to recreate: the hero "Intelligent Workflow" glass card — five numbered rows
  (New Lead → AI Agent → Business Logic → CRM + Calendar → Action) plus three outcome chips
  (Lead qualified · CRM updated · Meeting booked). Then the real LeadPulz dashboard screenshot with its stats.
- Copy that must appear verbatim:
  - "Build intelligent systems around the way your business works."
  - "AI • Automation • Software" (eyebrow)
  - Rows: "New Lead / Website enquiry", "AI Agent / Engage & understand", "Business Logic / Qualify & route", "CRM + Calendar / Sync business data", "Action / Book & follow up"
  - Chips: "Lead qualified", "CRM updated", "Meeting booked"
  - Stats: "627 Calls completed", "75.0% Connection rate", "28.1% Qualification rate", "11.8% Meetings booked"
  - "What would you automate if your team had more time?"
  - "FlowFoundry AI Solutions", "flowfoundryai.in"
  - Chip row: "AI Agents · Automation · Custom Software · Integrations"

## Creative Direction
- Tone preset: polished
- Creative direction: quiet premium B2B product film — the pipeline runs itself
- Interpretation: 4 scenes, 4–6s each. Light-weight Poppins display type, generous holds, soft crossfades.
  Restraint everywhere except two payoffs: the "Meeting booked" chip and the stat count-up.
- Angle: the site's hero pipeline card *is* the product. The video plays it forward — a lead arrives,
  rows light up one by one, a meeting is booked with nobody touching a keyboard — then cuts to the
  real LeadPulz dashboard where the numbers show it happening at scale.
- Hook: a "New Lead · Website enquiry" notification drops in on navy, then the hero headline rises under it.
- Outro / punchline: the site's closing question ("…more time?"), then logo + wordmark + URL + capability chips.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign (keep the site's navy/gradient identity and card language)

## Visual Identity
- Background (dark scenes): `#0A1330`; radial/blurred orbs blue `rgba(59,130,246,.30)`, violet `rgba(139,92,246,.25)`, cyan `rgba(6,182,212,.10)`; faint 64px grid lines at white ~4–6%
- Background (light scene): `#ffffff` canvas, `#f5f6f8` surface, borders `#e6e8ef`
- Text (dark): `#ffffff`; body `rgba(255,255,255,.72)`; labels `rgba(255,255,255,.55)`
- Text (light): ink `#252830`, slate `#535768`, muted `#666c79`, quiet `#8a8f9b`
- Accent: gradient `linear-gradient(90deg,#3ac9ff 0%,#6161ff 52%,#9450fd 100%)`; violet `#6161ff`; cyan `#3ac9ff`; emerald `#34d399`
- Display font: Poppins 300 (hero, letter-spacing -0.04em); Poppins 600 for card titles — Poppins is the brand font on every page of the site, so use it (it is in the Hyperframes embedded set)
- Body font: Poppins 400
- Visual references from the project: hero section (`page.tsx` ~L500–640), `HeroSystemVisual` (~L280–420), LeadPulz section (~L880–1000), CTA (~L1385–1440); assets `public/logo.png`, `public/images/dashboard.jpeg`

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook: a lead arrives — 4.5s — notification pill "01 New Lead / Website enquiry", eyebrow, hero headline with gradient "business works."
2. The pipeline runs itself — 6.0s — Intelligent Workflow card; 5 rows arrive one by one; 3 outcome chips; "Meeting booked" on the 8.74s cue
3. Proof: the LeadPulz dashboard — 6.0s — white frame, real `dashboard.jpeg` in a browser card with Ken Burns; 4 stat tiles count up; two floating chips
4. Outro — 4.5s — closing question on the 17.47s cue; logo + wordmark + URL + capability chips; music fades

## Audio
- Audio role: warm, steady bed under a restrained edit
- Audio arc: fade in under the notification → steady through the pipeline → one bell on "Meeting booked" → carries the dashboard alone → soft impact on logo → fade out
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (≈110 BPM)
- Music treatment: volume 0.32; 0.4s fade-in; fade out 19.8→21.0s via a `data-automation` volume lane
- Music cue guidance: bundled preset `.agents/skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`.
  Strong cues: 8.74s ("Meeting booked"), 10.93s (cut to dashboard), 17.47s (closing question). Beat grid for pipeline rows ≈ 4.91, 5.34, 6.00, 6.56, 7.09 (hold each ≥0.8s settled; chips on 8.19, 8.5, 8.74).
- Audio-reactive treatment: subtle — bass/RMS breathes the navy orbs' opacity and the AI Agent row glow (≤ 15% swing). No waveform/EQ/particles.
- Audio-coupled moments:
  - Scene 1 notification lands — soft drop
  - Scene 2 row 01 and row 05 land — soft drop (not every row)
  - Scene 2 "Meeting booked" chip — one bell (success)
  - Scene 3 stat count-ups — no SFX (music carries)
  - Scene 4 logo lands — one soft impact
- SFX selection guidance: low-HF-risk files only; polished restraint; ≤ 0.6 volume
- SFX analysis guidance: `.agents/skills/brag/assets/sfx/sfx-analysis.md` — candidates: `interface/drop_001.ogg`, `impact/impactBell_heavy_000.ogg`, `impact/impactSoft_medium_001.ogg`
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and any Hyperframes-selected SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (the pipeline card and the dashboard screenshot).
- Keep all text readable in the final render (headline ≥ 3s settled; short labels ≥ 0.8s).
- Keep the video within 15-25 seconds (21s).
- Include the planned music/SFX layer.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints; ignore cues that hurt readability or pacing.
- Major reveals may move toward strong cues within ±0.15s; smaller entrances within ±0.10s of a beat. Use 1–3 strong cue locks.
- Use SFX to support motion: soft drops for card-like reveals, one bell for the payoff, one soft impact for the logo; restraint elsewhere.
- Honor the music fade-out under the logo.
- Extract per-frame audio data with the `hyperframes-creative` helper and wire the orbs / AI Agent glow to it subtly. If extraction is unavailable, document it and continue.
- Use local assets only (music, SFX, images, GSAP from the scaffold's default).
- Run `hyperframes check` before render — it is brag's single gate.
