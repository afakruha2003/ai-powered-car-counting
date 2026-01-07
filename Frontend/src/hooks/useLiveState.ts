import { useState, useEffect, useCallback } from 'react';
import { liveStateService } from '../services';
import { LiveState } from '../types/api';
import { storage } from '../utils/storage';

export const useLiveState = (garageId?: string, autoRefresh = false, refreshInterval = 5000) => {
  const [liveState, setLiveState] = useState<LiveState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveState = useCallback(async () => {
    const id = garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await liveStateService.getLiveState(id);
      setLiveState(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch live state';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [garageId]);

  useEffect(() => {
    fetchLiveState();

    if (autoRefresh) {
      const interval = setInterval(fetchLiveState, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchLiveState, autoRefresh, refreshInterval]);

  return {
    liveState,
    loading,
    error,
    refetch: fetchLiveState,
  };
};
