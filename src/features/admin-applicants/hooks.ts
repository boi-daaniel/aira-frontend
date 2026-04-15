import { useDeferredValue, useEffect, useState } from "react";
import { ApiError } from "../../lib/api";
import {
  getAdminApplicant,
  listAdminApplicants,
  updateAdminApplicantStatus,
} from "./api";
import type {
  ApplicantDetail,
  ApplicantListFilters,
  ApplicantListItem,
  UpdateApplicantStatusInput,
} from "./types";

type Loadable<T> = {
  data: T;
  error: ApiError | null;
  isLoading: boolean;
};

export function useAdminApplicants(filters: ApplicantListFilters) {
  const deferredSearch = useDeferredValue(filters.search);
  const [state, setState] = useState<Loadable<ApplicantListItem[]>>({
    data: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, isLoading: true, error: null }));

    listAdminApplicants(
      {
        ...filters,
        search: deferredSearch,
      },
      controller.signal,
    )
      .then((applicants) => {
        setState({
          data: applicants,
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
  }, [deferredSearch, filters.currentStatus, filters.jobPositionId]);

  return state;
}

export function useAdminApplicant(applicantId: string | undefined) {
  const [state, setState] = useState<Loadable<ApplicantDetail | null>>({
    data: null,
    error: null,
    isLoading: Boolean(applicantId),
  });

  useEffect(() => {
    if (!applicantId) {
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

    getAdminApplicant(applicantId, controller.signal)
      .then((applicant) => {
        setState({
          data: applicant,
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
  }, [applicantId]);

  async function updateStatus(payload: UpdateApplicantStatusInput) {
    if (!applicantId) {
      return;
    }

    const applicant = await updateAdminApplicantStatus(applicantId, payload);
    setState({
      data: applicant,
      error: null,
      isLoading: false,
    });
  }

  return {
    ...state,
    updateStatus,
  };
}
