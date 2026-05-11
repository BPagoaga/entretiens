/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DateTime } from 'luxon';

export const createResponseInterceptor = (instance: AxiosInstance, onSuccess: any, onError: any): number => {
  return instance.interceptors.response.use(
    onSuccess || ((response) => response),
    onError ||
      ((error) => {
        console.warn('An error occurred while adding token', JSON.stringify(error));
        return Promise.reject(error);
      })
  );
};

export const createRequestInterceptor = (instance: AxiosInstance, onSuccess: any, onError: any): number => {
  return instance.interceptors.request.use(
    onSuccess || ((config) => config),
    onError ||
      ((error) => {
        console.warn('An error occurred while adding token', JSON.stringify(error));
        return Promise.reject(error);
      })
  );
};

export const updateAxiosInterceptors = (
  instance: AxiosInstance,
  config: {
    onResponseSuccess?: unknown;
    onResponseError?: unknown;
    onRequestSuccess?: unknown;
    onRequestError?: unknown;
  }
) => {
  const responseInterceptorId = createResponseInterceptor(instance, config.onResponseSuccess, config.onResponseError);
  const requestInterceptorId = createRequestInterceptor(instance, config.onRequestSuccess, config.onRequestError);

  return () => {
    instance.interceptors.request.eject(requestInterceptorId);
    instance.interceptors.response.eject(responseInterceptorId);
  };
};

export const isJwtTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode(token);
  if (!decodedToken.exp) {
    return true;
  }
  const expirationDate = DateTime.fromSeconds(decodedToken.exp);
  return expirationDate < now().plus({ minutes: 1 });
};

export const now = (timezone?: string | null) => (timezone ? DateTime.now().setZone(timezone) : DateTime.now());
