import { AxiosError } from 'axios';

export class HttpError<T = AxiosError> extends Error {
  cause: T;

  constructor(message: string, cause: T) {
    super(message);
    this.cause = cause;
  }
}
