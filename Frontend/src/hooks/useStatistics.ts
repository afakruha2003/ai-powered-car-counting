import { useState, useEffect, useRef } from 'react';
import { statisticsService } from '../services';
import { GarageStats, StatsRequest } from '../types/api';
import { storage } from '../utils/storage';

export const useStatistics = (params?: StatsRequest, autoRefresh: boolean = false, refreshInterval: number = 30000, garageId?: string) => {
  const [stats, setStats] = useState<GarageStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstFetchRef = useRef(true);

  const fetchStats = async (fetchParams?: StatsRequest, fetchGarageId?: string) => {
    const id = fetchGarageId || garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    const requestParams = fetchParams || params;
    if (!requestParams) {
      setError('No parameters provided');
      return;
    }

    // Only show loading on first fetch
    if (isFirstFetchRef.current) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await statisticsService.getStats(id, requestParams);
      setStats(data);
      if (isFirstFetchRef.current) {
        isFirstFetchRef.current = false;
      }
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch statistics';
      setError(errorMessage);
      console.error('Statistics fetch error:', err);
    } finally {
      if (isFirstFetchRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (autoRefresh && params) {
      // Initial fetch
      fetchStats();
      
      // Set up interval for auto-refresh
      intervalRef.current = setInterval(() => {
        fetchStats();
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, refreshInterval, params?.bucketType, params?.from, params?.to, garageId]);

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
};
