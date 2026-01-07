import { useState, useEffect, useCallback } from 'react';
import { systemStatusService } from '../services';
import { SystemStatus } from '../types/api';
import { storage } from '../utils/storage';

export const useSystemStatus = (garageId?: string, autoRefresh = false, refreshInterval = 10000) => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSystemStatus = useCallback(async () => {
    const id = garageId || storage.getGarageId();
    if (!id) {
      setError('No garage ID found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await systemStatusService.getSystemStatus(id);
      setSystemStatus(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch system status';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [garageId]);

  useEffect(() => {
    fetchSystemStatus();

    if (autoRefresh) {
      const interval = setInterval(fetchSystemStatus, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchSystemStatus, autoRefresh, refreshInterval]);

  return {
    systemStatus,
    loading,
    error,
    refetch: fetchSystemStatus,
  };
};
