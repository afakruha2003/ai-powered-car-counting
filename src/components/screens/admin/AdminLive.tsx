import React from 'react';
import { Camera, DollarSign, Car, Activity } from 'lucide-react';
import StatusChip from '../../StatusChip';

export default function AdminLive() {
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
              <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Streaming</span>
            </div>
          </div>

          {/* Camera Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-[12px] overflow-hidden mb-4">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-16 h-16 text-gray-600 mb-3" />
              <p className="text-gray-500 text-sm">AI-Powered Detection</p>
              <p className="text-gray-600 text-xs mt-1">Downtown Plaza - Camera 1</p>
            </div>
            {/* Detection overlays */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-2 py-1 bg-[#4CAF50]/80 backdrop-blur-sm rounded text-xs text-white">
                  Vehicle #{i}
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-[8px] p-2 text-white text-xs">
              Detection Confidence: 98.5% • Processing: 30 FPS
            </div>
          </div>

          {/* Detection Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#3D5AFE]/5 to-[#536DFE]/5 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-[#3D5AFE]" />
                <span className="text-sm text-gray-600">Detected Now</span>
              </div>
              <div className="text-2xl text-[#3D5AFE]">89</div>
            </div>
            <div className="bg-gradient-to-br from-[#4CAF50]/5 to-[#4CAF50]/10 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#4CAF50]" />
                <span className="text-sm text-gray-600">Revenue Est.</span>
              </div>
              <div className="text-2xl text-[#4CAF50]">$2,654</div>
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
              <span className="text-sm text-gray-600">Camera Feed</span>
              <StatusChip status="success" label="Online" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">AI Detection</span>
              <StatusChip status="success" label="Active" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">API Connection</span>
              <StatusChip status="success" label="Connected" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-600">Last Update</span>
              <span className="text-sm text-gray-700">3 seconds ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
