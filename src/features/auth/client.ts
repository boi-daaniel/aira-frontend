import { env } from "../../config/env";

export function beginGoogleSignIn() {
  window.location.assign(`${env.apiBaseUrl}/auth/google/start`);
}
