import { useState, useMemo } from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartContainer from '../../ChartContainer';
import Button from '../../Button';
import { useStatistics, useLiveState } from '../../../hooks';

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const statsParams = useMemo(() => {
    const now = new Date();
    
    if (activeTab === 'daily') {
      return { bucketType: 'HOUR' as const };
    } else if (activeTab === 'weekly') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); 
      weekEnd.setHours(23, 59, 59, 999);
      
      return {
        bucketType: 'DAY' as const,
        from: weekStart.toISOString(),
        to: weekEnd.toISOString()
      };
    } else {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      monthEnd.setHours(23, 59, 59, 999);
      
      return {
        bucketType: 'DAY' as const,
        from: monthStart.toISOString(),
        to: monthEnd.toISOString()
      };
    }
  }, [activeTab]);
  
  const { stats } = useStatistics(statsParams, true, 30000);
  const { liveState } = useLiveState(undefined, true, 5000);

  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly', icon: Calendar },
  ];

  const chartData = useMemo(() => {
    return stats.map((stat) => {
      const date = new Date(stat.bucketStart);
      let label = '';
      
      if (activeTab === 'daily') {
        label = date.getHours().toString().padStart(2, '0') + ':00';
      } else if (activeTab === 'weekly') {
        label = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } else {
        // Monthly view shows daily data
        label = date.toLocaleDateString('en-US', { day: 'numeric' });
      }
      
      return {
        label,
        vehicles: stat.entries || 0,
        revenue: stat.estimatedRevenue || 0,
        date: stat.bucketStart,
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [stats, activeTab]);

  const totalVehicles = useMemo(() => {
    return stats.reduce((sum, stat) => sum + (stat.entries || 0), 0);
  }, [stats]);

  const totalRevenue = useMemo(() => {
    return stats.reduce((sum, stat) => sum + (stat.estimatedRevenue || 0), 0);
  }, [stats]);

  const avgRevenuePerHour = useMemo(() => {
    if (stats.length === 0) return 0;
    return totalRevenue / stats.length;
  }, [totalRevenue, stats.length]);

  const peakRevenueSlot = useMemo(() => {
    if (stats.length === 0) return { time: 'N/A', revenue: 0 };
    const peak = stats.reduce((max, stat) => 
      (stat.estimatedRevenue || 0) > (max.estimatedRevenue || 0) ? stat : max
    , stats[0]);
    const date = new Date(peak.bucketStart);
    let time = '';
    
    if (activeTab === 'daily') {
      time = date.getHours().toString().padStart(2, '0') + ':00';
    } else if (activeTab === 'weekly') {
      time = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } else {
      // Monthly view shows day number
      time = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    return { time, revenue: peak.estimatedRevenue || 0 };
  }, [stats, activeTab]);

  const handleExport = () => {
    if (stats.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Period', 'Entries', 'Exits', 'Revenue', 'Date/Time'];
    const rows = stats.map(stat => {
      const date = new Date(stat.bucketStart);
      let period = '';
      
      if (activeTab === 'daily') {
        period = date.getHours().toString().padStart(2, '0') + ':00';
      } else if (activeTab === 'weekly') {
        period = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } else {
        // Monthly view shows day with month
        period = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      
      return [
        period,
        stat.entries || 0,
        stat.exits || 0,
        (stat.estimatedRevenue || 0).toFixed(2),
        date.toISOString()
      ];
    });

    rows.push([]);
    rows.push(['SUMMARY', '', '', '', '']);
    rows.push(['Total Vehicles', totalVehicles, '', '', '']);
    rows.push(['Total Revenue', '', '', totalRevenue.toFixed(2), '']);
    rows.push(['Average Revenue/Period', '', '', avgRevenuePerHour.toFixed(2), '']);
    rows.push(['Peak Revenue Period', peakRevenueSlot.time, '', peakRevenueSlot.revenue.toFixed(2), '']);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `parking-report-${activeTab}-${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6">
        <h1 className="text-xl text-white mb-2">Reports & Analytics</h1>
        <p className="text-white/80 text-sm">Financial and operational insights</p>
      </div>

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

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] rounded-[16px] p-5 shadow-md text-white">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Vehicles</span>
            </div>
            <div className="text-2xl mb-1">{totalVehicles}</div>
            <div className="text-xs opacity-80">{activeTab === 'daily' ? 'Today' : activeTab === 'weekly' ? 'This Week' : 'This Month'}</div>
          </div>

          <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-[16px] p-5 shadow-md text-white">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Revenue</span>
            </div>
            <div className="text-2xl mb-1">${totalRevenue.toFixed(2)}</div>
            <div className="text-xs opacity-80">{activeTab === 'daily' ? 'Today' : activeTab === 'weekly' ? 'This Week' : 'This Month'}</div>
          </div>
        </div>

        <ChartContainer title="Vehicle Traffic">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="vehicles" fill="#3D5AFE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <h3 className="text-base mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Revenue/Period</span>
              <span className="text-base text-gray-900">${avgRevenuePerHour.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Peak Revenue Period</span>
              <span className="text-base text-gray-900">{peakRevenueSlot.time} - ${peakRevenueSlot.revenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Current Occupancy Rate</span>
              <span className="text-base text-gray-900">{liveState ? `${Math.round(liveState.occupancyRate)}%` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Entries</span>
              <span className="text-base text-gray-900">{totalVehicles}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Exits</span>
              <span className="text-base text-gray-900">{stats.reduce((sum, s) => sum + (s.exits || 0), 0)}</span>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          fullWidth
          icon={<Download className="w-5 h-5" />}
          onClick={handleExport}
          disabled={stats.length === 0}
        >
          {stats.length === 0 ? 'No Data to Export' : 'Export Report (CSV)'}
        </Button>
      </div>
    </div>
  );
}
