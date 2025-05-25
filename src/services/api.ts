import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig
} from 'axios';

// Enhanced type definitions
export type RequestConfig<T = any> = AxiosRequestConfig<T>;
export type Response<T = any, D = any> = AxiosResponse<T, D>;

// Environment types are now in vite-env.d.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
}

export interface ApiError extends Error {
  status: number;
  message: string;
  details?: any;
  code?: string;
  response?: any;
  config?: any;
  isAxiosError?: boolean;
  toJSON?: () => object;
  
  // Allow any other properties since we're extending Error
  [key: string]: any;
}

// Validate and get API base URL
const getApiBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    console.warn('VITE_API_URL is not defined, falling back to localhost');
    return 'http://localhost:3000';
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
  withCredentials: true // Consider for cookie-based auth
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // You could add a request ID or other tracing headers here
    return config;
  },
  (error: AxiosError) => {
    // Add additional error handling if needed
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<any> => {
    // You could transform the response data here if needed
    return response as unknown as Response<any>;
  },
  async (error: unknown): Promise<never> => {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      // Handle timeout errors
      if (error.code === 'ECONNABORTED') {
        const timeoutError = new Error('Request timeout') as ApiError;
        timeoutError.status = 408;
        timeoutError.code = 'timeout';
        (timeoutError as any).details = error.config;
        throw timeoutError;
      }

      // Handle network errors (no response)
      if (!error.response) {
        const networkError = new Error(error.message || 'Network error') as ApiError;
        networkError.status = 0;
        networkError.code = 'network';
        throw networkError;
      }

      // Handle HTTP errors with responses
      const { status, data } = error.response;
      
      // Handle specific status codes
      switch (status) {
        case 401:
          localStorage.removeItem('token');
          // Consider redirecting through a router instead of window.location
          window.location.href = '/login';
          break;
        case 403:
        case 404:
        case 500:
          // Add specific handling as needed
          break;
      }

      // Create a new error with response details
      const errorData = new Error(
        typeof data === 'object' && data !== null && 'message' in data 
          ? (data as { message: string }).message 
          : 'An error occurred'
      ) as ApiError;
      
      errorData.status = status;
      errorData.code = `http-${status}`;
      (errorData as any).response = error.response;
      
      if (typeof data === 'object' && data !== null) {
        (errorData as any).details = data;
      }
      
      throw errorData;
    }

    // Handle non-Axios errors
    const unknownError = new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    ) as ApiError;
    unknownError.status = 500;
    unknownError.code = 'unknown';
    
    if (error instanceof Error) {
      unknownError.stack = error.stack;
    }
    
    throw unknownError;
  }
);

// Enhanced utility functions with better typing
export const get = async <T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
  const response = await api.get<T>(url, config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
};

export const post = async <T, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<ApiResponse<T>> => {
  const response = await api.post<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
};

export const put = async <T, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<ApiResponse<T>> => {
  const response = await api.put<T>(url, data, config);
  return response;
};

export const patch = async <T, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<ApiResponse<T>> => {
  const response = await api.patch<T>(url, data, config);
  return response;
};

export const del = async <T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
  const response = await api.delete<T>(url, config);
  return response;
};

// Optionally add other HTTP methods as needed
export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  // Add other methods if needed
};

export default api;