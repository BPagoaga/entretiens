import { JSX } from 'react';
import { useFetchUser } from '../../hooks';

export const UserContainer = (): JSX.Element => {
  const { user, isLoading } = useFetchUser();

  if (isLoading) {
    return <div className="flex flex-1 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">
        {user?.firstname} {user?.lastname}
      </h1>
      <p className="mt-2 text-gray-500">{user?.email}</p>
    </div>
  );
};
