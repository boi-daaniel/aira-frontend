export type Job = {
  id: string;
  slug: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time";
  summary: string;
  description: string[];
  skills: string[];
  featured?: boolean;
};

export type PipelineStage = {
  label: string;
  count: number;
};
