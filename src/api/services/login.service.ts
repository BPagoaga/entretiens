import { axiosInstanceV3 } from '../config';
import { UserLoginDetail } from '../model';

export const LoginService = {
  path: 'login',

  /**
   * Return user (login) details
   * @returns null if user is not found.
   */
  getUserLoginDetails(email: string): Promise<UserLoginDetail> {
    const encodedEmail = encodeURIComponent(email);
    const url = `${this.path}/email/${encodedEmail}/check`;

    return axiosInstanceV3.get(url).then((res) => res.data);
  },
};
