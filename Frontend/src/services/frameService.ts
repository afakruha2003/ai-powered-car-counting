import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface CameraFrame {
  data: string;
  timestamp: string;
}

export interface FrameResponse {
  success: boolean;
  frame: CameraFrame | null;
}

const frameService = {
  getLatestFrame: async (garageId: string): Promise<CameraFrame | null> => {
    try {
      const response = await apiService.get<FrameResponse>(
        API_ENDPOINTS.FRAMES.GET(garageId)
      );
      return response.frame;
    } catch (error) {
      console.error('Failed to fetch frame:', error);
      return null;
    }
  },
};

export default frameService;
