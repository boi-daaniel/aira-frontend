import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";

export function AdminDashboardPage() {
  const { authState } = useAuth();

  if (authState.status !== "authenticated") {
    return null;
  }

  const { user, gmailConnection } = authState.session;

  return (
    <div className="page-stack">
      <section className="dashboard-hero panel">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Welcome back, {user.name}.</h1>
          <p>
            The core admin workflow is now wired for applicants, status changes, job management,
            and history tracking. Gmail ingestion is intentionally still out of scope.
          </p>
        </div>

        <div className="dashboard-hero__meta">
          <div className="metric-card">
            <span className="metric-card__label">Role</span>
            <strong className="metric-card__value metric-card__value--small">{user.role}</strong>
          </div>
          <div className="metric-card">
            <span className="metric-card__label">Gmail connection</span>
            <strong className="metric-card__value metric-card__value--small">
              {gmailConnection?.connected ? "Ready" : "Missing"}
            </strong>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel copy-stack">
          <h3>Applicants</h3>
          <p>Search and filter by status, then open a detail view for audit history and resumes.</p>
          <Link to="/admin/applicants" className="button">
            Open applicants
          </Link>
        </article>

        <article className="panel copy-stack">
          <h3>Jobs</h3>
          <p>Review job positions, filter by status, and update basic role configuration.</p>
          <Link to="/admin/jobs" className="button button--secondary">
            Open jobs
          </Link>
        </article>
      </section>
    </div>
  );
}
