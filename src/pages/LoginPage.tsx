import { Link, Navigate, useSearchParams } from "react-router-dom";
import { beginGoogleSignIn } from "../features/auth/client";
import { useAuth } from "../features/auth/AuthProvider";

function getAuthErrorMessage(errorCode: string | null) {
  switch (errorCode) {
    case "forbidden":
      return "This Google account is not authorized for the admin workspace.";
    case "unauthorized":
      return "Google sign-in was not completed successfully.";
    case "validation_error":
      return "The sign-in response was incomplete. Please try again.";
    default:
      return null;
  }
}

export function LoginPage() {
  const { authState } = useAuth();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/admin";
  const errorMessage = getAuthErrorMessage(searchParams.get("error"));

  if (authState.status === "authenticated") {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <main className="login-screen">
      <div className="login-screen__glow login-screen__glow--left" />
      <div className="login-screen__glow login-screen__glow--right" />

      <section className="login-card" aria-label="Admin sign in">
        <div className="login-card__badge">
          <img src="/aira-logo.png" alt="AIRA" className="login-card__badge-image" />
        </div>

        <div className="login-card__heading">
          <h1>AIRA Admin</h1>
          <p>Sign in with Google to access the protected recruiting workspace.</p>
        </div>

        <div className="login-card__copy">
          <p>
            The same Google identity used here will also be the Gmail account used for backend
            scanning. Tokens never live in the browser.
          </p>
        </div>

        {errorMessage ? <div className="login-error">{errorMessage}</div> : null}

        <button
          type="button"
          className="google-login-button"
          onClick={() => beginGoogleSignIn(returnTo)}
        >
          <span className="google-login-button__icon">G</span>
          <span>Continue with Google</span>
        </button>

        <div className="login-links" aria-label="Support links">
          <button type="button" className="text-link" onClick={() => beginGoogleSignIn(returnTo)}>
            Retry sign in
          </button>
          <Link to="/login?returnTo=%2Fadmin" className="text-link">
            Reset flow
          </Link>
          <LinkToJobs />
        </div>
      </section>
    </main>
  );
}

function LinkToJobs() {
  return (
    <Link to="/jobs" className="text-link">
      View careers
    </Link>
  );
}
