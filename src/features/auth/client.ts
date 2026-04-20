import { env } from "../../config/env";

export function buildGoogleSignInUrl(returnTo = "/admin") {
  const url = new URL("/auth/google/start", env.apiBaseUrl);
  url.searchParams.set("returnTo", returnTo);
  return url.toString();
}

export function beginGoogleSignIn(returnTo = "/admin") {
  window.location.assign(buildGoogleSignInUrl(returnTo));
}
