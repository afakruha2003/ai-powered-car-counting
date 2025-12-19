import React, { useState } from 'react';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import AdminDashboard from './components/screens/admin/AdminDashboard';
import AdminLive from './components/screens/admin/AdminLive';
import AdminReports from './components/screens/admin/AdminReports';
import AdminSettings from './components/screens/admin/AdminSettings';
import AdminParkingManagement from './components/screens/admin/AdminParkingManagement';
import BottomNavigation from './components/BottomNavigation';

type Screen = 'splash' | 'login' | 'admin-dashboard' | 'admin-live' | 'admin-reports' | 'admin-settings' | 'admin-management';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Splash screen auto-advances
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('admin-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'admin-dashboard':
        return <AdminDashboard onManageClick={() => setCurrentScreen('admin-management')} />;
      case 'admin-live':
        return <AdminLive />;
      case 'admin-reports':
        return <AdminReports />;
      case 'admin-settings':
        return <AdminSettings onLogout={handleLogout} onManageParking={() => setCurrentScreen('admin-management')} />;
      case 'admin-management':
        return <AdminParkingManagement onBack={() => setCurrentScreen('admin-dashboard')} />;
      default:
        return <SplashScreen />;
    }
  };

  const showBottomNav = isLoggedIn && currentScreen !== 'admin-management';

  return (
    <div className="relative w-full h-screen bg-[#F7F8FA] overflow-hidden flex flex-col safe-area">
      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
}