import { CookieSetOptions } from 'universal-cookie';

export type CookieOptions = Omit<CookieSetOptions, 'sameSite'> & {
  sameSite: 'strict' | 'lax' | 'none';
};
