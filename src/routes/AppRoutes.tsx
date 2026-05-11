import { Routes, Route, Navigate } from 'react-router';
import { UserContainer } from '../pages/UserProfile';
import { Home } from '../pages/Home';
import { LoginPassword } from '../pages/Login/LoginPassword';
import { Login } from '../pages/Login';
import { LoginFirst } from '../pages/Login/LoginFirst';
import { MenuLayout } from '../layouts';
import { JSX, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchUser } from '../hooks';
import { useStore } from '../store';
import { GuardedRoute } from './GuardedRoute';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGIN_PASSWORD_ROUTE,
  LOGIN_FIRST_ROUTE,
  PROFILE_ROUTE,
  NOT_FOUND_ROUTE,
} from './constants';
import { updateAxiosInterceptors } from '../hooks/helpers';
import { axiosInstanceV4 } from '../api';
import { useInterceptors } from '../hooks/useInterceptors';

export const AppRoutes = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { user, isLoading } = useFetchUser();
  const token = useStore((state) => state.token);
  const features = user?.capabilities?.features;
  const hasCollaborators = features?.collaborators;
  const [ready, setReady] = useState<boolean>(false);
  const { axiosInterceptorsConfig } = useInterceptors();

  useEffect(() => {
    return updateAxiosInterceptors(axiosInstanceV4, axiosInterceptorsConfig);
  }, [axiosInterceptorsConfig]);

  useEffect(() => {
    if (!token) {
      queryClient.removeQueries();
    }
    // Get Token if it exists
    setReady(true);
  }, [token, queryClient]);

  if (!ready || isLoading) {
    return <div className="flex flex-1 items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      {/* Non-Authenticated Routes: accessible only if user is not authenticated */}
      <Route element={<GuardedRoute isRouteAccessible={!token} redirectRoute={HOME_ROUTE} />}>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={LOGIN_PASSWORD_ROUTE} element={<LoginPassword />} />
        <Route path={LOGIN_FIRST_ROUTE} element={<LoginFirst />} />
      </Route>
      {/* Authenticated Routes */}
      <Route element={<GuardedRoute isRouteAccessible={!!token} redirectRoute={LOGIN_ROUTE} />}>
        <Route element={<MenuLayout />}>
          <Route path={PROFILE_ROUTE} element={<UserContainer />} />
          {/* Routes for user with collaborators capability enabled */}
          <Route element={<GuardedRoute isRouteAccessible={hasCollaborators} redirectRoute={NOT_FOUND_ROUTE} />}>
            <Route path={HOME_ROUTE} element={<Home />} />
          </Route>
        </Route>
      </Route>
      {/* Not found Route */}
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} replace />} />
    </Routes>
  );
};
