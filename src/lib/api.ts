import { env } from "../config/env";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
};

type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
  meta?: Record<string, unknown>;
};

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

type ApiEnvelope<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? ((await response.json()) as ApiEnvelope<T>) : null;

  if (!response.ok) {
    if (payload && !payload.success) {
      throw new ApiError(
        payload.error.message,
        response.status,
        payload.error.code,
        payload.error.details,
      );
    }

    throw new ApiError(`API request failed with status ${response.status}.`, response.status);
  }

  if (!payload) {
    throw new ApiError("API response did not contain JSON.", response.status);
  }

  if (!payload.success) {
    throw new ApiError(
      payload.error.message,
      response.status,
      payload.error.code,
      payload.error.details,
    );
  }

  return payload.data;
}
