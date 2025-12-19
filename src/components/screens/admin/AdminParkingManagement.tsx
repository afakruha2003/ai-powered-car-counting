import React, { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Users, Clock, Camera, CheckCircle } from 'lucide-react';
import Input from '../../Input';
import Button from '../../Button';
import StatusChip from '../../StatusChip';

interface AdminParkingManagementProps {
  onBack: () => void;
}

export default function AdminParkingManagement({ onBack }: AdminParkingManagementProps) {
  const [parkingName, setParkingName] = useState('Downtown Plaza');
  const [address, setAddress] = useState('123 Main Street, New York');
  const [pricePerHour, setPricePerHour] = useState('3.00');
  const [totalCapacity, setTotalCapacity] = useState('120');
  const [isOpen, setIsOpen] = useState(true);

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
              label="Address"
              value={address}
              onChange={setAddress}
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

        {/* Operating Status */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Operating Status</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
            <div>
              <p className="text-sm text-gray-700 mb-1">Parking Status</p>
              <p className="text-xs text-gray-500">Toggle to open/close parking</p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isOpen ? 'bg-[#4CAF50]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                  isOpen ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <StatusChip status={isOpen ? 'success' : 'error'} label={isOpen ? 'Open' : 'Closed'} />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">Operating Hours</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-700">Monday - Friday</span>
              <span className="text-sm text-gray-600">06:00 - 22:00</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-700">Saturday</span>
              <span className="text-sm text-gray-600">08:00 - 20:00</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[12px]">
              <span className="text-sm text-gray-700">Sunday</span>
              <span className="text-sm text-gray-600">08:00 - 18:00</span>
            </div>
          </div>
        </div>

        {/* Live Statistics */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Live Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#3D5AFE]/5 rounded-[12px]">
              <div className="text-2xl text-[#3D5AFE] mb-1">82</div>
              <div className="text-xs text-gray-500">Vehicles Inside</div>
            </div>
            <div className="text-center p-4 bg-[#4CAF50]/5 rounded-[12px]">
              <div className="text-2xl text-[#4CAF50] mb-1">38</div>
              <div className="text-xs text-gray-500">Free Slots</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-[12px] flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Revenue Today</span>
            <span className="text-base text-[#4CAF50]">$2,541</span>
          </div>
        </div>

        {/* Camera Status */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-[#3D5AFE]" />
            <h3 className="text-base">Camera & API Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Camera Status</span>
              <StatusChip status="success" label="Connected" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Detection</span>
              <StatusChip status="success" label="Active" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Update</span>
              <span className="text-sm text-gray-700">5 seconds ago</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          variant="primary"
          fullWidth
          icon={<CheckCircle className="w-5 h-5" />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
