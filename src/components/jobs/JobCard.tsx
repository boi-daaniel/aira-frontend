import { Link } from "react-router-dom";
import type { Job } from "../../types";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-card__meta">
        <span>{job.team}</span>
        <span>{job.location}</span>
        <span>{job.type}</span>
      </div>
      <div className="job-card__body">
        <h3>{job.title}</h3>
        <p>{job.summary}</p>
      </div>
      <div className="pill-row">
        {job.skills.map((skill) => (
          <span key={skill} className="pill">
            {skill}
          </span>
        ))}
      </div>
      <div className="job-card__actions">
        <Link to={`/jobs/${job.slug}`} className="button button--secondary">
          View role
        </Link>
        <Link to={`/apply/${job.slug}`} className="button">
          Apply now
        </Link>
      </div>
    </article>
  );
}
