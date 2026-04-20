import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";
import { runManualGmailScan } from "../../features/gmail/api";

export function AdminDashboardPage() {
  const { authState } = useAuth();
  const [scanState, setScanState] = useState<{
    status: "idle" | "running" | "success" | "error";
    message: string | null;
  }>({
    status: "idle",
    message: null,
  });

  if (authState.status !== "authenticated") {
    return null;
  }

  const { user, gmailConnection } = authState.session;

  async function handleManualScan() {
    setScanState({
      status: "running",
      message: null,
    });

    try {
      const result = await runManualGmailScan();
      setScanState({
        status: "success",
        message: `Manual scan ${result.scanStatus}. Scanned ${result.messagesScanned} messages and matched ${result.messagesMatched}.`,
      });
    } catch (error) {
      setScanState({
        status: "error",
        message: error instanceof Error ? error.message : "Manual Gmail scan failed.",
      });
    }
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero panel">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Welcome back, {user.name}.</h1>
          <p>
            The core admin workflow is now wired for applicants, status changes, job management,
            history tracking, and manual Gmail scanning for the signed-in admin account.
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

      <section className="panel copy-stack">
        <div className="section-header">
          <div>
            <p className="eyebrow">Mailbox</p>
            <h3>Gmail scan</h3>
          </div>
          <button
            type="button"
            className="button"
            onClick={handleManualScan}
            disabled={!gmailConnection?.connected || scanState.status === "running"}
          >
            {scanState.status === "running" ? "Scanning..." : "Run manual scan"}
          </button>
        </div>
        <p>
          Connected mailbox: {gmailConnection?.googleEmail ?? "Not connected"}
        </p>
        <p>
          Last successful scan: {gmailConnection?.lastSuccessfulScanAt ? new Date(gmailConnection.lastSuccessfulScanAt).toLocaleString() : "Never"}
        </p>
        {scanState.message ? <p className="helper-copy">{scanState.message}</p> : null}
      </section>
    </div>
  );
}
