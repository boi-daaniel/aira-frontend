import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/login", label: "Log in" },
];

export function SiteLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-mark" aria-label="AIRA home">
          <img src="/aira-logo.png" alt="AIRA" className="brand-mark__image" />
          <div>
            <p className="eyebrow">Recruiting workspace</p>
            <h1>AIRA</h1>
          </div>
        </NavLink>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "site-nav__link is-active" : "site-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-shell">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>AIRA frontend is browser-safe by design. All auth, Gmail, and protected APIs live in the backend.</p>
      </footer>
    </div>
  );
}
