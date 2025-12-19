import React, { useState } from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartContainer from '../../ChartContainer';
import Button from '../../Button';

const dailyData = [
  { hour: '00', vehicles: 15, revenue: 45 },
  { hour: '04', vehicles: 8, revenue: 24 },
  { hour: '08', vehicles: 45, revenue: 135 },
  { hour: '12', vehicles: 78, revenue: 234 },
  { hour: '16', vehicles: 92, revenue: 276 },
  { hour: '20', vehicles: 65, revenue: 195 },
];

const weeklyData = [
  { day: 'Mon', vehicles: 450, revenue: 1350 },
  { day: 'Tue', vehicles: 520, revenue: 1560 },
  { day: 'Wed', vehicles: 480, revenue: 1440 },
  { day: 'Thu', vehicles: 540, revenue: 1620 },
  { day: 'Fri', vehicles: 680, revenue: 2040 },
  { day: 'Sat', vehicles: 720, revenue: 2160 },
  { day: 'Sun', vehicles: 590, revenue: 1770 },
];

const monthlyData = [
  { week: 'Week 1', vehicles: 3200, revenue: 9600 },
  { week: 'Week 2', vehicles: 3450, revenue: 10350 },
  { week: 'Week 3', vehicles: 3180, revenue: 9540 },
  { week: 'Week 4', vehicles: 3680, revenue: 11040 },
];

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly', icon: Calendar },
  ];

  const getChartData = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getXAxisKey = () => {
    switch (activeTab) {
      case 'weekly':
        return 'day';
      case 'monthly':
        return 'week';
      default:
        return 'hour';
    }
  };

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl text-white">Reports & Analytics</h1>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/80 text-sm">Financial and operational insights</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 pt-4">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-t-[12px] transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#3D5AFE] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] rounded-[16px] p-5 shadow-md text-white">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Vehicles</span>
            </div>
            <div className="text-2xl mb-1">2,847</div>
            <div className="text-xs opacity-80">Today</div>
          </div>

          <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-[16px] p-5 shadow-md text-white">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Revenue</span>
            </div>
            <div className="text-2xl mb-1">$8,541</div>
            <div className="text-xs opacity-80">Today</div>
          </div>
        </div>

        {/* Vehicle Chart */}
        <ChartContainer title="Vehicle Traffic">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={getXAxisKey()} stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="vehicles" fill="#3D5AFE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Detailed Statistics */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Revenue/Hour</span>
              <span className="text-base text-gray-900">$356</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Peak Revenue Hour</span>
              <span className="text-base text-gray-900">16:00 - $276</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Parking Duration</span>
              <span className="text-base text-gray-900">2.5 hours</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Occupancy Rate</span>
              <span className="text-base text-gray-900">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sessions Today</span>
              <span className="text-base text-gray-900">847</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="secondary"
          fullWidth
          icon={<Download className="w-5 h-5" />}
        >
          Export Report (PDF)
        </Button>
      </div>
    </div>
  );
}
