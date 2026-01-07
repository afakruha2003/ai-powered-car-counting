import { useEffect, useMemo, useState } from 'react';
import { Camera, DollarSign, Car, Activity } from 'lucide-react';
import StatusChip from '../../StatusChip';
import { useLiveState, useSystemStatus, useStatistics } from '../../../hooks';

export default function AdminLive() {
  const { liveState } = useLiveState(undefined, true, 3000);
  const { systemStatus } = useSystemStatus(undefined, true, 10000);
  const { stats } = useStatistics({ bucketType: 'HOUR' }, true, 10000);
  const [, setTick] = useState(0);

  // Update timestamp display every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentCars = liveState?.currentCars || 0;
  const isOnline = systemStatus?.aiCameraOnline || false;
  const lastPing = systemStatus?.lastCameraPing;

  const todayRevenue = useMemo(() => {
    return stats.reduce((sum, stat) => sum + (stat.estimatedRevenue || 0), 0);
  }, [stats]);

  const getTimeSinceUpdate = () => {
    if (!lastPing) return 'Never';
    const diff = Date.now() - new Date(lastPing).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6 pb-12">
        <h1 className="text-xl text-white mb-2">Live Monitor</h1>
        <p className="text-white/80 text-sm">Real-time parking operations</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 -mt-6">
        {/* Camera Feed */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base">Live Camera Feed</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#4CAF50] animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-500">{isOnline ? 'Streaming' : 'Offline'}</span>
            </div>
          </div>

          {/* Camera Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-[12px] overflow-hidden mb-4">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-16 h-16 text-gray-600 mb-3" />
              <p className="text-gray-500 text-sm">Live Camera Feed</p>
              <p className="text-gray-600 text-xs mt-1">Real-time Monitoring</p>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#3D5AFE]/5 to-[#536DFE]/5 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-[#3D5AFE]" />
                <span className="text-sm text-gray-600">Cars Inside</span>
              </div>
              <div className="text-2xl text-[#3D5AFE]">{currentCars}</div>
            </div>
            <div className="bg-gradient-to-br from-[#4CAF50]/5 to-[#4CAF50]/10 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#4CAF50]" />
                <span className="text-sm text-gray-600">Revenue Today</span>
              </div>
              <div className="text-2xl text-[#4CAF50]">${todayRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">Camera Status</span>
              <StatusChip status={isOnline ? 'success' : 'error'} label={isOnline ? 'Online' : 'Offline'} />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">API Connection</span>
              <StatusChip status={liveState ? 'success' : 'warning'} label={liveState ? 'Connected' : 'Connecting'} />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">Last Update</span>
              <span className="text-sm text-gray-700">{getTimeSinceUpdate()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
