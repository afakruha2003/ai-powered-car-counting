import React from 'react';
import { Car, MapPin } from 'lucide-react';
import StatusChip from './StatusChip';

interface ParkingCardProps {
  name: string;
  freeSlots: number;
  totalCapacity: number;
  vehiclesInside: number;
  status: 'open' | 'closed';
  variant?: 'small' | 'large';
  onClick?: () => void;
  className?: string;
}

export default function ParkingCard({
  name,
  freeSlots,
  totalCapacity,
  vehiclesInside,
  status,
  variant = 'large',
  onClick,
  className = '',
}: ParkingCardProps) {
  const occupancyRate = (vehiclesInside / totalCapacity) * 100;
  
  const getStatusType = () => {
    if (status === 'closed') return 'error';
    if (occupancyRate >= 90) return 'error';
    if (occupancyRate >= 70) return 'warning';
    return 'success';
  };

  if (variant === 'small') {
    return (
      <div
        onClick={onClick}
        className={`bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow ${className}`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#3D5AFE]" />
            <span className="text-sm">{name}</span>
          </div>
          <StatusChip status={getStatusType()} label={status === 'open' ? 'Open' : 'Closed'} />
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Car className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">{freeSlots} free</span>
          </div>
          <span className="text-xs text-gray-400">of {totalCapacity}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[16px] p-6 shadow-md border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg mb-1">{name}</h3>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Parking Area</span>
          </div>
        </div>
        <StatusChip status={getStatusType()} label={status === 'open' ? 'Open' : 'Closed'} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl text-[#3D5AFE] mb-1">{totalCapacity}</div>
          <div className="text-xs text-gray-500">Total Capacity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-gray-700 mb-1">{vehiclesInside}</div>
          <div className="text-xs text-gray-500">Vehicles Inside</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-[#4CAF50] mb-1">{freeSlots}</div>
          <div className="text-xs text-gray-500">Free Slots</div>
        </div>
      </div>

      {/* Occupancy Bar */}
      <div className="mt-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              occupancyRate >= 90 ? 'bg-[#E53935]' : occupancyRate >= 70 ? 'bg-[#FFC107]' : 'bg-[#4CAF50]'
            }`}
            style={{ width: `${occupancyRate}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">{occupancyRate.toFixed(0)}% occupied</div>
      </div>
    </div>
  );
}
