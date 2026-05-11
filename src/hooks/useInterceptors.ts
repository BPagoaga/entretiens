import { AxiosError, AxiosHeaders } from 'axios';
import { useCallback, useMemo } from 'react';
import { useStore } from '../store';
import { isJwtTokenExpired } from './helpers';
import { fetchAuthSession } from 'aws-amplify/auth';
import { CookieService } from '../cookies';

const logout = () => {
  CookieService.clear();
  localStorage.clear();
};

export const useInterceptors = () => {
  const token = useStore((state) => state.token);
  const email = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);

  const onResponseError = useCallback(
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (!email) {
          logout();
        }

        fetchAuthSession({ forceRefresh: true })
          .then((session) => {
            if (!(session.tokens?.accessToken || token)) {
              throw new Error('Tokens not found');
            }

            if (session.tokens?.accessToken) {
              setToken(session.tokens?.accessToken.toString());
            }
          })
          .catch((error) => {
            console.error(error);
            logout();
          });
      }

      return Promise.reject(error);
    },
    [token, setToken, email]
  );

  const setTokenHeader = useCallback(
    async (headers: AxiosHeaders, token2: string) => {
      try {
        // trying to decode an x-api-key token will throw an error
        if (isJwtTokenExpired(token2)) {
          try {
            const session = await fetchAuthSession({ forceRefresh: true });
            if (!session.tokens?.accessToken) {
              throw new Error('Tokens not found');
            }
            const newToken = session.tokens?.accessToken.toString();
            setToken(newToken);
            return headers.set('Authorization', `Bearer ${newToken}`);
          } catch {
            logout();
          }
        }
        return headers.set('Authorization', `Bearer ${token2}`);
      } catch (error) {
        console.error(error);
        logout();
      }
    },
    [setToken]
  );

  const setAxiosHeaders = useCallback(
    async (config: { headers: AxiosHeaders }) => {
      const headers = new AxiosHeaders({ ...config.headers });

      if (token) {
        await setTokenHeader(headers, token);
      }

      config.headers = headers;
      return config;
    },
    [token, setTokenHeader]
  );

  const axiosInterceptorsConfig = useMemo(
    () => ({ onResponseError, onRequestSuccess: setAxiosHeaders }),
    [onResponseError, setAxiosHeaders]
  );

  return { axiosInterceptorsConfig };
};
