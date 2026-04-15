const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const env = {
  apiBaseUrl:
    typeof apiBaseUrl === "string" && apiBaseUrl.length > 0
      ? apiBaseUrl
      : "http://localhost:8787",
};
