import Cookies from 'universal-cookie';
import { getDomain } from './utils';
import { CookieOptions } from './types';

/**
 * The methods in this service should be called only by the store
 */
export const CookieService = {
  cookies: new Cookies(),
  setOptions: {
    path: '/',
    domain: getDomain(),
    secure: true,
    sameSite: 'strict',
    httpOnly: false,
  } as Omit<CookieOptions, 'expires'>,

  setCookie(name: string, value: string, overrideOptions?: CookieOptions): void {
    const twoYears = new Date();
    twoYears.setFullYear(new Date().getFullYear() + 2);
    const expirationDate = overrideOptions?.expires ? new Date(overrideOptions.expires) : twoYears;
    let options = { ...this.setOptions, expires: expirationDate };

    if (overrideOptions) {
      options = { ...options, ...overrideOptions, expires: expirationDate };
    }

    this.cookies.set(name, value, {
      ...options,
    });
  },

  getCookie(name: string): string {
    return this.cookies.get(name);
  },

  deleteCookie(name: string, overrideOptions?: CookieOptions): void {
    let options = { ...this.setOptions };

    if (overrideOptions) {
      options = { ...options, ...overrideOptions };
    }
    return this.cookies.remove(name, options);
  },
};
