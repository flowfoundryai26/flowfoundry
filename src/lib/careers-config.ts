export interface InternshipTrack {
  id: string;
  title: string;
  slug: string;
  isOpen: boolean;
  statusLabel: string;
  summary: string;
  skills: string[];
  learningAreas: string[];
  idealFor: string;
}

export interface RoadmapStage {
  month: string;
  title: string;
  summary: string;
  milestones: string[];
}

export interface ApplicationStep {
  step: string;
  title: string;
  description: string;
}

export interface CareerFaq {
  q: string;
  a: string;
}

export const CAREERS_CONFIG = {
  company: {
    name: "FlowFoundry AI Solutions",
    location: "Vijayawada, Andhra Pradesh, India",
    website: "https://www.flowfoundryai.in",
    tagline: "Build Once. Automate Repeatedly.",
    brandPositioning: "AI · Automation · Software",
    defaultNotificationEmail: process.env.RECRUITMENT_EMAIL || process.env.CONTACT_EMAIL || "info@flowfoundryai.in",
  },

  program: {
    name: "FlowFoundry Software & AI Engineering Internship",
    duration: "3 Months",
    compensation: "Unpaid",
    mode: "Remote",
    schedule: "Flexible, mutually agreed working hours compatible with learning and academic commitments",
    weeklyHoursRecommendation: "15–20 hours/week recommended",
    eligibility: "Students, recent graduates, and early-career developers with relevant foundational skills",
    selection: "Application Review → Technical Discussion → Final Selection → Onboarding",
    completion: "Internship completion certificate upon meeting documented program requirements",
    nature: "Supervised, learning-focused technical internship",
    legalNotice:
      "Educational Disclosure: This internship is an unpaid, learning-focused training program designed for skill development, practical project experience, and technical mentorship. It does not constitute full-time employment, an apprenticeship under statutory labor enactments, or a guarantee of future hiring. Participants retain their portfolio projects and receive documented performance feedback upon completion.",
  },

  hero: {
    eyebrow: "CAREERS AT FLOWFOUNDRY",
    headline: "Start Building Your Future With FlowFoundry.",
    description:
      "Learn how modern AI systems and software are built. Work alongside our development team, strengthen your technical skills, and gain practical experience in a collaborative startup environment.",
    primaryCta: "Explore Internship",
    secondaryCta: "Apply Now",
    tags: ["3-Month Program", "Remote", "Learning-Focused"] as const,
    compensationDisclosure: "Compensation: Unpaid internship",
  },

  about: {
    heading: "Learn by Building. Grow Through Experience.",
    description:
      "At FlowFoundry AI Solutions, we believe that meaningful technical growth comes from curiosity, consistent practice, mentorship, and thoughtful problem-solving. Our internship program is designed to help students and emerging developers learn professional development workflows, strengthen their engineering fundamentals, and understand how software and AI systems are designed, tested, and maintained.",
    pillars: [
      {
        title: "Practical Learning",
        description: "Guided exercises and development assignments relevant to modern software engineering.",
      },
      {
        title: "Technical Mentorship",
        description: "Guidance, feedback, and code reviews from the development team, subject to mentor availability.",
      },
      {
        title: "Engineering Workflows",
        description: "Learn Git, GitHub, pull requests, testing, debugging, documentation, and collaborative development.",
      },
      {
        title: "Professional Experience",
        description: "Understand development planning, communication, technical decisions, and team collaboration.",
      },
    ],
  },

  tracks: [
    {
      id: "software-ai-engineering",
      title: "Software & AI Engineering Intern",
      slug: "software-ai-engineering",
      // Status controlled by configuration (can also be overridden by env variable)
      isOpen: process.env.CAREERS_SOFTWARE_AI_OPEN !== "false", // default true
      statusLabel: "Accepting Applications",
      summary:
        "Focus on full-stack application logic, RESTful API integrations, relational and modern databases, and integrating AI and automation systems into scalable web software.",
      skills: [
        "Python or TypeScript",
        "React / Next.js fundamentals",
        "REST APIs",
        "Git and GitHub",
        "Database fundamentals",
        "Interest in AI integrations and automation",
      ],
      learningAreas: [
        "Full-stack application development",
        "API integrations",
        "Software architecture fundamentals",
        "AI-assisted workflows",
        "Testing and deployment basics",
      ],
      idealFor: "Students or emerging engineers with programming basics looking for end-to-end full-stack and AI workflow practice.",
    },
    {
      id: "ai-automation",
      title: "AI Automation Intern",
      slug: "ai-automation",
      // Status controlled by configuration (only show as open if explicitly enabled)
      isOpen: process.env.CAREERS_AI_AUTOMATION_OPEN === "true", // default false
      statusLabel: process.env.CAREERS_AI_AUTOMATION_OPEN === "true" ? "Accepting Applications" : "Waitlist / Opening Soon",
      summary:
        "Learn how businesses automate operational workflows, connect CRM systems, orchestrate webhooks, and build intelligent voice and chat assistants.",
      skills: [
        "Python or JavaScript",
        "APIs and webhooks",
        "Basic automation concepts",
        "Interest in LLMs and AI agents",
      ],
      learningAreas: [
        "Workflow orchestration",
        "Chatbot and voice-agent fundamentals",
        "CRM automation",
        "LLM tool integrations",
        "Error handling and testing",
      ],
      idealFor: "Developers passionate about LLM agent architecture, prompt orchestration, and automated business integrations.",
    },
    {
      id: "frontend-development",
      title: "Frontend Development Intern",
      slug: "frontend-development",
      // Status controlled by configuration (only show as open if explicitly enabled)
      isOpen: process.env.CAREERS_FRONTEND_OPEN === "true", // default false
      statusLabel: process.env.CAREERS_FRONTEND_OPEN === "true" ? "Accepting Applications" : "Waitlist / Opening Soon",
      summary:
        "Build fast, accessible, and polished user interfaces with modern React, Next.js, Tailwind CSS, and component design systems.",
      skills: [
        "HTML, CSS, JavaScript",
        "React and Next.js fundamentals",
        "Tailwind CSS",
        "Responsive design",
        "Git and GitHub",
      ],
      learningAreas: [
        "Building responsive interfaces",
        "Component architecture",
        "API integration",
        "Accessibility",
        "Frontend performance",
      ],
      idealFor: "Design-conscious developers eager to master modern web UI architecture, animations, and responsive layouts.",
    },
  ] as InternshipTrack[],

  roadmap: [
    {
      month: "Month 1",
      title: "Foundations & Onboarding",
      summary: "Understand team workflows, establish your environment, and master source control and collaboration standards.",
      milestones: [
        "Understand the company and development workflow.",
        "Set up the development environment.",
        "Learn Git branches, pull requests, and code review.",
        "Complete guided introductory assignments.",
        "Identify individual learning goals.",
      ],
    },
    {
      month: "Month 2",
      title: "Applied Engineering",
      summary: "Tackle structured engineering challenges, explore integrations, and build a scoped hands-on project.",
      milestones: [
        "Work on structured technical exercises.",
        "Explore API integrations and application architecture.",
        "Improve debugging and testing skills.",
        "Participate in supervised technical reviews.",
        "Develop a small learning project.",
      ],
    },
    {
      month: "Month 3",
      title: "Capstone & Review",
      summary: "Deliver a documented capstone project, review decisions with mentors, and complete final evaluation.",
      milestones: [
        "Complete a scoped capstone assignment.",
        "Document the implementation and decisions.",
        "Present the project to mentors.",
        "Receive technical feedback.",
        "Complete the internship evaluation.",
      ],
    },
  ] as RoadmapStage[],

  process: [
    {
      step: "01",
      title: "Apply Online",
      description: "Submit your details, technical profile, availability, and PDF resume through our secure application form.",
    },
    {
      step: "02",
      title: "Application Review",
      description: "Our engineering team reviews your foundations, projects, problem-solving mindset, and track alignment.",
    },
    {
      step: "03",
      title: "Technical Discussion",
      description: "A friendly 30-minute conversation to walk through past projects, your technical interests, and mutual expectations.",
    },
    {
      step: "04",
      title: "Selection & Onboarding",
      description: "Selected candidates receive written program parameters, a mentor introduction, and orientation materials.",
    },
  ] as ApplicationStep[],

  faqs: [
    {
      q: "Is the internship paid?",
      a: "No. This is a three-month unpaid internship focused on supervised learning and practical technical experience.",
    },
    {
      q: "Is the internship remote?",
      a: "Yes. The program is designed for remote participation.",
    },
    {
      q: "Can college students apply?",
      a: "Yes. Students with suitable technical foundations and availability are welcome to apply.",
    },
    {
      q: "What are the working hours?",
      a: "Schedules are coordinated with the team and agreed upon based on the learning plan and academic commitments.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Participants who successfully complete the documented internship requirements will receive a completion certificate.",
    },
    {
      q: "Does the internship guarantee a job?",
      a: "No. Completing the internship does not guarantee a full-time position or future employment.",
    },
    {
      q: "Can beginners apply?",
      a: "Applicants with foundational programming knowledge are welcome. Selection depends on the requirements of the track.",
    },
    {
      q: "Will interns work on real company projects?",
      a: "The program includes supervised exercises and may provide exposure to development practices and suitable project environments. Access to client or production systems is not guaranteed.",
    },
  ] as CareerFaq[],
};
