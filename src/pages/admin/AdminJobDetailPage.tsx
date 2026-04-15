import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { JobStatusBadge } from "../../components/ui/Badges";
import { ErrorState, LoadingState } from "../../components/ui/States";
import { useAdminJob } from "../../features/admin-jobs/hooks";
import type { EmploymentType, JobPositionStatus, WorkplaceType } from "../../features/admin-jobs/types";

type JobFormState = {
  title: string;
  team: string;
  locationText: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  status: JobPositionStatus;
  applyEnabled: boolean;
  summary: string;
  descriptionMarkdown: string;
};

export function AdminJobDetailPage() {
  const { jobId } = useParams();
  const { data, error, isLoading, saveJob } = useAdminJob(jobId);
  const [formState, setFormState] = useState<JobFormState | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    setFormState({
      title: data.title,
      team: data.team,
      locationText: data.locationText,
      employmentType: data.employmentType,
      workplaceType: data.workplaceType,
      status: data.status,
      applyEnabled: data.applyEnabled,
      summary: data.summary,
      descriptionMarkdown: data.descriptionMarkdown,
    });
  }, [data]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formState || !jobId) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      await saveJob(formState);
      setMessage("Job position updated.");
    } catch (saveError) {
      setMessage(saveError instanceof Error ? saveError.message : "Unable to save job.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingState title="Loading job" description="Fetching job management details." />;
  }

  if (error || !data || !formState) {
    return <ErrorState title="Unable to load job" description={error?.message ?? "Job not found."} />;
  }

  return (
    <div className="page-stack">
      <section className="section-header">
        <div>
          <p className="eyebrow">Job detail</p>
          <h1>{data.title}</h1>
        </div>
        <Link to="/admin/jobs" className="button button--secondary">
          Back to jobs
        </Link>
      </section>

      <section className="content-grid">
        <section className="panel copy-stack">
          <h3>Current status</h3>
          <div>
            <JobStatusBadge status={data.status} />
          </div>
          <p>Published at: {data.publishedAt ? new Date(data.publishedAt).toLocaleString() : "Not published"}</p>
          <p>Applications: {data.applyEnabled ? "Open" : "Closed"}</p>
        </section>

        <section className="panel copy-stack">
          <h3>Role metadata</h3>
          <p>Team: {data.team}</p>
          <p>Location: {data.locationText}</p>
          <p>Employment: {data.employmentType}</p>
          <p>Workplace: {data.workplaceType}</p>
        </section>
      </section>

      <form className="panel copy-stack" onSubmit={handleSubmit}>
        <h3>Edit basics</h3>

        <div className="content-grid">
          <label className="field">
            <span>Title</span>
            <input value={formState.title} onChange={(event) => setFormState((current) => current ? { ...current, title: event.target.value } : current)} />
          </label>

          <label className="field">
            <span>Team</span>
            <input value={formState.team} onChange={(event) => setFormState((current) => current ? { ...current, team: event.target.value } : current)} />
          </label>

          <label className="field">
            <span>Location</span>
            <input value={formState.locationText} onChange={(event) => setFormState((current) => current ? { ...current, locationText: event.target.value } : current)} />
          </label>

          <label className="field">
            <span>Status</span>
            <select value={formState.status} onChange={(event) => setFormState((current) => current ? { ...current, status: event.target.value as JobPositionStatus } : current)}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="closed">closed</option>
              <option value="archived">archived</option>
            </select>
          </label>

          <label className="field">
            <span>Employment type</span>
            <select value={formState.employmentType} onChange={(event) => setFormState((current) => current ? { ...current, employmentType: event.target.value as EmploymentType } : current)}>
              <option value="full_time">full_time</option>
              <option value="part_time">part_time</option>
              <option value="contract">contract</option>
              <option value="internship">internship</option>
            </select>
          </label>

          <label className="field">
            <span>Workplace type</span>
            <select value={formState.workplaceType} onChange={(event) => setFormState((current) => current ? { ...current, workplaceType: event.target.value as WorkplaceType } : current)}>
              <option value="remote">remote</option>
              <option value="hybrid">hybrid</option>
              <option value="onsite">onsite</option>
            </select>
          </label>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={formState.applyEnabled}
            onChange={(event) => setFormState((current) => current ? { ...current, applyEnabled: event.target.checked } : current)}
          />
          <span>Allow public applications</span>
        </label>

        <label className="field">
          <span>Summary</span>
          <textarea value={formState.summary} rows={4} onChange={(event) => setFormState((current) => current ? { ...current, summary: event.target.value } : current)} />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea value={formState.descriptionMarkdown} rows={10} onChange={(event) => setFormState((current) => current ? { ...current, descriptionMarkdown: event.target.value } : current)} />
        </label>

        <div className="action-row">
          <button type="submit" className="button" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </button>
          {message ? <p className="helper-copy">{message}</p> : null}
        </div>
      </form>
    </div>
  );
}
