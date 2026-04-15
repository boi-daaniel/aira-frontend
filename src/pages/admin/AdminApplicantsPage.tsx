import { useState } from "react";
import { Link } from "react-router-dom";
import { ApplicantStatusBadge } from "../../components/ui/Badges";
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/States";
import { useAdminApplicants } from "../../features/admin-applicants/hooks";
import type { ApplicantStatus } from "../../features/admin-applicants/types";

export function AdminApplicantsPage() {
  const [search, setSearch] = useState("");
  const [currentStatus, setCurrentStatus] = useState<ApplicantStatus | "">("");
  const { data, error, isLoading } = useAdminApplicants({
    search,
    currentStatus: currentStatus || undefined,
  });

  return (
    <div className="page-stack">
      <section className="section-header">
        <div>
          <p className="eyebrow">Applicants</p>
          <h1>Applicant pipeline</h1>
        </div>
      </section>

      <section className="panel admin-toolbar">
        <label className="field">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search by name, email, or company"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select value={currentStatus} onChange={(event) => setCurrentStatus(event.target.value as ApplicantStatus | "")}>
            <option value="">All statuses</option>
            <option value="new">new</option>
            <option value="screening">screening</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="hired">hired</option>
            <option value="rejected">rejected</option>
            <option value="withdrawn">withdrawn</option>
            <option value="on_hold">on_hold</option>
          </select>
        </label>
      </section>

      {isLoading ? (
        <LoadingState title="Loading applicants" description="Fetching protected applicant records." />
      ) : error ? (
        <ErrorState title="Unable to load applicants" description={error.message} />
      ) : data.length === 0 ? (
        <EmptyState title="No applicants match these filters" description="Try widening the search or clearing the status filter." />
      ) : (
        <section className="panel">
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last activity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      <div className="table-primary">
                        <strong>{applicant.fullName}</strong>
                        <span>{applicant.primaryEmail}</span>
                      </div>
                    </td>
                    <td>{applicant.jobTitle}</td>
                    <td>
                      <ApplicantStatusBadge status={applicant.currentStatus} />
                    </td>
                    <td>{new Date(applicant.lastActivityAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/admin/applicants/${applicant.id}`} className="text-link">
                        View detail
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
