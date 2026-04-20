import { describe, expect, it } from "vitest";
import { resolveApiBaseUrl } from "./env";

describe("resolveApiBaseUrl", () => {
  it("uses the configured environment value when present", () => {
    expect(resolveApiBaseUrl("https://api.example.com/")).toBe("https://api.example.com");
  });

  it("falls back to localhost during local development", () => {
    expect(resolveApiBaseUrl(undefined, "localhost")).toBe("http://localhost:8787");
  });

  it("falls back to the deployed backend url outside localhost", () => {
    expect(resolveApiBaseUrl(undefined, "aira-front-end.vercel.app")).toBe(
      "https://aira-backend-delta.vercel.app",
    );
  });
});
