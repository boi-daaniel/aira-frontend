import { useEffect, useState } from "react";
import type { ApiError } from "../../lib/api";
import { getJob, listJobs } from "./api";
import type { JobDetail, JobListItem, JobPositionStatus } from "./types";

type Loadable<T> = {
  data: T;
  error: ApiError | null;
  isLoading: boolean;
};

export function useJobs(status: JobPositionStatus = "published") {
  const [state, setState] = useState<Loadable<JobListItem[]>>({
    data: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, isLoading: true, error: null }));

    listJobs({ status }, controller.signal)
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
  }, [status]);

  return state;
}

export function useJob(jobId: string | undefined) {
  const [state, setState] = useState<Loadable<JobDetail | null>>({
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

    getJob(jobId, controller.signal)
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

  return state;
}
