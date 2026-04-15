export type JobPositionStatus = "draft" | "published" | "closed" | "archived";
export type EmploymentType = "full_time" | "part_time" | "contract" | "internship";
export type WorkplaceType = "remote" | "hybrid" | "onsite";

export type JobListItem = {
  id: string;
  slug: string;
  title: string;
  team: string;
  locationText: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  status: JobPositionStatus;
  summary: string;
  applyEnabled: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type JobDetail = JobListItem & {
  descriptionMarkdown: string;
  closedAt: string | null;
};
