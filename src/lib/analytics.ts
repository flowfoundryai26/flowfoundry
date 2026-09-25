/**
 * Conversion event names and a single dispatch helper.
 *
 * Deliberately vendor-neutral: we push to window.dataLayer, which GTM reads
 * natively and which GA4 picks up once a tag is configured. Nothing here sets
 * cookies, fingerprints, or transmits anything on its own — if no dataLayer
 * exists (no consent, no container installed) every call is a silent no-op.
 * That keeps the site honest about tracking by default.
 */

export const EVENTS = {
  bookConsultationClick: "book_consultation_click",
  contactFormStart: "contact_form_start",
  contactFormSubmit: "contact_form_submit",
  whatsappClick: "whatsapp_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  caseStudyView: "case_study_view",
  servicePageView: "service_page_view",
  articleCtaClick: "article_cta_click",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

/**
 * Fire a conversion event. Safe to call during render-adjacent handlers and on
 * the server (where it does nothing).
 */
export function track(
  event: EventName,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, ...params });
}
