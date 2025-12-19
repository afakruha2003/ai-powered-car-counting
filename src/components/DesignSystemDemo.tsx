import React from "react";
import Button from "./Button";
import StatusChip from "./StatusChip";
import { Car, Settings, CheckCircle } from "lucide-react";

export default function DesignSystemDemo() {
  return (
    <div className="p-6 space-y-8 bg-[#F7F8FA]">
      <div>
        <h1 className="text-2xl mb-2">
          Smart Parking AI Design System
        </h1>
        <p className="text-gray-600">
          Material Design 3 • Modern Premium Mobile UI
        </p>
      </div>

      {/* Color Palette */}
      <div>
        <h2 className="text-xl mb-4">Color Palette</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="w-full h-20 bg-[#3D5AFE] rounded-[12px] shadow-md" />
            <p className="text-sm mt-2">Primary</p>
            <p className="text-xs text-gray-500">#3D5AFE</p>
          </div>
          <div>
            <div className="w-full h-20 bg-[#536DFE] rounded-[12px] shadow-md" />
            <p className="text-sm mt-2">Secondary</p>
            <p className="text-xs text-gray-500">#536DFE</p>
          </div>
          <div>
            <div className="w-full h-20 bg-[#4CAF50] rounded-[12px] shadow-md" />
            <p className="text-sm mt-2">Success</p>
            <p className="text-xs text-gray-500">#4CAF50</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <h2 className="text-xl mb-4">Buttons</h2>
        <div className="space-y-3">
          <Button
            variant="primary"
            icon={<Car className="w-5 h-5" />}
          >
            Primary Button
          </Button>
          <Button
            variant="secondary"
            icon={<Settings className="w-5 h-5" />}
          >
            Secondary Button
          </Button>
          <Button
            variant="icon"
            icon={<CheckCircle className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Status Chips */}
      <div>
        <h2 className="text-xl mb-4">Status Chips</h2>
        <div className="flex flex-wrap gap-3">
          <StatusChip status="success" label="Available" />
          <StatusChip status="warning" label="Moderate" />
          <StatusChip status="error" label="Full" />
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-xl mb-4">Typography</h2>
        <div className="space-y-2">
          <h1>Headline Large</h1>
          <h2>Title Large</h2>
          <h3>Title Medium</h3>
          <p>Body Medium - Regular text content</p>
          <p className="text-sm text-gray-600">
            Label Medium - Small labels
          </p>
        </div>
      </div>
    </div>
  );
}