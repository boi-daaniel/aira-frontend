import { JobCard } from "../components/jobs/JobCard";
import { jobs } from "../data/jobs";

export function JobsPage() {
  return (
    <div className="page-stack">
      <section className="section-intro">
        <p className="eyebrow">Public careers page</p>
        <h2>Open positions</h2>
        <p className="lead">
          This route is structured for future backend-driven job listings, but it currently renders
          placeholder roles so the UI shell, routing, and application flow can be built now.
        </p>
      </section>

      <section className="jobs-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </div>
  );
}
