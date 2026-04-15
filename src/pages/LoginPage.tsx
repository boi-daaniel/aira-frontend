import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm0 2.25c-3.3 0-6 2.7-6 6v.75h12v-.75c0-3.3-2.7-6-6-6Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.5 10.5V8.25a4.5 4.5 0 1 1 9 0v2.25m-9 0h9A1.5 1.5 0 0 1 18 12v6A1.5 1.5 0 0 1 16.5 19.5h-9A1.5 1.5 0 0 1 6 18v-6a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M2.25 12S5.25 6.75 12 6.75 21.75 12 21.75 12 18.75 17.25 12 17.25 2.25 12 2.25 12Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m3 3 18 18M10.58 10.58A2.25 2.25 0 0 0 13.42 13.42M9.88 5.44A10.77 10.77 0 0 1 12 5.25c6.75 0 9.75 6.75 9.75 6.75a14.67 14.67 0 0 1-3.21 4.09M6.7 6.7A14.63 14.63 0 0 0 2.25 12S5.25 18.75 12 18.75c1.45 0 2.76-.31 3.93-.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="login-screen">
      <div className="login-screen__glow login-screen__glow--left" />
      <div className="login-screen__glow login-screen__glow--right" />

      <section className="login-card" aria-label="Admin login">
        <div className="login-card__badge">
          <img src="/aira-logo.png" alt="AIRA" className="login-card__badge-image" />
        </div>

        <div className="login-card__heading">
          <h1>AIRA Admin</h1>
          <p>Access the recruiting workspace.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="sr-only">ID number or email</span>
            <span className="login-field__icon">
              <UserIcon />
            </span>
            <input type="text" name="identifier" placeholder="ID Number or Email" required />
          </label>

          <label className="login-field">
            <span className="sr-only">Password</span>
            <span className="login-field__icon">
              <LockIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="login-field__toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((current) => !current)}
            >
              <EyeIcon open={showPassword} />
            </button>
          </label>

          <label className="login-check">
            <input type="checkbox" name="rememberMe" />
            <span>Remember me</span>
          </label>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <div className="login-links" aria-label="Support links">
          <Link to="/jobs">Register</Link>
          <Link to="/jobs">Forgot Your Password?</Link>
          <Link to="/jobs">Need Help?</Link>
        </div>

        {submitted ? (
          <p className="login-note">
            Frontend placeholder only. Real authentication will be connected to the backend flow.
          </p>
        ) : null}
      </section>
    </main>
  );
}
