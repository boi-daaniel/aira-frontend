import { apiRequest } from "../../lib/api";
import type {
  ApplicantDetail,
  ApplicantListFilters,
  ApplicantListItem,
  UpdateApplicantStatusInput,
} from "./types";

function buildQuery(filters: ApplicantListFilters) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.currentStatus) {
    params.set("currentStatus", filters.currentStatus);
  }

  if (filters.jobPositionId) {
    params.set("jobPositionId", filters.jobPositionId);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function listAdminApplicants(filters: ApplicantListFilters = {}, signal?: AbortSignal) {
  return apiRequest<ApplicantListItem[]>(`/admin/applicants${buildQuery(filters)}`, { signal });
}

export function getAdminApplicant(applicantId: string, signal?: AbortSignal) {
  return apiRequest<ApplicantDetail>(`/admin/applicants/${applicantId}`, { signal });
}

export function updateAdminApplicantStatus(
  applicantId: string,
  payload: UpdateApplicantStatusInput,
) {
  return apiRequest<ApplicantDetail>(`/admin/applicants/${applicantId}/status`, {
    method: "PATCH",
    body: payload,
  });
}
