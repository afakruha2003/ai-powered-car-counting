import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from '../types/api';
import { storage } from '../utils/storage';

export const authService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiService.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
      false
    );
    
    storage.setUser(response.user);
    storage.setGarageId(response.garage._id);
    
    return response;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
      false
    );
    
    storage.setUser(response);
    
    return response;
  },

  logout() {
    storage.clear();
  },

  getCurrentUser() {
    return storage.getUser();
  },

  isAuthenticated(): boolean {
    return storage.getUser() !== null;
  },
};
