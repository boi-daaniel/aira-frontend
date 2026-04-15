import { apiRequest } from "../../lib/api";
import type { JobDetail, JobListItem, JobPositionStatus } from "./types";

type ListJobsFilters = {
  status?: JobPositionStatus;
};

export function listJobs(filters: ListJobsFilters = {}, signal?: AbortSignal) {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set("status", filters.status);
  }

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return apiRequest<JobListItem[]>(`/jobs${suffix}`, { signal });
}

export function getJob(jobId: string, signal?: AbortSignal) {
  return apiRequest<JobDetail>(`/jobs/${jobId}`, { signal });
}
