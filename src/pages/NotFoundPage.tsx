import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="panel page-stack">
      <p className="eyebrow">404</p>
      <h2>That page does not exist.</h2>
      <p>Use the jobs directory or return to the main recruiting surface.</p>
      <Link to="/" className="button">
        Return home
      </Link>
    </section>
  );
}
