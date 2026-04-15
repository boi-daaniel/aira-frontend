import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingState } from "../components/ui/States";
import { useJob } from "../features/jobs/hooks";

function formatEmploymentType(value: string) {
  return value.replace("_", "-");
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useJob(jobId);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading job details"
        description="Fetching the role from the backend."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="That role could not be loaded"
        description="The job may no longer be available or the API is currently unavailable."
      />
    );
  }

  if (!job) {
    return (
      <section className="status-panel">
        <p className="eyebrow">Unavailable</p>
        <h2>That role does not exist.</h2>
        <p>Return to the jobs directory to review active listings.</p>
        <Link to="/jobs" className="button">
          Back to jobs
        </Link>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <section className="job-hero">
        <div>
          <p className="eyebrow">{job.team}</p>
          <h2>{job.title}</h2>
          <p className="lead">{job.summary}</p>
        </div>

        <div className="job-hero__meta">
          <span>{job.locationText}</span>
          <span>{formatEmploymentType(job.employmentType)}</span>
          <span>{job.workplaceType}</span>
          <Link to={`/apply/${job.id}`} className="button">
            Start application
          </Link>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h3>Role overview</h3>
          <div className="copy-stack">
            {job.descriptionMarkdown ? (
              job.descriptionMarkdown.split("\n").filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            ) : (
              <p>Detailed responsibilities have not been published yet.</p>
            )}
          </div>
        </article>

        <aside className="panel">
          <h3>Role metadata</h3>
          <div className="copy-stack">
            <p>Status: {job.status}</p>
            <p>Applications: {job.applyEnabled ? "Open" : "Closed"}</p>
            <p>Published: {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : "Not published"}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
