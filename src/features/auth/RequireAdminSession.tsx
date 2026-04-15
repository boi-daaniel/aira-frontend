import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAdminSession() {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState.status === "loading") {
    return (
      <main className="auth-check-screen">
        <div className="status-panel">
          <p className="eyebrow">Checking session</p>
          <h1>Loading admin workspace</h1>
          <p>Verifying your backend session before opening protected routes.</p>
        </div>
      </main>
    );
  }

  if (authState.status === "unauthenticated") {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  return <Outlet />;
}
