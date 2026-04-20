import { apiRequest } from "../../lib/api";

export type GmailScanSummary = {
  scanLogId: string;
  adminUserId: string;
  triggerType: "manual" | "cron" | "webhook";
  scanStatus: "queued" | "running" | "succeeded" | "failed" | "partial";
  startedAt: string;
  finishedAt: string | null;
  messagesScanned: number;
  messagesMatched: number;
  attachmentsProcessed: number;
  applicantsCreated: number;
  applicantsUpdated: number;
  resumeReferencesCreated: number;
  skippedDuplicates: number;
  failedMessages: number;
  errorMessage: string | null;
};

export function runManualGmailScan() {
  return apiRequest<GmailScanSummary>("/gmail/scan", {
    method: "POST",
    body: {},
  });
}
