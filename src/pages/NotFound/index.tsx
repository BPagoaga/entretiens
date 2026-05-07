import { JSX } from 'react';

export const NotFound = (): JSX.Element => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="mt-2 text-gray-500">Page not found</p>
    </div>
  );
};
