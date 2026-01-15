import { useState, useEffect, useRef } from 'react';
import frameService, { CameraFrame } from '../services/frameService';

export const useFrame = (garageId: string | undefined, autoRefresh = true, refreshInterval = 1000) => {
  const [frame, setFrame] = useState<CameraFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstFetchRef = useRef(true);

  const fetchFrame = async () => {
    if (!garageId) return;

    try {
      if (isFirstFetchRef.current) {
        setLoading(true);
      }
      setError(null);
      
      const frameData = await frameService.getLatestFrame(garageId);
      setFrame(frameData);
      
      if (isFirstFetchRef.current) {
        isFirstFetchRef.current = false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch frame';
      setError(errorMessage);
      console.error('Frame fetch error:', err);
    } finally {
      if (isFirstFetchRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (autoRefresh && garageId) {
      fetchFrame();
      
      intervalRef.current = setInterval(() => {
        fetchFrame();
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, refreshInterval, garageId]);

  return {
    frame,
    loading,
    error,
    fetchFrame,
  };
};
