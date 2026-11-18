"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  GitBranch,
  Cpu,
  Clock,
  Buildings,
  FilePdf,
  UploadSimple,
  ArrowRight,
  CaretDown,
  Sparkle,
  Info,
  WarningCircle,
  CheckCircle,
  Copy,
  Laptop,
  Code,
  ShareNetwork,
  Check,
  X,
  EnvelopeSimple,
  ShieldCheck,
  User,
  Users,
  Briefcase,
  MapPin,
  Calendar,
} from "@phosphor-icons/react";
import { Container, Eyebrow, LiveDot, buttonClass } from "@/components/ui";
import { Reveal, Words, fadeUp, scaleIn, stagger, EASE } from "@/components/motion";
import { CAREERS_CONFIG, InternshipTrack } from "@/lib/careers-config";
import { SITE } from "@/lib/site";

export default function CareersView() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>("software-ai-engineering");
  const [copiedId, setCopiedId] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    college: "",
    degree: "",
    currentYear: "3rd Year",
    graduationYear: "",
    trackId: "software-ai-engineering",
    technicalSkills: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
    preferredStartDate: "Immediate / Next Batch",
    weeklyAvailability: "15–20 hours/week",
    canCommitThreeMonths: "yes",
    motivationStatement: "",
    unpaidAcknowledgement: false,
    noEmploymentGuaranteeAcknowledgement: false,
    privacyConsent: false,
    website_hp: "", // Honeypot field
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionResult, setSubmissionResult] = useState<{ applicationId: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadTime] = useState<number>(() => Date.now());

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Handle URL hash / query on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const trackParam = urlParams.get("track");
      if (trackParam && CAREERS_CONFIG.tracks.some((t) => t.id === trackParam)) {
        setSelectedTrackId(trackParam);
        setForm((prev) => ({ ...prev, trackId: trackParam }));
      }
    }
  }, []);

  const scrollToForm = (trackId?: string) => {
    if (trackId) {
      setSelectedTrackId(trackId);
      setForm((prev) => ({ ...prev, trackId }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTracks = () => {
    tracksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setForm((prev) => ({ ...prev, [name]: checked }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetResume(file);
    }
  };

  const validateAndSetResume = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, resume: "Resume file size exceeds the 5 MB limit." }));
      setResumeFile(null);
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFormErrors((prev) => ({ ...prev, resume: "Only PDF documents (.pdf) are accepted." }));
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim() || !/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) {
      errors.phone = "Please enter a valid phone number with country code.";
    }
    if (!form.city.trim()) {
      errors.city = "Please enter your city.";
    }
    if (!form.state.trim()) {
      errors.state = "Please enter your state.";
    }

    if (!form.college.trim()) {
      errors.college = "Please enter your college or university name.";
    }
    if (!form.degree.trim()) {
      errors.degree = "Please specify your degree / qualification.";
    }
    if (!form.currentYear) {
      errors.currentYear = "Please select your current year of study.";
    }

    if (!form.trackId) {
      errors.trackId = "Please choose an internship track.";
    }
    if (!form.technicalSkills.trim() || form.technicalSkills.trim().length < 2) {
      errors.technicalSkills = "Please list your technical skills.";
    }

    if (!resumeFile) {
      errors.resume = "Please upload your resume in PDF format (max 5 MB).";
    }

    if (!form.preferredStartDate) {
      errors.preferredStartDate = "Please select your preferred start timeline.";
    }
    if (!form.weeklyAvailability) {
      errors.weeklyAvailability = "Please select your weekly availability.";
    }
    if (form.canCommitThreeMonths !== "yes") {
      errors.canCommitThreeMonths = "Confirmation of 3-month commitment is required.";
    }

    if (!form.motivationStatement.trim() || form.motivationStatement.trim().length < 20) {
      errors.motivationStatement = "Please provide at least 20 characters explaining why you want to join.";
    } else if (form.motivationStatement.length > 1000) {
      errors.motivationStatement = "Statement cannot exceed 1,000 characters.";
    }

    if (!form.unpaidAcknowledgement) {
      errors.unpaidAcknowledgement = "You must confirm acknowledgement of the unpaid internship structure.";
    }
    if (!form.noEmploymentGuaranteeAcknowledgement) {
      errors.noEmploymentGuaranteeAcknowledgement = "You must acknowledge that this program does not guarantee employment.";
    }
    if (!form.privacyConsent) {
      errors.privacyConsent = "Consent to data processing under our Privacy Policy is required.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmissionStatus("submitting");
    setErrorMessage("");

    try {
      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("city", form.city);
      data.append("state", form.state);
      data.append("college", form.college);
      data.append("degree", form.degree);
      data.append("currentYear", form.currentYear);
      data.append("graduationYear", form.graduationYear);
      data.append("trackId", form.trackId);
      data.append("technicalSkills", form.technicalSkills);
      data.append("githubUrl", form.githubUrl);
      data.append("linkedinUrl", form.linkedinUrl);
      data.append("portfolioUrl", form.portfolioUrl);
      data.append("preferredStartDate", form.preferredStartDate);
      data.append("weeklyAvailability", form.weeklyAvailability);
      data.append("canCommitThreeMonths", form.canCommitThreeMonths === "yes" ? "true" : "false");
      data.append("motivationStatement", form.motivationStatement);
      data.append("unpaidAcknowledgement", String(form.unpaidAcknowledgement));
      data.append("noEmploymentGuaranteeAcknowledgement", String(form.noEmploymentGuaranteeAcknowledgement));
      data.append("privacyConsent", String(form.privacyConsent));
      data.append("website_hp", form.website_hp);
      data.append("_t", String(loadTime));

      if (resumeFile) {
        data.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setSubmissionStatus("error");
        setErrorMessage(json.message || "Failed to submit application. Please check your inputs.");
        if (json.errors) {
          setFormErrors(json.errors);
        }
        return;
      }

      setSubmissionStatus("success");
      setSubmissionResult({
        applicationId: json.applicationId || "FFA-APP",
        message: json.message,
      });
    } catch (err: unknown) {
      setSubmissionStatus("error");
      setErrorMessage("Network connection error. Please verify your connection and try again.");
    }
  };

  const copyApplicationId = () => {
    if (submissionResult?.applicationId) {
      navigator.clipboard.writeText(submissionResult.applicationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      college: "",
      degree: "",
      currentYear: "3rd Year",
      graduationYear: "",
      trackId: selectedTrackId,
      technicalSkills: "",
      githubUrl: "",
      linkedinUrl: "",
      portfolioUrl: "",
      preferredStartDate: "Immediate / Next Batch",
      weeklyAvailability: "15–20 hours/week",
      canCommitThreeMonths: "yes",
      motivationStatement: "",
      unpaidAcknowledgement: false,
      noEmploymentGuaranteeAcknowledgement: false,
      privacyConsent: false,
      website_hp: "",
    });
    setResumeFile(null);
    setFormErrors({});
    setSubmissionStatus("idle");
    setSubmissionResult(null);
  };

  return (
    <div className="w-full overflow-x-clip bg-ink text-body selection:bg-accent/20 selection:text-fg">
      {/* =========================================================
         1. HERO SECTION
      ========================================================= */}
      <section className="relative w-full overflow-hidden border-b border-line bg-ink pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Subtle engineering grid & glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full"
        />

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="max-w-4xl"
          >
            {/* Eyebrow & Status */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Eyebrow dark>{CAREERS_CONFIG.hero.eyebrow}</Eyebrow>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-2xs text-on-dark">
                <LiveDot />
                Accepting Applications
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-7 text-[clamp(2.4rem,5.2vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words text={CAREERS_CONFIG.hero.headline} delay={0.12} />
            </h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[58ch] text-base leading-relaxed text-body sm:text-lg lg:text-[19px]"
            >
              {CAREERS_CONFIG.hero.description}
            </motion.p>

            {/* Three Informational Tags */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {CAREERS_CONFIG.hero.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-ink-2 px-3 py-1.5 font-mono text-xs text-fg shadow-soft"
                >
                  <Sparkle className="h-3.5 w-3.5 text-accent" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Prominent Compensation Disclosure */}
            <motion.div
              variants={fadeUp}
              className="mt-6 inline-flex max-w-xl items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-3.5 text-xs text-amber-200/90 sm:text-sm"
            >
              <Info className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="font-semibold text-white">
                  {CAREERS_CONFIG.hero.compensationDisclosure}
                </strong>
                <p className="mt-0.5 text-amber-200/80 leading-relaxed">
                  This 3-month program is an unpaid, supervised learning experience focused on skill
                  development, engineering workflows, and mentorship. No stipend is provided.
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={scrollToTracks}
                className={buttonClass({ variant: "primary", size: "lg" })}
              >
                {CAREERS_CONFIG.hero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToForm()}
                className={buttonClass({ variant: "outlineOnDark", size: "lg" })}
              >
                {CAREERS_CONFIG.hero.secondaryCta}
              </button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* =========================================================
         2. ABOUT THE INTERNSHIP
      ========================================================= */}
      <section className="w-full bg-surface py-20 lg:py-28 border-b border-line">
        <Container>
          <Reveal amount={0.2} className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Eyebrow>PHILOSOPHY & PURPOSE</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                {CAREERS_CONFIG.about.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-body sm:text-lg">
                {CAREERS_CONFIG.about.description}
              </p>
            </motion.div>
          </Reveal>

          {/* 4 Feature Cards */}
          <Reveal
            amount={0.15}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CAREERS_CONFIG.about.pillars.map((pillar, i) => {
              const icons = [Laptop, Users, GitBranch, Briefcase];
              const IconComponent = icons[i % icons.length];
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="group relative flex flex-col rounded-xl border border-line bg-ink-2 p-6 transition-all duration-300 hover:border-line-strong hover:bg-ink-3 shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-fg group-hover:border-accent/40 group-hover:text-accent transition-colors">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-fg">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </Reveal>

          {/* Non-employment clarity note */}
          <Reveal amount={0.2} className="mt-10">
            <motion.div
              variants={fadeUp}
              className="rounded-lg border border-line bg-ink-2/60 p-4 text-xs leading-relaxed text-muted sm:text-sm"
            >
              <span className="font-semibold text-fg">Program Scope Notice:</span> The FlowFoundry
              Internship is structured for technical skill acceleration. It does not promise full-time
              hiring, placement guarantees, commercial compensation, or direct commit access to commercial client
              systems.
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         3. INTERNSHIP PROGRAM DETAILS
      ========================================================= */}
      <section id="program-details" className="w-full bg-ink py-20 lg:py-28 border-b border-line">
        <Container>
          <Reveal amount={0.2}>
            <motion.div variants={fadeUp} className="max-w-2xl">
              <Eyebrow>SPECIFICATIONS</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Program Structure & Logistics
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                Structured, transparent expectations designed to fit academic calendars and learning goals.
              </p>
            </motion.div>
          </Reveal>

          <Reveal
            amount={0.15}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                label: "Program Name",
                value: CAREERS_CONFIG.program.name,
                icon: GraduationCap,
              },
              {
                label: "Duration",
                value: CAREERS_CONFIG.program.duration,
                detail: "12 Weeks of guided phases",
                icon: Clock,
              },
              {
                label: "Compensation",
                value: CAREERS_CONFIG.program.compensation,
                detail: "Educational, unpaid learning program",
                icon: Info,
                highlight: true,
              },
              {
                label: "Work Mode",
                value: CAREERS_CONFIG.program.mode,
                detail: "Collaborative remote engineering",
                icon: ShareNetwork,
              },
              {
                label: "Schedule",
                value: "Flexible Hours",
                detail: CAREERS_CONFIG.program.schedule,
                icon: Calendar,
              },
              {
                label: "Completion Credential",
                value: "Completion Certificate",
                detail: CAREERS_CONFIG.program.completion,
                icon: ShieldCheck,
              },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className={`flex flex-col justify-between rounded-xl border p-6 transition-colors ${
                    item.highlight
                      ? "border-amber-500/30 bg-amber-500/[0.04]"
                      : "border-line bg-ink-2"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xs uppercase tracking-wider text-muted">
                        {item.label}
                      </span>
                      <IconComp
                        className={`h-5 w-5 ${
                          item.highlight ? "text-amber-400" : "text-muted"
                        }`}
                      />
                    </div>
                    <div className="mt-3 text-lg font-medium text-fg">
                      {item.value}
                    </div>
                  </div>
                  {item.detail && (
                    <div className="mt-3 text-xs leading-relaxed text-body border-t border-line/50 pt-3">
                      {item.detail}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </Reveal>

          {/* Legal and Compliance Callout */}
          <Reveal amount={0.2} className="mt-10">
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-line-strong bg-surface p-5 sm:p-6"
            >
              <div className="flex items-start gap-3.5">
                <WarningCircle className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-body leading-relaxed">
                  <span className="font-semibold text-fg">
                    Regulatory & Educational Framework:
                  </span>{" "}
                  {CAREERS_CONFIG.program.legalNotice}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         4. INTERNSHIP TRACKS
      ========================================================= */}
      <section
        id="internship-tracks"
        ref={tracksRef}
        className="w-full bg-surface py-20 lg:py-28 border-b border-line"
      >
        <Container>
          <Reveal amount={0.2}>
            <motion.div variants={fadeUp} className="max-w-3xl">
              <Eyebrow>INTERNSHIP TRACKS</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Specialized Learning Paths
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                Choose the engineering track that best aligns with your foundational skills and learning
                aspirations. Track statuses are actively managed based on mentor availability.
              </p>
            </motion.div>
          </Reveal>

          <Reveal amount={0.15} className="mt-14 grid gap-8 lg:grid-cols-3">
            {CAREERS_CONFIG.tracks.map((track) => {
              const isOpen = track.isOpen;
              return (
                <motion.div
                  key={track.id}
                  variants={fadeUp}
                  className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 p-7 ${
                    isOpen
                      ? "border-cyan-500/30 bg-ink-2 shadow-[0_4px_24px_-8px_rgba(6,182,212,0.12)]"
                      : "border-line bg-ink-2/60 opacity-90"
                  }`}
                >
                  <div>
                    {/* Status Pill */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-2xs ${
                          isOpen
                            ? "border border-live/30 bg-live/10 text-live"
                            : "border border-white/10 bg-white/5 text-muted"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isOpen ? "bg-live" : "bg-muted"
                          }`}
                        />
                        {track.statusLabel}
                      </span>
                      <span className="font-mono text-2xs text-muted">3 Months</span>
                    </div>

                    <h3 className="mt-5 text-xl font-medium text-fg">
                      {track.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-body">
                      {track.summary}
                    </p>

                    {/* Skills Required */}
                    <div className="mt-6">
                      <div className="font-mono text-2xs uppercase tracking-wider text-muted">
                        Foundational Skills:
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {track.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-line bg-ink px-2.5 py-1 text-xs text-fg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learning Areas */}
                    <div className="mt-6 border-t border-line/60 pt-5">
                      <div className="font-mono text-2xs uppercase tracking-wider text-muted">
                        Key Learning Areas:
                      </div>
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-body">
                        {track.learningAreas.map((area) => (
                          <li key={area} className="flex items-start gap-2">
                            <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="mt-8 pt-6 border-t border-line/60">
                    {isOpen ? (
                      <button
                        type="button"
                        onClick={() => scrollToForm(track.id)}
                        className={`${buttonClass({
                          variant: "primary",
                          size: "md",
                        })} w-full`}
                      >
                        Apply for This Track
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollToForm(track.id)}
                        className={`${buttonClass({
                          variant: "secondary",
                          size: "md",
                        })} w-full`}
                      >
                        Join Track Waitlist
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         5. THREE-MONTH LEARNING ROADMAP
      ========================================================= */}
      <section className="w-full bg-ink py-20 lg:py-28 border-b border-line">
        <Container>
          <Reveal amount={0.2}>
            <motion.div variants={fadeUp} className="max-w-3xl">
              <Eyebrow>LEARNING PROGRESSION</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Three-Month Structured Roadmap
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                A graduated, milestone-driven progression designed to guide you from orientation to independent
                technical execution.
              </p>
            </motion.div>
          </Reveal>

          <Reveal amount={0.15} className="mt-14 grid gap-8 lg:grid-cols-3">
            {CAREERS_CONFIG.roadmap.map((stage, i) => (
              <motion.div
                key={stage.month}
                variants={fadeUp}
                className="relative flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-7 shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {stage.month}
                    </span>
                    <span className="font-mono text-2xs text-muted">Phase 0{i + 1}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-medium text-fg">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-body">
                    {stage.summary}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {stage.milestones.map((milestone) => (
                      <li key={milestone} className="flex items-start gap-2.5 text-xs text-fg leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-line/60 pt-4 font-mono text-2xs text-muted">
                  Supervised Review & Feedback
                </div>
              </motion.div>
            ))}
          </Reveal>

          <Reveal amount={0.2} className="mt-8">
            <motion.p
              variants={fadeUp}
              className="text-xs text-muted text-center max-w-2xl mx-auto leading-relaxed"
            >
              * Note: Specific exercises, tools, and technical assignments are tailored dynamically based on the
              chosen track and the intern&apos;s demonstrated baseline experience.
            </motion.p>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         6. APPLICATION PROCESS (4 STEPS)
      ========================================================= */}
      <section className="w-full bg-surface py-20 lg:py-24 border-b border-line">
        <Container>
          <Reveal amount={0.2}>
            <motion.div variants={fadeUp} className="max-w-2xl">
              <Eyebrow>HOW SELECTION WORKS</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Four-Step Application Flow
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                A straightforward, collaborative evaluation process focused on baseline readiness and curiosity.
              </p>
            </motion.div>
          </Reveal>

          <Reveal amount={0.15} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAREERS_CONFIG.process.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="relative flex flex-col rounded-xl border border-line bg-ink-2 p-6"
              >
                <div className="font-mono text-2xl font-semibold tracking-tighter text-accent/80">
                  {step.step}
                </div>
                <h3 className="mt-4 text-base font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-body">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </Reveal>

          <Reveal amount={0.2} className="mt-8">
            <motion.p
              variants={fadeUp}
              className="text-xs text-muted text-center max-w-xl mx-auto leading-relaxed"
            >
              FlowFoundry evaluates each application thoroughly. Due to cohort size constraints, submitting an
              application does not guarantee an interview invitation or program acceptance.
            </motion.p>
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         7. APPLICATION FORM
      ========================================================= */}
      <section
        id="apply-form"
        ref={formRef}
        className="w-full bg-ink py-20 lg:py-28 border-b border-line scroll-mt-24"
      >
        <Container className="max-w-4xl">
          <Reveal amount={0.15}>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
              <Eyebrow>APPLICATION FORM</Eyebrow>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white text-balance">
                Apply for the Internship
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                Fill out the application below. Please ensure your contact details and resume are accurate so
                we can review your background effectively.
              </p>
            </motion.div>
          </Reveal>

          {/* Submission Feedback Messages */}
          <div className="mt-12">
            {submissionStatus === "success" && submissionResult ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-live/30 bg-ink-2 p-8 sm:p-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-live/15 text-live">
                  <CheckCircle className="h-9 w-9" />
                </div>
                <h3 className="mt-6 text-2xl font-medium text-white">
                  Application Received Successfully
                </h3>
                <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-body">
                  Thank you for applying to FlowFoundry AI Solutions. We have received your technical profile
                  and resume. A confirmation email has been dispatched to{" "}
                  <span className="font-semibold text-fg">{form.email}</span>.
                </p>

                {/* Application ID Card */}
                <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 rounded-lg border border-line-strong bg-surface px-6 py-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    Your Application ID:
                  </span>
                  <span className="font-mono text-lg font-bold text-white tracking-wider">
                    {submissionResult.applicationId}
                  </span>
                  <button
                    type="button"
                    onClick={copyApplicationId}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-ink px-2.5 py-1 text-xs text-fg hover:border-accent hover:text-accent transition-colors"
                  >
                    {copiedId ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-live" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 border-t border-line pt-6 text-xs text-muted max-w-lg mx-auto">
                  <p>
                    Our engineering team reviews applications in batches. If shortlisted, you will receive an
                    email invitation for a technical discussion within 7–10 business days.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={resetForm}
                    className={buttonClass({ variant: "secondary", size: "sm" })}
                  >
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-10 lg:p-12 shadow-dark"
              >
                {/* Honeypot field (hidden from visual users and bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Do not fill this field</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website_hp}
                    onChange={(e) => setForm((p) => ({ ...p, website_hp: e.target.value }))}
                  />
                </div>

                {/* Error Banner */}
                {submissionStatus === "error" && (
                  <div
                    role="alert"
                    className="mb-8 flex items-start gap-3 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
                  >
                    <WarningCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Submission could not be completed:</strong>
                      <p className="mt-0.5 text-xs sm:text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* SECTION 1: Personal Information */}
                <div>
                  <h3 className="flex items-center gap-2 text-base font-medium text-fg border-b border-line pb-3">
                    <User className="h-4 w-4 text-accent" />
                    1. Personal Information
                  </h3>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div id="field-fullName">
                      <label htmlFor="fullName" className="block text-xs font-medium text-fg mb-1.5">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.fullName}
                        aria-describedby={formErrors.fullName ? "error-fullName" : undefined}
                        placeholder="e.g. Ananya Sharma"
                        value={form.fullName}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.fullName ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p id="error-fullName" className="mt-1 text-2xs text-danger">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div id="field-email">
                      <label htmlFor="email" className="block text-xs font-medium text-fg mb-1.5">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "error-email" : undefined}
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.email ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.email && (
                        <p id="error-email" className="mt-1 text-2xs text-danger">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div id="field-phone">
                      <label htmlFor="phone" className="block text-xs font-medium text-fg mb-1.5">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.phone}
                        aria-describedby={formErrors.phone ? "error-phone" : undefined}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.phone ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.phone && (
                        <p id="error-phone" className="mt-1 text-2xs text-danger">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Location (City & State) */}
                    <div className="grid grid-cols-2 gap-3" id="field-city">
                      <div>
                        <label htmlFor="city" className="block text-xs font-medium text-fg mb-1.5">
                          City <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          aria-required="true"
                          placeholder="e.g. Vijayawada"
                          value={form.city}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                            formErrors.city ? "border-danger" : "border-line-strong"
                          }`}
                        />
                      </div>
                      <div id="field-state">
                        <label htmlFor="state" className="block text-xs font-medium text-fg mb-1.5">
                          State <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          aria-required="true"
                          placeholder="e.g. Andhra Pradesh"
                          value={form.state}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                            formErrors.state ? "border-danger" : "border-line-strong"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Education */}
                <div className="mt-10">
                  <h3 className="flex items-center gap-2 text-base font-medium text-fg border-b border-line pb-3">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    2. Academic Background
                  </h3>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* College */}
                    <div id="field-college" className="sm:col-span-2">
                      <label htmlFor="college" className="block text-xs font-medium text-fg mb-1.5">
                        College / University <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        required
                        aria-required="true"
                        placeholder="e.g. National Institute of Technology, Andhra Pradesh"
                        value={form.college}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.college ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.college && (
                        <p className="mt-1 text-2xs text-danger">{formErrors.college}</p>
                      )}
                    </div>

                    {/* Degree */}
                    <div id="field-degree">
                      <label htmlFor="degree" className="block text-xs font-medium text-fg mb-1.5">
                        Degree / Qualification <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        required
                        aria-required="true"
                        placeholder="e.g. B.Tech Computer Science / BCA / MCA"
                        value={form.degree}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.degree ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.degree && (
                        <p className="mt-1 text-2xs text-danger">{formErrors.degree}</p>
                      )}
                    </div>

                    {/* Year of study */}
                    <div id="field-currentYear">
                      <label htmlFor="currentYear" className="block text-xs font-medium text-fg mb-1.5">
                        Current Year of Study <span className="text-accent">*</span>
                      </label>
                      <select
                        id="currentYear"
                        name="currentYear"
                        required
                        aria-required="true"
                        value={form.currentYear}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="1st Year">1st Year Undergraduate</option>
                        <option value="2nd Year">2nd Year Undergraduate</option>
                        <option value="3rd Year">3rd Year Undergraduate</option>
                        <option value="4th Year">4th Year Undergraduate / Final Year</option>
                        <option value="Postgraduate">Postgraduate (M.Tech / MCA / MS)</option>
                        <option value="Recent Graduate">Recent Graduate</option>
                        <option value="Self-Taught / Career Transition">Self-Taught / Career Transition</option>
                      </select>
                    </div>

                    {/* Graduation year (optional) */}
                    <div>
                      <label htmlFor="graduationYear" className="block text-xs font-medium text-fg mb-1.5">
                        Expected Graduation Year <span className="text-muted text-2xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="graduationYear"
                        name="graduationYear"
                        placeholder="e.g. 2026"
                        value={form.graduationYear}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Technical Profile */}
                <div className="mt-10">
                  <h3 className="flex items-center gap-2 text-base font-medium text-fg border-b border-line pb-3">
                    <Code className="h-4 w-4 text-accent" />
                    3. Technical Profile & Track
                  </h3>

                  <div className="mt-6 space-y-5">
                    {/* Track selection */}
                    <div id="field-trackId">
                      <label htmlFor="trackId" className="block text-xs font-medium text-fg mb-1.5">
                        Select Internship Track <span className="text-accent">*</span>
                      </label>
                      <select
                        id="trackId"
                        name="trackId"
                        required
                        aria-required="true"
                        value={form.trackId}
                        onChange={(e) => {
                          handleInputChange(e);
                          setSelectedTrackId(e.target.value);
                        }}
                        className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        {CAREERS_CONFIG.tracks.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} {t.isOpen ? "(Accepting Applications)" : `(${t.statusLabel})`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Technical Skills */}
                    <div id="field-technicalSkills">
                      <label htmlFor="technicalSkills" className="block text-xs font-medium text-fg mb-1.5">
                        Technical Skills <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="technicalSkills"
                        name="technicalSkills"
                        required
                        aria-required="true"
                        placeholder="e.g. Python, TypeScript, React, Next.js, PostgreSQL, Git"
                        value={form.technicalSkills}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.technicalSkills ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.technicalSkills && (
                        <p className="mt-1 text-2xs text-danger">{formErrors.technicalSkills}</p>
                      )}
                    </div>

                    {/* Links */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label htmlFor="githubUrl" className="block text-xs font-medium text-fg mb-1.5">
                          GitHub Profile URL
                        </label>
                        <input
                          type="url"
                          id="githubUrl"
                          name="githubUrl"
                          placeholder="https://github.com/username"
                          value={form.githubUrl}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label htmlFor="linkedinUrl" className="block text-xs font-medium text-fg mb-1.5">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          id="linkedinUrl"
                          name="linkedinUrl"
                          placeholder="https://linkedin.com/in/username"
                          value={form.linkedinUrl}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label htmlFor="portfolioUrl" className="block text-xs font-medium text-fg mb-1.5">
                          Portfolio / Website URL
                        </label>
                        <input
                          type="url"
                          id="portfolioUrl"
                          name="portfolioUrl"
                          placeholder="https://yourportfolio.dev"
                          value={form.portfolioUrl}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Dropzone */}
                    <div id="field-resume" className="pt-2">
                      <label className="block text-xs font-medium text-fg mb-1.5">
                        Resume Upload (PDF Only, Max 5 MB) <span className="text-accent">*</span>
                      </label>

                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) validateAndSetResume(file);
                        }}
                        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
                          formErrors.resume
                            ? "border-danger bg-danger/5"
                            : resumeFile
                            ? "border-live/40 bg-live/[0.03]"
                            : "border-line-strong bg-surface hover:border-accent/40"
                        }`}
                      >
                        {resumeFile ? (
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-live/15 text-live">
                              <FilePdf className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                              <div className="text-sm font-medium text-white truncate max-w-[260px] sm:max-w-sm">
                                {resumeFile.name}
                              </div>
                              <div className="text-2xs text-muted">
                                {(resumeFile.size / 1024).toFixed(1)} KB · PDF Document
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="ml-2 rounded-md p-1.5 text-muted hover:bg-ink hover:text-white"
                              aria-label="Remove selected resume"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <UploadSimple className="h-8 w-8 text-muted mb-2" />
                            <div className="text-xs text-body text-center">
                              <label
                                htmlFor="resume-file"
                                className="cursor-pointer font-medium text-fg hover:text-accent underline underline-offset-2"
                              >
                                Click to choose PDF
                              </label>{" "}
                              or drag and drop here
                            </div>
                            <span className="mt-1 font-mono text-2xs text-muted">
                              PDF only up to 5 MB. Files are stored securely and privately.
                            </span>
                            <input
                              type="file"
                              id="resume-file"
                              accept=".pdf,application/pdf"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </>
                        )}
                      </div>
                      {formErrors.resume && (
                        <p className="mt-1.5 text-2xs text-danger">{formErrors.resume}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Availability & Motivation */}
                <div className="mt-10">
                  <h3 className="flex items-center gap-2 text-base font-medium text-fg border-b border-line pb-3">
                    <Clock className="h-4 w-4 text-accent" />
                    4. Availability & Commitment
                  </h3>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* Preferred Start Date */}
                    <div id="field-preferredStartDate">
                      <label htmlFor="preferredStartDate" className="block text-xs font-medium text-fg mb-1.5">
                        Preferred Start Timeline <span className="text-accent">*</span>
                      </label>
                      <select
                        id="preferredStartDate"
                        name="preferredStartDate"
                        required
                        aria-required="true"
                        value={form.preferredStartDate}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="Immediate / Next Batch">Immediate / Next Upcoming Cohort</option>
                        <option value="Within 2 Weeks">Within 2 Weeks</option>
                        <option value="Within 1 Month">Next Month</option>
                        <option value="Next Academic Semester">Next Academic Semester</option>
                      </select>
                    </div>

                    {/* Weekly Availability */}
                    <div id="field-weeklyAvailability">
                      <label htmlFor="weeklyAvailability" className="block text-xs font-medium text-fg mb-1.5">
                        Weekly Availability <span className="text-accent">*</span>
                      </label>
                      <select
                        id="weeklyAvailability"
                        name="weeklyAvailability"
                        required
                        aria-required="true"
                        value={form.weeklyAvailability}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="15–20 hours/week">15–20 hours / week (Recommended)</option>
                        <option value="20–30 hours/week">20–30 hours / week</option>
                        <option value="30+ hours/week">30+ hours / week (Full focus)</option>
                      </select>
                    </div>

                    {/* 3-Month Commitment */}
                    <div id="field-canCommitThreeMonths" className="sm:col-span-2">
                      <label className="block text-xs font-medium text-fg mb-1.5">
                        Can you commit to the full 3-month program? <span className="text-accent">*</span>
                      </label>
                      <div className="flex items-center gap-6 mt-1">
                        <label className="inline-flex items-center gap-2 text-sm text-fg cursor-pointer">
                          <input
                            type="radio"
                            name="canCommitThreeMonths"
                            value="yes"
                            checked={form.canCommitThreeMonths === "yes"}
                            onChange={handleInputChange}
                            className="text-accent focus:ring-accent"
                          />
                          <span>Yes, I can commit for 3 months</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm text-fg cursor-pointer">
                          <input
                            type="radio"
                            name="canCommitThreeMonths"
                            value="no"
                            checked={form.canCommitThreeMonths === "no"}
                            onChange={handleInputChange}
                            className="text-accent focus:ring-accent"
                          />
                          <span>No</span>
                        </label>
                      </div>
                      {formErrors.canCommitThreeMonths && (
                        <p className="mt-1 text-2xs text-danger">{formErrors.canCommitThreeMonths}</p>
                      )}
                    </div>

                    {/* Motivation Statement */}
                    <div id="field-motivationStatement" className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="motivationStatement" className="block text-xs font-medium text-fg">
                          Why do you want to join FlowFoundry? <span className="text-accent">*</span>
                        </label>
                        <span
                          className={`font-mono text-2xs ${
                            form.motivationStatement.length > 900
                              ? "text-amber-400"
                              : form.motivationStatement.length > 1000
                              ? "text-danger"
                              : "text-muted"
                          }`}
                        >
                          {form.motivationStatement.length} / 1,000 characters
                        </span>
                      </div>
                      <textarea
                        id="motivationStatement"
                        name="motivationStatement"
                        rows={4}
                        maxLength={1000}
                        required
                        aria-required="true"
                        placeholder="Tell us about what you want to learn, past projects you've built, and why this internship fits your technical journey..."
                        value={form.motivationStatement}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-surface p-3 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
                          formErrors.motivationStatement ? "border-danger" : "border-line-strong"
                        }`}
                      />
                      {formErrors.motivationStatement && (
                        <p className="mt-1 text-2xs text-danger">{formErrors.motivationStatement}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Explicit Acknowledgements */}
                <div className="mt-10 border-t border-line pt-8">
                  <h3 className="text-base font-medium text-fg mb-4">
                    5. Program Acknowledgements & Consents
                  </h3>

                  <div className="space-y-4">
                    {/* Unpaid acknowledgement */}
                    <div id="field-unpaidAcknowledgement" className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="unpaidAcknowledgement"
                        checked={form.unpaidAcknowledgement}
                        onChange={(e) => handleCheckboxChange("unpaidAcknowledgement", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-line-strong bg-surface text-accent focus:ring-accent"
                      />
                      <label htmlFor="unpaidAcknowledgement" className="text-xs text-body leading-relaxed cursor-pointer">
                        <strong className="text-fg">Unpaid Program Structure:</strong> I understand that this
                        is a 3-month unpaid internship focused on learning and does not include a stipend or
                        monetary compensation. <span className="text-accent">*</span>
                      </label>
                    </div>
                    {formErrors.unpaidAcknowledgement && (
                      <p className="ml-7 text-2xs text-danger">{formErrors.unpaidAcknowledgement}</p>
                    )}

                    {/* Employment disclaimer */}
                    <div id="field-noEmploymentGuaranteeAcknowledgement" className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="noEmploymentGuaranteeAcknowledgement"
                        checked={form.noEmploymentGuaranteeAcknowledgement}
                        onChange={(e) =>
                          handleCheckboxChange("noEmploymentGuaranteeAcknowledgement", e.target.checked)
                        }
                        className="mt-1 h-4 w-4 rounded border-line-strong bg-surface text-accent focus:ring-accent"
                      />
                      <label
                        htmlFor="noEmploymentGuaranteeAcknowledgement"
                        className="text-xs text-body leading-relaxed cursor-pointer"
                      >
                        <strong className="text-fg">No Employment Guarantee:</strong> I understand that
                        participation or completion of this internship does not guarantee future employment or
                        a permanent job offer from FlowFoundry AI Solutions. <span className="text-accent">*</span>
                      </label>
                    </div>
                    {formErrors.noEmploymentGuaranteeAcknowledgement && (
                      <p className="ml-7 text-2xs text-danger">
                        {formErrors.noEmploymentGuaranteeAcknowledgement}
                      </p>
                    )}

                    {/* Privacy consent */}
                    <div id="field-privacyConsent" className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        checked={form.privacyConsent}
                        onChange={(e) => handleCheckboxChange("privacyConsent", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-line-strong bg-surface text-accent focus:ring-accent"
                      />
                      <label htmlFor="privacyConsent" className="text-xs text-body leading-relaxed cursor-pointer">
                        <strong className="text-fg">Data Processing Consent:</strong> I consent to FlowFoundry
                        AI Solutions processing my application information and resume for recruitment and
                        selection purposes, as described in the{" "}
                        <Link
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline underline-offset-2 hover:text-accent-strong"
                        >
                          Privacy Policy
                        </Link>
                        . <span className="text-accent">*</span>
                      </label>
                    </div>
                    {formErrors.privacyConsent && (
                      <p className="ml-7 text-2xs text-danger">{formErrors.privacyConsent}</p>
                    )}
                  </div>
                </div>

                {/* Submit button & State */}
                <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-2xs text-muted text-center sm:text-left">
                    All required fields marked with <span className="text-accent">*</span> must be completed.
                  </div>

                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className={`${buttonClass({
                      variant: "primary",
                      size: "lg",
                    })} w-full sm:w-auto min-w-[200px]`}
                  >
                    {submissionStatus === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-mint-ink border-t-transparent" />
                        Submitting Application...
                      </span>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================
         8. FAQ ACCORDION
      ========================================================= */}
      <section id="faq" className="w-full bg-surface py-20 lg:py-28 border-b border-line">
        <Container className="max-w-4xl">
          <Reveal amount={0.2}>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
              <Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-balance">
                Everything You Need to Know
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body">
                Clear answers regarding compensation, scheduling, certifications, and technical scope.
              </p>
            </motion.div>
          </Reveal>

          <Reveal amount={0.15} className="mt-12 divide-y divide-line border-y border-line">
            {CAREERS_CONFIG.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 text-left font-medium text-fg hover:text-white transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <CaretDown
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm leading-relaxed text-body max-w-3xl pr-6">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {/* =========================================================
         9. FINAL CTA SECTION
      ========================================================= */}
      <section className="w-full bg-ink py-20 lg:py-28">
        <Container>
          <Reveal amount={0.25}>
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-2 p-8 sm:p-12 lg:p-16 text-center"
            >
              {/* Subtle accent backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 blur-[100px] rounded-full"
              />

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  NEXT STEPS
                </span>

                <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white text-balance">
                  Ready to Learn, Build, and Grow?
                </h2>

                <p className="mt-4 text-base leading-relaxed text-body">
                  Take the next step in your software and AI engineering journey. Explore our internship
                  program and apply if it matches your interests and availability.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToForm()}
                    className={buttonClass({ variant: "primary", size: "lg" })}
                  >
                    Apply for Internship
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 text-xs text-muted">
                  Questions? Contact{" "}
                  <a
                    href="mailto:info@flowfoundryai.in"
                    className="text-fg underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    info@flowfoundryai.in
                  </a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
