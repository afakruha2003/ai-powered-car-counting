import { useState, useEffect, useCallback } from 'react';
import { liveStateService } from '../services';
import { LiveState } from '../types/api';
import { storage } from '../utils/storage';

export const useLiveState = (garageId?: string, autoRefresh = false, refreshInterval = 5000) => {
  const [liveState, setLiveState] = useState<LiveState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const fetchLiveState = useCallback(async () => {
    const id = garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    // Only show loading on first fetch
    if (isFirstFetch) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await liveStateService.getLiveState(id);
      setLiveState(data);
      if (isFirstFetch) {
        setIsFirstFetch(false);
      }
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch live state';
      setError(errorMessage);
    } finally {
      if (isFirstFetch) {
        setLoading(false);
      }
    }
  }, [garageId, isFirstFetch]);

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
