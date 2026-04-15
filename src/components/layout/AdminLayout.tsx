import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";

const navigation = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/applicants", label: "Applicants" },
  { to: "/admin/jobs", label: "Jobs" },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  if (authState.status !== "authenticated") {
    return null;
  }

  const { user, gmailConnection } = authState.session;

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/aira-logo.png" alt="AIRA" className="admin-brand__image" />
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>AIRA</h1>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "admin-nav__link is-active" : "admin-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__meta panel">
          <p className="eyebrow">Signed in</p>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div className="admin-gmail-status">
            <span className={gmailConnection?.connected ? "status-dot is-live" : "status-dot"} />
            <span>{gmailConnection?.connected ? "Gmail connected" : "Gmail not connected"}</span>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Protected area</p>
            <h2>Recruiting operations</h2>
          </div>

          <div className="admin-header__actions">
            <NavLink to="/" className="button button--secondary">
              Public site
            </NavLink>
            <button type="button" className="button" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
