import { JSX, useEffect } from 'react';

export const Home = (): JSX.Element => {
  useEffect(() => {
    console.log('HOME');
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Home</h1>
    </div>
  );
};
