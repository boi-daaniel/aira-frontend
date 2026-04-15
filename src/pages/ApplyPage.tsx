import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobBySlug } from "../data/jobs";

type SubmissionState = "idle" | "submitted";

export function ApplyPage() {
  const { jobSlug = "" } = useParams();
  const job = getJobBySlug(jobSlug);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  if (!job) {
    return (
      <section className="panel page-stack">
        <p className="eyebrow">Application unavailable</p>
        <h2>This role cannot be applied to right now.</h2>
        <Link to="/jobs" className="button">
          Back to jobs
        </Link>
      </section>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitted");
  }

  return (
    <div className="page-stack">
      <section className="section-intro">
        <p className="eyebrow">Public application form</p>
        <h2>Apply for {job.title}</h2>
        <p className="lead">
          This form is currently local-only. In the next phase it will submit to the backend for
          storage, upload handling, and applicant record creation.
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
              placeholder="Tell us how you think about hiring systems, operations, or product craft."
              required
            />
          </label>

          <button type="submit" className="button">
            Submit application
          </button>
        </form>

        <aside className="panel">
          <h3>What happens next</h3>
          <div className="copy-stack">
            <p>Applications will later be persisted through the backend API and written to Supabase.</p>
            <p>Resume uploads will be exchanged for signed upload targets so files never require secrets in the browser.</p>
            <p>Recruiters will review candidates in the admin dashboard after Google-authenticated sign-in.</p>
          </div>

          {submissionState === "submitted" ? (
            <div className="notice">
              <strong>Form captured locally.</strong>
              <p>The backend submission flow has not been connected yet.</p>
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
