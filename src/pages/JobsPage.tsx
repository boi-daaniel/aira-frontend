import { JobCard } from "../components/jobs/JobCard";
import { EmptyState, ErrorState, LoadingState } from "../components/ui/States";
import { useJobs } from "../features/jobs/hooks";

export function JobsPage() {
  const { data: jobs, error, isLoading } = useJobs("published");

  return (
    <div className="page-stack">
      <section className="section-intro">
        <p className="eyebrow">Careers</p>
        <h2>Open positions</h2>
        <p className="lead">
          Published jobs are loaded from the backend API. This keeps the public site and the admin
          workflow aligned to the same source of truth.
        </p>
      </section>

      {isLoading ? (
        <LoadingState
          title="Loading open positions"
          description="Fetching published jobs from the backend."
        />
      ) : error ? (
        <ErrorState
          title="Unable to load jobs"
          description="The jobs API could not be reached."
        />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No public roles are live"
          description="Published jobs will appear here when the backend has active positions."
        />
      ) : (
        <section className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </div>
  );
}
