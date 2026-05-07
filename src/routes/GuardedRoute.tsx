import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';

interface GuardedRouteProps {
  isRouteAccessible: boolean | null | undefined;
  redirectRoute: string;
}

export const GuardedRoute = ({ isRouteAccessible, redirectRoute }: GuardedRouteProps): JSX.Element => {
  if (!isRouteAccessible) {
    return <Navigate to={redirectRoute} replace />;
  }

  return <Outlet />;
};
