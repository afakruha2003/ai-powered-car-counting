import React from 'react';
import { Camera, LayoutDashboard, FileText, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
}

export default function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const tabs = [
    { id: 'admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'admin-live', icon: Camera, label: 'Live' },
    { id: 'admin-reports', icon: FileText, label: 'Reports' },
    { id: 'admin-settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[12px] transition-all touch-manipulation ${
                isActive ? 'bg-[#3D5AFE]/10 text-[#3D5AFE]' : 'text-gray-500 active:bg-gray-50'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#3D5AFE]' : 'text-gray-500'}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}