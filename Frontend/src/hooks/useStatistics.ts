import { useState } from 'react';
import { statisticsService } from '../services';
import { GarageStats, StatsRequest } from '../types/api';
import { storage } from '../utils/storage';

export const useStatistics = () => {
  const [stats, setStats] = useState<GarageStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (params: StatsRequest, garageId?: string) => {
    const id = garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await statisticsService.getStats(id, params);
      setStats(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch statistics';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
};
