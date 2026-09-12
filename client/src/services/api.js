import axios from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS, IS_DEV } from '../constants/config';

/**
 * The one axios instance every service uses. No component should import axios
 * directly — that keeps base URL, timeout and error shape in a single place.
 *
 * TS: `const api: AxiosInstance`
 */
const api = axios.create({
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

/**
 * A predictable error every caller can rely on, whatever axios threw.
 *
 * TS: `interface NormalizedApiError { message: string; status: number | null;
 *      errors: ValidationIssue[]; isNetworkError: boolean }`
 */
const normalizeError = (error) => {
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

export default api;
