import {
  User,
} from '../model';
import { axiosInstanceV4 } from '../config/http'

export const UserService = {
  path: 'users',

  getMe(): Promise<User> {
    const url = `${this.path}/me`;

    return axiosInstanceV4
      .get(url)
      .then((res) => res.data);
  },
};
