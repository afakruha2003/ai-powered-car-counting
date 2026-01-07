import { useState, useEffect, useCallback } from 'react';
import { garageService } from '../services';
import { Garage, UpdateGarageRequest } from '../types/api';
import { storage } from '../utils/storage';

export const useGarage = () => {
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGarage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let garageId = storage.getGarageId();
      
      if (!garageId) {
        const response = await garageService.getMyGarages();
        if (response.garages.length > 0) {
          const firstGarage = response.garages[0];
          storage.setGarageId(firstGarage._id);
          setGarage(firstGarage);
          return;
        } else {
          setError('No garage found for this user');
          return;
        }
      }

      const data = await garageService.getGarage(garageId);
      setGarage(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch garage');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGarage();
  }, [fetchGarage]);

  const updateGarage = async (data: UpdateGarageRequest, garageId?: string) => {
    const id = garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updated = await garageService.updateGarage(id, data);
      setGarage(updated);
      return updated;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update garage';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    garage,
    loading,
    error,
    updateGarage,
    refetch: fetchGarage,
  };
};
