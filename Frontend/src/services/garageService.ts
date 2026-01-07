import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';
import { Garage, UpdateGarageRequest, GetMyGaragesResponse } from '../types/api';

export const garageService = {
  async getMyGarages(): Promise<GetMyGaragesResponse> {
    return apiService.get<GetMyGaragesResponse>(
      API_ENDPOINTS.GARAGES.GET_MY_GARAGES,
      true
    );
  },

  async getGarage(garageId: string): Promise<Garage> {
    return apiService.get<Garage>(
      API_ENDPOINTS.GARAGES.GET(garageId),
      true
    );
  },

  async updateGarage(
    garageId: string,
    data: UpdateGarageRequest
  ): Promise<Garage> {
    return apiService.put<Garage>(
      API_ENDPOINTS.GARAGES.UPDATE(garageId),
      data,
      true
    );
  },
};
