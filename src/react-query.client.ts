import { AxiosError } from 'axios';
import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const conditionalRetryCondition = (error: AxiosError): boolean =>
  error.response?.status === 401 || error.response?.status === 403;
const retryCountOn401Or403 = 1;
const defaultRetryCount = 3;

const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (!error) {
    return false;
  }

  const axiosError = error as AxiosError;

  if (conditionalRetryCondition(axiosError)) {
    if (failureCount >= retryCountOn401Or403) {
      return false;
    }
    return true;
  }

  return failureCount < defaultRetryCount;
};

const defaultOptions: DefaultOptions = {
  queries: {
    retry: shouldRetry,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
