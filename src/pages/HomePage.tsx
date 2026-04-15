import { Link } from "react-router-dom";
import { JobCard } from "../components/jobs/JobCard";
import { EmptyState, ErrorState, LoadingState } from "../components/ui/States";
import { useJobs } from "../features/jobs/hooks";

export function HomePage() {
  const { data: jobs, error, isLoading } = useJobs("published");
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__content">
          <p className="eyebrow">Public careers surface</p>
          <h2>Structured hiring for teams that move deliberately.</h2>
          <p className="lead">
            AIRA separates the public recruiting experience from protected internal operations. The
            browser app handles careers pages and admin entry, while all identity, Gmail access,
            and workflow data stay in the backend.
          </p>
          <div className="action-row">
            <Link to="/jobs" className="button">
              Explore open roles
            </Link>
            <Link to="/login?returnTo=/admin" className="button button--secondary">
              Admin sign in
            </Link>
          </div>
        </div>

        <div className="hero-panel__aside">
          <div className="metric-card">
            <span className="metric-card__label">Backend-owned auth</span>
            <strong className="metric-card__value">Google</strong>
            <p>Same identity for admin access and Gmail scanning.</p>
          </div>

          <div className="stage-list">
            <div className="stage-list__item">
              <span>Public pages</span>
              <strong>Open</strong>
            </div>
            <div className="stage-list__item">
              <span>Admin routes</span>
              <strong>Protected</strong>
            </div>
            <div className="stage-list__item">
              <span>API contract</span>
              <strong>Typed</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <p className="eyebrow">Public and admin split</p>
          <h3>Clear frontend boundaries.</h3>
          <p>
            Careers pages and applications remain public. Admin pages are routed separately and only
            open after the backend confirms the session cookie.
          </p>
        </article>

        <article className="panel">
          <p className="eyebrow">No sensitive browser logic</p>
          <h3>Backend remains the authority.</h3>
          <p>
            The frontend only triggers Google sign-in and reads session state. OAuth exchanges,
            refresh tokens, Gmail access, and protected data remain server-side.
          </p>
        </article>
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Live openings</p>
          <h3>Featured positions</h3>
        </div>
        <Link to="/jobs" className="text-link">
          Browse all roles
        </Link>
      </section>

      {isLoading ? (
        <LoadingState
          title="Loading current roles"
          description="Fetching published jobs from the backend."
        />
      ) : error ? (
        <ErrorState
          title="Roles are unavailable right now"
          description="The careers API could not be loaded."
        />
      ) : featuredJobs.length === 0 ? (
        <EmptyState
          title="No published roles yet"
          description="Open jobs will appear here once positions are published."
        />
      ) : (
        <section className="jobs-grid">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </div>
  );
}
