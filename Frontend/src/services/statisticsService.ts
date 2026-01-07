import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';
import { GarageStats, StatsRequest } from '../types/api';

export const statisticsService = {
  async getStats(garageId: string, params: StatsRequest): Promise<GarageStats[]> {
    return apiService.post<GarageStats[]>(
      API_ENDPOINTS.STATISTICS.GET(garageId),
      params,
      true
    );
  },
};
