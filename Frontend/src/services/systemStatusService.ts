import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';
import { SystemStatus } from '../types/api';

export const systemStatusService = {
  async getSystemStatus(garageId: string): Promise<SystemStatus | null> {
    return apiService.get<SystemStatus | null>(
      API_ENDPOINTS.SYSTEM.GET_STATUS(garageId),
      false
    );
  },
};
