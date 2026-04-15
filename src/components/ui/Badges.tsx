import type { ApplicantStatus } from "../../features/admin-applicants/types";
import type { JobPositionStatus } from "../../features/admin-jobs/types";

type StatusTone = "neutral" | "active" | "warn" | "danger" | "muted";

function getApplicantStatusTone(status: ApplicantStatus): StatusTone {
  switch (status) {
    case "new":
      return "neutral";
    case "screening":
    case "interview":
      return "active";
    case "offer":
    case "hired":
      return "warn";
    case "rejected":
    case "withdrawn":
      return "danger";
    case "on_hold":
      return "muted";
  }
}

function getJobStatusTone(status: JobPositionStatus): StatusTone {
  switch (status) {
    case "published":
      return "active";
    case "draft":
      return "neutral";
    case "closed":
      return "warn";
    case "archived":
      return "muted";
  }
}

export function ApplicantStatusBadge({ status }: { status: ApplicantStatus }) {
  return <span className={`status-badge status-badge--${getApplicantStatusTone(status)}`}>{status}</span>;
}

export function JobStatusBadge({ status }: { status: JobPositionStatus }) {
  return <span className={`status-badge status-badge--${getJobStatusTone(status)}`}>{status}</span>;
}
