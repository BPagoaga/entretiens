import { JSX } from 'react';
import { Outlet, NavLink } from 'react-router';
import { HOME_ROUTE, PROFILE_ROUTE } from '../routes/constants';

export const MenuLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center gap-4 px-6 py-3 border-b bg-white">
        <NavLink to={HOME_ROUTE} className={({ isActive }) => isActive ? 'font-semibold' : ''}>
          Home
        </NavLink>
        <NavLink to={PROFILE_ROUTE} className={({ isActive }) => isActive ? 'font-semibold' : ''}>
          Profile
        </NavLink>
      </nav>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};
