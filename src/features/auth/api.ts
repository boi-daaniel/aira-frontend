import { apiRequest } from "../../lib/api";
import type { AuthSessionResponse } from "./types";

export function getAuthSession(signal?: AbortSignal) {
  return apiRequest<AuthSessionResponse>("/auth/session", { signal });
}

export function logoutAdmin() {
  return apiRequest<{ authenticated: boolean; loggedOut: boolean }>("/auth/logout", {
    method: "POST",
  });
}
