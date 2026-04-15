import { Link } from "react-router-dom";
import type { JobListItem } from "../../features/jobs/types";

type JobCardProps = {
  job: JobListItem;
};

function formatEmploymentType(value: JobListItem["employmentType"]) {
  switch (value) {
    case "full_time":
      return "Full-time";
    case "part_time":
      return "Part-time";
    case "contract":
      return "Contract";
    case "internship":
      return "Internship";
  }
}

function formatWorkplaceType(value: JobListItem["workplaceType"]) {
  switch (value) {
    case "remote":
      return "Remote";
    case "hybrid":
      return "Hybrid";
    case "onsite":
      return "On-site";
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-card__meta">
        <span>{job.team}</span>
        <span>{job.locationText}</span>
        <span>{formatEmploymentType(job.employmentType)}</span>
      </div>
      <div className="job-card__body">
        <h3>{job.title}</h3>
        <p>{job.summary}</p>
      </div>
      <div className="pill-row">
        <span className="pill">{formatWorkplaceType(job.workplaceType)}</span>
        <span className="pill">{job.status}</span>
      </div>
      <div className="job-card__actions">
        <Link to={`/jobs/${job.id}`} className="button button--secondary">
          View role
        </Link>
        <Link to={`/apply/${job.id}`} className="button">
          Apply now
        </Link>
      </div>
    </article>
  );
}
