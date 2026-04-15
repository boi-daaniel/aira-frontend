export type ApplicantStatus =
  | "new"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected"
  | "withdrawn"
  | "on_hold";

export type ApplicantSourceType =
  | "public_form"
  | "gmail_scan"
  | "manual_entry"
  | "referral"
  | "import";

export type ApplicantListItem = {
  id: string;
  jobPositionId: string;
  jobTitle: string;
  fullName: string;
  primaryEmail: string;
  sourceType: ApplicantSourceType;
  currentStatus: ApplicantStatus;
  assignedAdminUserId: string | null;
  lastActivityAt: string;
  createdAt: string;
};

export type ResumeReference = {
  id: string;
  sourceType: "public_upload" | "gmail_attachment" | "manual_upload";
  storageProvider: string;
  storageBucket: string;
  storagePath: string;
  originalFileName: string;
  mimeType: string | null;
  fileSizeBytes: number | null;
  checksumSha256: string | null;
  createdAt: string;
};

export type ApplicantStatusHistoryEntry = {
  id: string;
  fromStatus: ApplicantStatus | null;
  toStatus: ApplicantStatus;
  changeSource: "manual" | "gmail_scan" | "public_application" | "system" | "cron";
  changedByAdminUserId: string | null;
  reason: string | null;
  note: string | null;
  createdAt: string;
};

export type ApplicantActivityEntry = {
  id: string;
  activityType:
    | "applicant_created"
    | "public_application_received"
    | "resume_attached"
    | "status_changed"
    | "note_added"
    | "gmail_message_matched"
    | "scan_completed"
    | "profile_updated";
  title: string;
  description: string | null;
  actorAdminUserId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type ApplicantDetail = ApplicantListItem & {
  sourcePublicApplicationId: string | null;
  sourceLabel: string | null;
  firstName: string;
  lastName: string;
  phone: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  currentCompany: string | null;
  currentTitle: string | null;
  notes: string | null;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    team: string;
    status: "draft" | "published" | "closed" | "archived";
  };
  resumeReferences: ResumeReference[];
  statusHistory: ApplicantStatusHistoryEntry[];
  activityHistory: ApplicantActivityEntry[];
};

export type ApplicantListFilters = {
  search?: string;
  currentStatus?: ApplicantStatus;
  jobPositionId?: string;
};

export type UpdateApplicantStatusInput = {
  toStatus: ApplicantStatus;
  reason?: string;
  note?: string;
};
