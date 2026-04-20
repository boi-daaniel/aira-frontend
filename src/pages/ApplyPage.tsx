import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingState } from "../components/ui/States";
import { submitPublicApplication } from "../features/applications/api";
import type { PublicApplicationResult } from "../features/applications/types";
import { useJob } from "../features/jobs/hooks";

type SubmissionState = "idle" | "submitting" | "submitted" | "error";

export function ApplyPage() {
  const { jobId } = useParams();
  const { data: job, error, isLoading } = useJob(jobId);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionResult, setSubmissionResult] = useState<PublicApplicationResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!job) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    setSubmissionState("submitting");
    setSubmissionError(null);

    try {
      const result = await submitPublicApplication({
        jobPositionId: job.id,
        firstName: String(formData.get("firstName") ?? "").trim(),
        lastName: String(formData.get("lastName") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim() || undefined,
        linkedinUrl: String(formData.get("linkedinUrl") ?? "").trim() || undefined,
        portfolioUrl: String(formData.get("portfolioUrl") ?? "").trim() || undefined,
        coverLetter: String(formData.get("coverLetter") ?? "").trim() || undefined,
      });

      setSubmissionResult(result);
      setSubmissionState("submitted");
      event.currentTarget.reset();
    } catch (submitError) {
      setSubmissionError(
        submitError instanceof Error ? submitError.message : "Unable to submit your application.",
      );
      setSubmissionState("error");
    }
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

  if (!job.applyEnabled) {
    return (
      <ErrorState
        title="Applications closed"
        description="This role is published for reference, but it is not currently accepting new applications."
      />
    );
  }

  return (
    <div className="page-stack">
      <section className="section-intro">
        <p className="eyebrow">Public application</p>
        <h2>Apply for {job.title}</h2>
        <p className="lead">
          Submit your application directly to the AIRA backend. Public submissions create protected
          recruiting records for the admin team to review.
        </p>
      </section>

      <section className="form-layout">
        <form className="application-form panel" onSubmit={handleSubmit}>
          <label className="field">
            <span>First name</span>
            <input type="text" name="firstName" placeholder="Jordan" required />
          </label>
          <label className="field">
            <span>Last name</span>
            <input type="text" name="lastName" placeholder="Lee" required />
          </label>
          <label className="field">
            <span>Email address</span>
            <input type="email" name="email" placeholder="jordan@example.com" required />
          </label>
          <label className="field">
            <span>Phone</span>
            <input type="tel" name="phone" placeholder="+1 555 123 4567" />
          </label>
          <label className="field">
            <span>LinkedIn URL</span>
            <input type="url" name="linkedinUrl" placeholder="https://linkedin.com/in/..." />
          </label>
          <label className="field">
            <span>Portfolio URL</span>
            <input type="url" name="portfolioUrl" placeholder="https://..." />
          </label>
          <label className="field">
            <span>Why AIRA?</span>
            <textarea
              name="coverLetter"
              rows={6}
              placeholder="Share your background and why this role is a fit."
              required
            />
          </label>

          <button type="submit" className="button" disabled={submissionState === "submitting"}>
            {submissionState === "submitting" ? "Submitting..." : "Submit application"}
          </button>
        </form>

        <aside className="panel copy-stack">
          <h3>What happens next</h3>
          <p>Your application is posted to the backend API and stored as a `public_applications` record.</p>
          <p>The backend also creates or links the applicant record that admins review in the protected dashboard.</p>
          <p>Resume upload is still a follow-up phase, so this form currently captures profile details and cover letter only.</p>

          {submissionState === "submitted" && submissionResult ? (
            <div className="notice">
              <strong>Application submitted.</strong>
              <p>Reference: {submissionResult.publicApplicationId}</p>
              <p>Status: {submissionResult.processingStatus}</p>
            </div>
          ) : null}

          {submissionState === "error" && submissionError ? (
            <div className="notice">
              <strong>Submission failed.</strong>
              <p>{submissionError}</p>
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
