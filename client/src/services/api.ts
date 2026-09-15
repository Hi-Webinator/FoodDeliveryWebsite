import axios, { AxiosError, AxiosInstance } from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS, IS_DEV } from '../constants/config';
import { ValidationIssue } from '../store/types';

/**
 * The one axios instance every service uses. No component should import axios
 * directly — that keeps base URL, timeout and error shape in a single place.
 */

/**
 * The response interceptor below unwraps `response.data`, so every call
 * actually resolves to the payload, not an `AxiosResponse`. This type
 * overrides axios's own method signatures to match what really happens.
 */
export interface UnwrappedAxiosInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'> {
  get<T = unknown>(url: string, config?: Parameters<AxiosInstance['get']>[1]): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: Parameters<AxiosInstance['post']>[2]): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: Parameters<AxiosInstance['put']>[2]): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: Parameters<AxiosInstance['patch']>[2]): Promise<T>;
  delete<T = unknown>(url: string, config?: Parameters<AxiosInstance['delete']>[1]): Promise<T>;
}



export interface NormalizedApiError {
  message: string;
  status: number | null;
  errors: ValidationIssue[];
  isNetworkError: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// --- Request ---------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    config.headers.Accept = 'application/json';

    if (IS_DEV) {
      console.debug(`[api] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/** A predictable error every caller can rely on, whatever axios threw. */
const normalizeError = (error: AxiosError<{ message?: string; errors?: ValidationIssue[] }>): NormalizedApiError => {
  // The server answered — trust its `message` / `errors`.
  if (error.response) {
    const { status, data } = error.response;
    return {
      message: data?.message ?? `Request failed with status ${status}.`,
      status,
      errors: data?.errors ?? [],
      isNetworkError: false,
    };
  }

  if (error.code === 'ECONNABORTED') {
    return {
      message: 'The request timed out. Please check your connection.',
      status: null,
      errors: [],
      isNetworkError: true,
    };
  }

  // No response at all: server down, DNS failure, CORS rejection.
  return {
    message: 'Unable to reach the server. Please try again.',
    status: null,
    errors: [],
    isNetworkError: true,
  };
};

// --- Response --------------------------------------------------------------
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(normalizeError(error)),
);

export default api as unknown as UnwrappedAxiosInstance;
