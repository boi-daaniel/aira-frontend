import { describe, expect, it } from "vitest";
import { buildGoogleSignInUrl } from "./client";

describe("buildGoogleSignInUrl", () => {
  it("targets the backend auth route and preserves the requested return path", () => {
    const url = new URL(buildGoogleSignInUrl("/admin/jobs/123?tab=details"));

    expect(url.origin).toBe("https://aira-backend-delta.vercel.app");
    expect(url.pathname).toBe("/auth/google/start");
    expect(url.searchParams.get("returnTo")).toBe("/admin/jobs/123?tab=details");
  });
});
