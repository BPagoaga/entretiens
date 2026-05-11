import { JSX } from 'react';
import { Input } from '../../ui/Input';
import { fetchAuthSession, signIn } from 'aws-amplify/auth';

export const Login = (): JSX.Element => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <Input label={'Enter your email to continue'} />
    </div>
  );
};
