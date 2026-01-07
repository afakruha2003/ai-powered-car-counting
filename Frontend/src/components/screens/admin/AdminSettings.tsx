import { Info, LogOut, User, Building2, Camera, Copy } from 'lucide-react';
import Button from '../../Button';
import { useAuth, useGarage } from '../../../hooks';

interface AdminSettingsProps {
  onLogout: () => void;
  onManageParking: () => void;
}

export default function AdminSettings({ onLogout, onManageParking }: AdminSettingsProps) {
  const { user } = useAuth();
  const { garage, loading: garageLoading } = useGarage();

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6 pb-12">
        <h1 className="text-xl text-white mb-2">Settings</h1>
        <p className="text-white/80 text-sm">Admin configuration panel</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 -mt-6">
        {/* Account Information */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">Account Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[12px]">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user?.name || 'N/A'}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[12px]">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user?.email || 'N/A'}</span>
              </div>
            </div>
            <div className="p-3 bg-[#3D5AFE]/5 rounded-[12px] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#3D5AFE]" />
              <div>
                <p className="text-sm text-gray-700">Role: Autopark Owner</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {garageLoading ? 'Loading garage...' : garage ? `Managing: ${garage.name}` : 'Access to admin features'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Camera ID */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">Camera Configuration</h3>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Unique Camera ID</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-[12px]">
              <Camera className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700 font-mono flex-1">
                {garageLoading ? 'Loading...' : garage?.uniqueCameraId || 'N/A'}
              </span>
              <button
                onClick={() => {
                  if (garage?.uniqueCameraId) {
                    navigator.clipboard.writeText(garage.uniqueCameraId);
                  }
                }}
                className="p-2 hover:bg-gray-200 rounded-[8px] transition-colors"
                title="Copy Camera ID"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Use this ID to configure your camera system for data transmission
            </p>
          </div>
        </div>

        {/* Parking Management */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">Parking Management</h3>
          </div>
          <Button
            variant="secondary"
            fullWidth
            onClick={onManageParking}
          >
            Manage Parking Info
          </Button>
        </div>

        {/* About */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">About</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">App Name</span>
              <span className="text-sm text-gray-700">Smart Parking AI</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm text-gray-700">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Role</span>
              <span className="text-sm text-gray-700">Autopark Owner</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Smart Parking AI provides advanced analytics and management tools for autopark owners to optimize operations and maximize revenue.
          </p>
        </div>

        {/* Logout */}
        <Button
          variant="secondary"
          fullWidth
          onClick={onLogout}
          icon={<LogOut className="w-5 h-5" />}
          className="border-[#E53935] text-[#E53935] hover:bg-[#E53935]/5"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
