import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, DollarSign, Users, CheckCircle } from 'lucide-react';
import Input from '../../Input';
import Button from '../../Button';
import { useGarage, useLiveState } from '../../../hooks';

interface AdminParkingManagementProps {
  onBack: () => void;
}

export default function AdminParkingManagement({ onBack }: AdminParkingManagementProps) {
  const { garage, updateGarage, loading } = useGarage();
  const { liveState } = useLiveState(undefined, true, 5000);

  const [parkingName, setParkingName] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (garage) {
      setParkingName(garage.name || '');
      setPricePerHour(garage.pricePerHour?.toString() || '');
      setTotalCapacity(garage.capacity?.toString() || '');
    }
  }, [garage]);

  const handleSave = async () => {
    setSaveSuccess(false);
    setSaveError(null);

    try {
      await updateGarage({
        name: parkingName,
        pricePerHour: parseFloat(pricePerHour),
        capacity: parseInt(totalCapacity),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save changes');
    }
  };

  const currentCars = liveState?.currentCars || 0;
  const availableSpots = liveState?.availableSpots || 0;

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl text-white">Parking Management</h1>
            <p className="text-white/80 text-sm">Configure your parking details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 -mt-4">
        {/* Basic Information */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Basic Information</h3>
          <div className="space-y-4">
            <Input
              label="Parking Name"
              value={parkingName}
              onChange={setParkingName}
              icon={<MapPin className="w-5 h-5" />}
            />
            <Input
              label="Price per Hour ($)"
              type="number"
              value={pricePerHour}
              onChange={setPricePerHour}
              icon={<DollarSign className="w-5 h-5" />}
            />
            <Input
              label="Total Capacity"
              type="number"
              value={totalCapacity}
              onChange={setTotalCapacity}
              icon={<Users className="w-5 h-5" />}
            />
          </div>
        </div>


        {/* Live Statistics */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Live Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#3D5AFE]/5 rounded-[12px]">
              <div className="text-2xl text-[#3D5AFE] mb-1">{currentCars}</div>
              <div className="text-xs text-gray-500">Vehicles Inside</div>
            </div>
            <div className="text-center p-4 bg-[#4CAF50]/5 rounded-[12px]">
              <div className="text-2xl text-[#4CAF50] mb-1">{availableSpots}</div>
              <div className="text-xs text-gray-500">Free Slots</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-[12px] flex items-center justify-between">
            <span className="text-sm text-gray-600">Price per Hour</span>
            <span className="text-base text-[#4CAF50]">${garage?.pricePerHour || 0}</span>
          </div>
        </div>

        {/* Success/Error Messages */}
        {saveSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-[12px]">
            <p className="text-sm text-green-600">Changes saved successfully!</p>
          </div>
        )}
        {saveError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[12px]">
            <p className="text-sm text-red-600">{saveError}</p>
          </div>
        )}

        {/* Save Button */}
        <Button
          variant="primary"
          fullWidth
          icon={<CheckCircle className="w-5 h-5" />}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
