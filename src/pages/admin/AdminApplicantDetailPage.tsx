import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApplicantStatusBadge, JobStatusBadge } from "../../components/ui/Badges";
import { ErrorState, LoadingState } from "../../components/ui/States";
import { useAdminApplicant } from "../../features/admin-applicants/hooks";
import type { ApplicantStatus } from "../../features/admin-applicants/types";

const applicantStatuses: ApplicantStatus[] = [
  "new",
  "screening",
  "interview",
  "offer",
  "hired",
  "rejected",
  "withdrawn",
  "on_hold",
];

export function AdminApplicantDetailPage() {
  const { applicantId } = useParams();
  const { data, error, isLoading, updateStatus } = useAdminApplicant(applicantId);
  const [nextStatus, setNextStatus] = useState<ApplicantStatus>("screening");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    setNextStatus(data.currentStatus);
  }, [data]);

  async function handleStatusSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data) {
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      await updateStatus({
        toStatus: nextStatus,
        reason: reason || undefined,
        note: note || undefined,
      });
      setReason("");
      setNote("");
      setSaveMessage("Status updated and audit history recorded.");
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Unable to update status.";
      setSaveMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <LoadingState
        title="Loading applicant detail"
        description="Fetching applicant profile, resume references, and history."
      />
    );
  }

  if (error || !data) {
    return <ErrorState title="Unable to load applicant" description={error?.message ?? "Applicant not found."} />;
  }

  return (
    <div className="page-stack">
      <section className="section-header">
        <div>
          <p className="eyebrow">Applicant detail</p>
          <h1>{data.fullName}</h1>
        </div>
        <Link to="/admin/applicants" className="button button--secondary">
          Back to applicants
        </Link>
      </section>

      <section className="content-grid">
        <article className="panel copy-stack">
          <h3>Profile</h3>
          <p>Email: {data.primaryEmail}</p>
          <p>Phone: {data.phone ?? "Not provided"}</p>
          <p>Company: {data.currentCompany ?? "Unknown"}</p>
          <p>Title: {data.currentTitle ?? "Unknown"}</p>
          <p>Source: {data.sourceType}</p>
          <p>
            Current status: <ApplicantStatusBadge status={data.currentStatus} />
          </p>
        </article>

        <article className="panel copy-stack">
          <h3>Role context</h3>
          <p>{data.job.title}</p>
          <p>{data.job.team}</p>
          <div>
            <JobStatusBadge status={data.job.status} />
          </div>
          <p>LinkedIn: {data.linkedinUrl ?? "Not provided"}</p>
          <p>Portfolio: {data.portfolioUrl ?? "Not provided"}</p>
        </article>
      </section>

      <section className="content-grid">
        <form className="panel copy-stack" onSubmit={handleStatusSubmit}>
          <h3>Update status</h3>
          <label className="field">
            <span>Next status</span>
            <select value={nextStatus} onChange={(event) => setNextStatus(event.target.value as ApplicantStatus)}>
              {applicantStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Reason</span>
            <input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Short reason for the change" />
          </label>

          <label className="field">
            <span>Note</span>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Optional context recorded in history" />
          </label>

          <button type="submit" className="button" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save status"}
          </button>

          {saveMessage ? <p className="helper-copy">{saveMessage}</p> : null}
        </form>

        <section className="panel copy-stack">
          <h3>Resume references</h3>
          {data.resumeReferences.length === 0 ? (
            <p>No resume references are linked yet.</p>
          ) : (
            data.resumeReferences.map((resume) => (
              <div key={resume.id} className="list-card">
                <strong>{resume.originalFileName}</strong>
                <span>{resume.sourceType}</span>
                <span>{resume.mimeType ?? "unknown type"}</span>
                <span>{resume.storageBucket}/{resume.storagePath}</span>
              </div>
            ))
          )}
        </section>
      </section>

      <section className="content-grid">
        <section className="panel copy-stack">
          <h3>Status history</h3>
          {data.statusHistory.length === 0 ? (
            <p>No status history recorded yet.</p>
          ) : (
            data.statusHistory.map((entry) => (
              <div key={entry.id} className="history-item">
                <div className="history-item__header">
                  <strong>
                    {entry.fromStatus ?? "none"}
                    {" -> "}
                    {entry.toStatus}
                  </strong>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <p>{entry.reason ?? "No reason provided."}</p>
                {entry.note ? <p>{entry.note}</p> : null}
              </div>
            ))
          )}
        </section>

        <section className="panel copy-stack">
          <h3>Activity history</h3>
          {data.activityHistory.length === 0 ? (
            <p>No activity recorded yet.</p>
          ) : (
            data.activityHistory.map((entry) => (
              <div key={entry.id} className="history-item">
                <div className="history-item__header">
                  <strong>{entry.title}</strong>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <p>{entry.description ?? entry.activityType}</p>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
}
