import { JSX } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

export const LoginPassword = (): JSX.Element => {
  // use aws-amplify to sign in
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Enter your password</h1>
      <Input label={'Enter your password'} />
      <Button>Valider</Button>
    </div>
  );
};
