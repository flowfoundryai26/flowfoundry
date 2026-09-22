"use client";

import { Legal } from "@/components/sections";

const SECTIONS = [
  {
    index: "01",
    title: "Acceptance of Terms",
    content: [
      "By using our website and services, you agree to be bound by these Terms of Service.",
      "If you do not agree with any part of these terms, you may not access our services.",
      "We reserve the right to update these terms at any time without prior notice.",
      "Continued use of our services constitutes acceptance of any changes.",
    ],
  },
  {
    index: "02",
    title: "Services Description",
    content: [
      "FlowFoundry provides AI agents, workflow automation, custom software development, and related services.",
      "We work with clients to understand their needs and deliver tailored solutions.",
      "All services are subject to availability and may be modified or discontinued at any time.",
      "We strive to deliver high-quality services that meet your business requirements.",
    ],
  },
  {
    index: "03",
    title: "Client Responsibilities",
    content: [
      "You agree to provide accurate and complete information when using our services.",
      "You are responsible for maintaining the confidentiality of your account information.",
      "You agree not to misuse our services or interfere with their normal operation.",
      "You will comply with all applicable laws and regulations when using our services.",
    ],
  },
  {
    index: "04",
    title: "Intellectual Property",
    content: [
      "All content, trademarks, and intellectual property on our website are owned by FlowFoundry.",
      "You may not copy, modify, or distribute our content without prior written consent.",
      "Any code, designs, or solutions we create are our intellectual property.",
      "We grant you a limited license to use our services for your business purposes.",
    ],
  },
  {
    index: "05",
    title: "Payment Terms",
    content: [
      "Payment terms will be specified in individual contracts or agreements.",
      "We accept payments through approved payment gateways.",
      "Invoices are due within the timeframe specified in your agreement.",
      "Late payments may be subject to additional fees as outlined in your contract.",
    ],
  },
  {
    index: "06",
    title: "Cancellation & Refund Policy",
    content: [
      "Cancellation terms are specified in your service agreement.",
      "Refunds are provided in accordance with the terms of your agreement.",
      "We aim to ensure complete satisfaction with our services.",
      "Please contact us to discuss any concerns about your services.",
    ],
  },
  {
    index: "07",
    title: "Limitation of Liability",
    content: [
      "FlowFoundry provides services 'as is' without warranties of any kind.",
      "We are not liable for any indirect, incidental, or consequential damages.",
      "Our total liability is limited to the amount paid for the services provided.",
      "We are not responsible for any third-party services or integrations.",
    ],
  },
  {
    index: "08",
    title: "Governing Law",
    content: [
      "These terms are governed by the laws of India.",
      "Any disputes shall be subject to the exclusive jurisdiction of courts in Andhra Pradesh, India.",
      "We reserve the right to seek injunctive relief in any jurisdiction.",
      "If any provision is found to be unenforceable, the remaining provisions remain in effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <Legal
      label="Terms of service"
      title="The terms we work under."
      lede="The conditions that apply when you use this website or engage FlowFoundry for services."
      updated="September 2026"
      sections={SECTIONS}
    />
  );
}
