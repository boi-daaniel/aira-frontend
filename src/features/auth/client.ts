import { env } from "../../config/env";

export function beginGoogleSignIn(returnTo = "/admin") {
  const url = new URL("/auth/google/start", env.apiBaseUrl);
  url.searchParams.set("returnTo", returnTo);
  window.location.assign(url.toString());
}
