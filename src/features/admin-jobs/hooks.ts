import { useDeferredValue, useEffect, useState } from "react";
import { ApiError } from "../../lib/api";
import { getAdminJob, listAdminJobs, updateAdminJob } from "./api";
import type {
  AdminJobDetail,
  AdminJobFilters,
  AdminJobListItem,
  UpdateAdminJobInput,
} from "./types";

type Loadable<T> = {
  data: T;
  error: ApiError | null;
  isLoading: boolean;
};

export function useAdminJobs(filters: AdminJobFilters) {
  const deferredSearch = useDeferredValue(filters.search);
  const [state, setState] = useState<Loadable<AdminJobListItem[]>>({
    data: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, isLoading: true, error: null }));

    listAdminJobs(
      {
        ...filters,
        search: deferredSearch,
      },
      controller.signal,
    )
      .then((jobs) => {
        setState({
          data: jobs,
          error: null,
          isLoading: false,
        });
      })
      .catch((error: ApiError) => {
        setState({
          data: [],
          error,
          isLoading: false,
        });
      });

    return () => controller.abort();
  }, [deferredSearch, filters.status]);

  return state;
}

export function useAdminJob(jobId: string | undefined) {
  const [state, setState] = useState<Loadable<AdminJobDetail | null>>({
    data: null,
    error: null,
    isLoading: Boolean(jobId),
  });

  useEffect(() => {
    if (!jobId) {
      setState({
        data: null,
        error: null,
        isLoading: false,
      });
      return;
    }

    const controller = new AbortController();
    setState({
      data: null,
      error: null,
      isLoading: true,
    });

    getAdminJob(jobId, controller.signal)
      .then((job) => {
        setState({
          data: job,
          error: null,
          isLoading: false,
        });
      })
      .catch((error: ApiError) => {
        setState({
          data: null,
          error,
          isLoading: false,
        });
      });

    return () => controller.abort();
  }, [jobId]);

  async function saveJob(payload: UpdateAdminJobInput) {
    if (!jobId) {
      return;
    }

    const job = await updateAdminJob(jobId, payload);
    setState({
      data: job,
      error: null,
      isLoading: false,
    });
  }

  return {
    ...state,
    saveJob,
  };
}
