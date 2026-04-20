import { apiRequest } from "../../lib/api";
import type { PublicApplicationResult, SubmitPublicApplicationInput } from "./types";

export function submitPublicApplication(payload: SubmitPublicApplicationInput) {
  return apiRequest<PublicApplicationResult>("/applications", {
    method: "POST",
    body: payload,
  });
}
