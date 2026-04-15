import { Link, useParams } from "react-router-dom";
import { getJobBySlug } from "../data/jobs";

export function JobDetailPage() {
  const { jobSlug = "" } = useParams();
  const job = getJobBySlug(jobSlug);

  if (!job) {
    return (
      <section className="panel page-stack">
        <p className="eyebrow">Role not found</p>
        <h2>That job listing is unavailable.</h2>
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
          <span>{job.location}</span>
          <span>{job.type}</span>
          <Link to={`/apply/${job.slug}`} className="button">
            Start application
          </Link>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h3>Role overview</h3>
          <div className="copy-stack">
            {job.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="panel">
          <h3>Core strengths</h3>
          <div className="pill-row">
            {job.skills.map((skill) => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
