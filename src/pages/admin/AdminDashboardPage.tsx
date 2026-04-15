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
            This protected shell is session-backed by the backend. Gmail connectivity and applicant
            operations remain server-owned.
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
          <h3>Auth contract</h3>
          <p>Login is Google-only.</p>
          <p>The backend owns the session cookie and token storage.</p>
          <p>The same Google identity is reused for Gmail access.</p>
        </article>

        <article className="panel copy-stack">
          <h3>Next admin slices</h3>
          <p>Applicants list and detail views.</p>
          <p>Job management and publication controls.</p>
          <p>Manual scan triggers and ingestion visibility.</p>
        </article>
      </section>
    </div>
  );
}
