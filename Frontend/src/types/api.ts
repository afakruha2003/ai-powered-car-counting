export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Garage {
  _id: string;
  owner: string;
  name: string;
  capacity: number;
  pricePerHour: number;
  uniqueCameraId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  garage: {
    _id: string;
    name: string;
    uniqueCameraId: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends User {}

export interface LiveState {
  currentCars: number;
  availableSpots: number;
  occupancyRate: number;
  lastUpdate: string | null;
}

export interface GarageStats {
  _id: string;
  garage: string;
  bucketType: 'HOUR' | 'DAY' | 'WEEK';
  bucketStart: string;
  entries: number;
  exits: number;
  estimatedRevenue: number;
}

export interface StatsRequest {
  bucketType: 'HOUR' | 'DAY' | 'WEEK';
  from?: string;
  to?: string;
}

export interface SystemStatus {
  _id: string;
  garage: string;
  aiCameraOnline: boolean;
  lastCameraPing: string;
}

export interface UpdateGarageRequest {
  name?: string;
  capacity?: number;
  pricePerHour?: number;
}

export interface GetMyGaragesResponse {
  count: number;
  garages: Garage[];
}

export interface ApiError {
  message: string;
  status?: number;
}
