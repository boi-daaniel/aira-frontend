import { Link } from "react-router-dom";
import { JobCard } from "../components/jobs/JobCard";
import { jobs, pipelineStages } from "../data/jobs";

const featuredJobs = jobs.filter((job) => job.featured);

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__content">
          <p className="eyebrow">Hiring systems for deliberate teams</p>
          <h2>Recruit with more signal and less manual chaos.</h2>
          <p className="lead">
            AIRA combines public hiring surfaces with an internal workflow layer for applications,
            inbox-driven intake, and structured decision-making.
          </p>
          <div className="action-row">
            <Link to="/jobs" className="button">
              Explore open roles
            </Link>
            <Link to="/login" className="button button--secondary">
              Log in
            </Link>
          </div>
        </div>

        <div className="hero-panel__aside">
          <div className="metric-card">
            <span className="metric-card__label">Pipeline visibility</span>
            <strong className="metric-card__value">75</strong>
            <p>active applicants across live roles</p>
          </div>
          <div className="stage-list">
            {pipelineStages.map((stage) => (
              <div key={stage.label} className="stage-list__item">
                <span>{stage.label}</span>
                <strong>{stage.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <p className="eyebrow">Why this split matters</p>
          <h3>Frontend stays clean.</h3>
          <p>
            This repository only handles public UI, browser state, and requests to the backend API.
            Secrets, Gmail access, admin sessions, and protected logic remain server-side.
          </p>
        </div>
        <div className="panel">
          <p className="eyebrow">Planned integrations</p>
          <h3>Built to connect.</h3>
          <p>
            The UI is already shaped around future backend flows for Google login, Supabase-backed
            data, resume uploads, applicant tracking, and inbox scanning.
          </p>
        </div>
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Featured openings</p>
          <h3>Current roles</h3>
        </div>
        <Link to="/jobs" className="text-link">
          See all openings
        </Link>
      </section>

      <section className="jobs-grid">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </div>
  );
}
