"use client";

import { Legal } from "@/components/sections";

const SECTIONS = [
  {
    index: "01",
    title: "Information We Collect",
    content: [
      "Personal identification information (Name, email address, phone number, company name)",
      "Usage data (How you interact with our website and services)",
      "Communication data (Messages, inquiries, and feedback you send us)",
      "Technical data (IP address, browser type, device information)",
    ],
  },
  {
    index: "02",
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our services",
      "To notify you about changes to our services",
      "To provide customer support and respond to inquiries",
      "To gather analysis or valuable information to improve our services",
      "To monitor the usage of our services",
      "To detect, prevent and address technical issues",
    ],
  },
  {
    index: "03",
    title: "Data Storage & Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your data",
      "Your data is stored on secure servers with industry-standard encryption",
      "We regularly review our security practices to ensure your data remains safe",
      "Access to your data is strictly limited to authorized personnel only",
    ],
  },
  {
    index: "04",
    title: "Data Sharing & Disclosure",
    content: [
      "We do not sell, trade, or rent your personal information to third parties",
      "We may share data with trusted service providers who assist in our operations",
      "We may disclose information when required by law or to protect our rights",
      "Any third-party services we use are bound by strict confidentiality agreements",
    ],
  },
  {
    index: "05",
    title: "Your Rights",
    content: [
      "Right to access your personal data",
      "Right to correct inaccurate data",
      "Right to request deletion of your data",
      "Right to object to data processing",
      "Right to data portability",
      "Right to withdraw consent at any time",
    ],
  },
  {
    index: "06",
    title: "Cookies",
    content: [
      "We use essential cookies to ensure our website functions properly",
      "Analytics cookies help us understand how visitors interact with our site",
      "You can control cookie preferences through your browser settings",
      "We do not use cookies for targeted advertising or tracking purposes",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Legal
      label="Privacy policy"
      title="How we handle your data."
      lede="What we collect when you contact us or use this site, how we use it, and the rights you have over it."
      updated="September 2026"
      sections={SECTIONS}
    />
  );
}
