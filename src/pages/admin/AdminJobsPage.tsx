import { useState } from "react";
import { Link } from "react-router-dom";
import { JobStatusBadge } from "../../components/ui/Badges";
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/States";
import { useAdminJobs } from "../../features/admin-jobs/hooks";
import type { JobPositionStatus } from "../../features/admin-jobs/types";

export function AdminJobsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobPositionStatus | "">("");
  const { data, error, isLoading } = useAdminJobs({
    search,
    status: status || undefined,
  });

  return (
    <div className="page-stack">
      <section className="section-header">
        <div>
          <p className="eyebrow">Jobs</p>
          <h1>Job positions</h1>
        </div>
      </section>

      <section className="panel admin-toolbar">
        <label className="field">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search by title, team, or location"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as JobPositionStatus | "")}>
            <option value="">All statuses</option>
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="closed">closed</option>
            <option value="archived">archived</option>
          </select>
        </label>
      </section>

      {isLoading ? (
        <LoadingState title="Loading jobs" description="Fetching protected job management data." />
      ) : error ? (
        <ErrorState title="Unable to load jobs" description={error.message} />
      ) : data.length === 0 ? (
        <EmptyState title="No jobs match these filters" description="Try a wider search or a different status." />
      ) : (
        <section className="panel">
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Team</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="table-primary">
                        <strong>{job.title}</strong>
                        <span>{job.locationText}</span>
                      </div>
                    </td>
                    <td>{job.team}</td>
                    <td>
                      <JobStatusBadge status={job.status} />
                    </td>
                    <td>{new Date(job.updatedAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/admin/jobs/${job.id}`} className="text-link">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
