// eslint-disable-next-line import/named
import axios from 'axios';

const API_URL = import.meta.env['VITE_API_URL'];

export const getBaseUrl = (): string => API_URL;
export const getBaseApiUrl = (v4 = false): string => `${API_URL}/v${v4 ? '4' : '3'}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// https://stackoverflow.com/a/70765722
export const axiosInstanceV3 = axios.create({
  baseURL: getBaseApiUrl(),
  headers,
});

export const axiosInstanceV4 = axios.create({
  baseURL: getBaseApiUrl(true),
  headers,
});

