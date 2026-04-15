import { apiRequest } from "../../lib/api";
import type {
  AdminJobDetail,
  AdminJobFilters,
  AdminJobListItem,
  UpdateAdminJobInput,
} from "./types";

function buildQuery(filters: AdminJobFilters) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function listAdminJobs(filters: AdminJobFilters = {}, signal?: AbortSignal) {
  return apiRequest<AdminJobListItem[]>(`/admin/jobs${buildQuery(filters)}`, { signal });
}

export function getAdminJob(jobId: string, signal?: AbortSignal) {
  return apiRequest<AdminJobDetail>(`/admin/jobs/${jobId}`, { signal });
}

export function updateAdminJob(jobId: string, payload: UpdateAdminJobInput) {
  return apiRequest<AdminJobDetail>(`/admin/jobs/${jobId}`, {
    method: "PATCH",
    body: payload,
  });
}
