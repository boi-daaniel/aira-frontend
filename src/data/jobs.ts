import type { Job, PipelineStage } from "../types";

export const jobs: Job[] = [
  {
    id: "job-platform-engineer",
    slug: "platform-engineer",
    title: "Platform Engineer",
    team: "Engineering",
    location: "Singapore or Remote (APAC)",
    type: "Full-time",
    summary:
      "Build the recruiting infrastructure that powers intake, review, and hiring workflows.",
    description: [
      "Own the internal systems that move candidates from first signal to final decision.",
      "Partner with recruiting, operations, and product stakeholders to reduce manual work and increase visibility.",
      "Design integrations between applicant data, messaging, automation, and reporting.",
    ],
    skills: ["TypeScript", "Workflow Systems", "APIs", "Systems Thinking"],
    featured: true,
  },
  {
    id: "job-recruiting-ops",
    slug: "recruiting-operations-manager",
    title: "Recruiting Operations Manager",
    team: "Talent",
    location: "Hong Kong or Remote",
    type: "Full-time",
    summary:
      "Run structured hiring operations, candidate communication, and process reporting.",
    description: [
      "Improve throughput across sourcing, screening, coordination, and interviewer enablement.",
      "Own ATS hygiene, SLAs, and decision-quality reporting across the funnel.",
      "Work closely with hiring managers to standardize scorecards and status handling.",
    ],
    skills: ["Hiring Operations", "Stakeholder Management", "Reporting", "Process Design"],
  },
  {
    id: "job-product-designer",
    slug: "product-designer",
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Contract",
    summary:
      "Shape a clear and credible end-to-end candidate experience across public and internal surfaces.",
    description: [
      "Design public job discovery flows, application UX, and recruiter-facing dashboards.",
      "Translate operational complexity into interfaces that remain fast and trustworthy.",
      "Contribute to brand expression across AIRA's careers presence.",
    ],
    skills: ["Product Design", "Systems UX", "Figma", "Content Strategy"],
  },
];

export const pipelineStages: PipelineStage[] = [
  { label: "New", count: 42 },
  { label: "Screening", count: 19 },
  { label: "Interview", count: 11 },
  { label: "Offer", count: 3 },
];

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
