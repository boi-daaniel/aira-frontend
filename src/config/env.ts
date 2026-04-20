const PRODUCTION_API_BASE_URL = "https://aira-backend-delta.vercel.app";
const LOCAL_API_BASE_URL = "http://localhost:8787";

export function resolveApiBaseUrl(
  configuredValue: string | undefined,
  hostname = globalThis.location?.hostname ?? "",
) {
  if (typeof configuredValue === "string" && configuredValue.trim().length > 0) {
    return configuredValue.trim().replace(/\/+$/, "");
  }

  return hostname === "localhost" || hostname === "127.0.0.1"
    ? LOCAL_API_BASE_URL
    : PRODUCTION_API_BASE_URL;
}

export const env = {
  apiBaseUrl: resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
};
