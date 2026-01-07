import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';
import { LiveState } from '../types/api';

export const liveStateService = {
  async getLiveState(garageId: string): Promise<LiveState> {
    return apiService.get<LiveState>(
      API_ENDPOINTS.LIVE.GET_STATE(garageId),
      true
    );
  },
};
