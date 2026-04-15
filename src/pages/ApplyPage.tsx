import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingState } from "../components/ui/States";
import { useJob } from "../features/jobs/hooks";

type SubmissionState = "idle" | "submitted";

export function ApplyPage() {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useJob(jobId);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitted");
  }

  if (isLoading) {
    return (
      <LoadingState
        title="Preparing application"
        description="Loading job details before showing the application form."
      />
    );
  }

  if (error || !job) {
    return (
      <ErrorState
        title="Application unavailable"
        description="This role could not be loaded, so the public application form is unavailable."
      />
    );
  }

  return (
    <div className="page-stack">
      <section className="section-intro">
        <p className="eyebrow">Public application</p>
        <h2>Apply for {job.title}</h2>
        <p className="lead">
          This page is public, but final submission, file uploads, and applicant creation will be
          handled by backend endpoints in the next step.
        </p>
      </section>

      <section className="form-layout">
        <form className="application-form panel" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input type="text" name="name" placeholder="Jordan Lee" required />
          </label>
          <label className="field">
            <span>Email address</span>
            <input type="email" name="email" placeholder="jordan@example.com" required />
          </label>
          <label className="field">
            <span>LinkedIn or portfolio</span>
            <input type="url" name="portfolio" placeholder="https://..." />
          </label>
          <label className="field">
            <span>Resume</span>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" />
          </label>
          <label className="field">
            <span>Why AIRA?</span>
            <textarea
              name="motivation"
              rows={6}
              placeholder="Share your background and why this role is a fit."
              required
            />
          </label>

          <button type="submit" className="button">
            Save draft locally
          </button>
        </form>

        <aside className="panel copy-stack">
          <h3>What happens next</h3>
          <p>Public applications will submit to the backend API and create `public_applications` records.</p>
          <p>Resume uploads will use signed storage flows so no browser secret handling is required.</p>
          <p>Admins will review candidates inside the protected dashboard after Google sign-in.</p>

          {submissionState === "submitted" ? (
            <div className="notice">
              <strong>Local-only placeholder saved.</strong>
              <p>The submission endpoint is not connected yet.</p>
            </div>
          ) : null}

          <Link to={`/jobs/${job.id}`} className="text-link">
            Back to role details
          </Link>
        </aside>
      </section>
    </div>
  );
}
