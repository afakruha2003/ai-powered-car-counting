export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  },
  GARAGES: {
    GET_MY_GARAGES: '/api/garages/me',
    GET: (id: string) => `/api/garages/${id}`,
    UPDATE: (id: string) => `/api/garages/${id}`,
  },
  LIVE: {
    GET_STATE: (garageId: string) => `/api/live/${garageId}`,
  },
  STATISTICS: {
    GET: (garageId: string) => `/api/statistics/${garageId}`,
  },
  SYSTEM: {
    GET_STATUS: (garageId: string) => `/api/system/${garageId}`,
  },
  FRAMES: {
    GET: (garageId: string) => `/api/frames/${garageId}`,
  },
} as const;
