import { useMemo } from 'react';
import { Car, DollarSign, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartContainer from '../../ChartContainer';
import { useLiveState, useGarage, useStatistics } from '../../../hooks';

interface AdminDashboardProps {
  onManageClick: () => void;
}

export default function AdminDashboard({ onManageClick: _onManageClick }: AdminDashboardProps) {
  const { liveState } = useLiveState(undefined, true, 5000);
  const { garage } = useGarage();
  const { stats } = useStatistics({ bucketType: 'HOUR' }, true, 10000);

  const currentCars = liveState?.currentCars || 0;
  const capacity = garage?.capacity || 120;
  const availableSpots = liveState?.availableSpots || 0;
  const occupancyRate = liveState?.occupancyRate || 0;

  const todayRevenue = useMemo(() => {
    return stats.reduce((sum, stat) => sum + (stat.estimatedRevenue || 0), 0);
  }, [stats]);

  const hourlyData = useMemo(() => {
    return stats.map(stat => {
      const date = new Date(stat.bucketStart);
      const hour = date.getHours().toString().padStart(2, '0') + ':00';
      return {
        hour,
        vehicles: stat.entries || 0,
      };
    }).sort((a, b) => a.hour.localeCompare(b.hour));
  }, [stats]);

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] pb-[7px] bg-[rgba(195,69,69,0)] pt-[24px] pr-[24px] pl-[24px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl text-white mb-1">Dashboard</h1>
            <p className="text-white/80 text-sm">Autopark Owner Panel</p>
          </div>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 mt-[-2px] mr-[0px] mb-[0px] ml-[0px]">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-[16px] p-4 shadow-md">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center bg-[rgba(81,134,255,0.32)]">
              <Car className="w-6 h-6 text-[#536DFE]" />
            </div>
            <div className="text-2xl text-[#3D5AFE] mb-1">{currentCars}</div>
            <div className="text-xs text-gray-500">Cars Inside</div>
          </div>

          <div className="bg-white rounded-[16px] p-4 shadow-md">
            <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <div className="text-2xl text-[#4CAF50] mb-1">${todayRevenue.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>

          <div className="bg-white rounded-[16px] p-4 shadow-md">
            <div className="w-10 h-10 bg-[#FFC107]/10 rounded-full flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div className="text-2xl text-[#FFC107] mb-1">{Math.round(occupancyRate)}%</div>
            <div className="text-xs text-gray-500">Occupancy</div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Current Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#3D5AFE]/5 to-[#536DFE]/5 rounded-[12px] p-4">
              <p className="text-sm text-gray-600 mb-2">Vehicles Inside</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl text-[#3D5AFE]">{currentCars}</span>
                <span className="text-sm text-gray-500 mb-1">of {capacity}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#4CAF50]/5 to-[#4CAF50]/10 rounded-[12px] p-4">
              <p className="text-sm text-gray-600 mb-2">Free Slots</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl text-[#4CAF50]">{availableSpots}</span>
                <span className="text-sm text-gray-500 mb-1">available</span>
              </div>
            </div>
          </div>

          {/* Occupancy Bar */}
          <div className="mt-4">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#3D5AFE] to-[#536DFE]" style={{ width: `${occupancyRate}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0</span>
              <span>{Math.round(occupancyRate)}% Occupied</span>
              <span>{capacity}</span>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-[16px] p-6 shadow-md text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/90 text-sm mb-2">Revenue Today</p>
              <p className="text-3xl">${todayRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>
        

        {/* Vehicles Per Hour Chart */}
        <ChartContainer title="Vehicles Per Hour (Today)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="vehicles" fill="#3D5AFE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        
      </div>
    </div>
  );
}