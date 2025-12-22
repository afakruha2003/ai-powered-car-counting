import React from 'react';
import { Car, Brain, Camera } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] flex flex-col items-center justify-center p-8 safe-area">
      {/* Logo */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl">
          <div className="relative">
            <Car className="w-12 h-12 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#3D5AFE]" />
            </div>
            <Camera className="absolute -bottom-1 -right-1 w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-3xl text-white mb-2 text-center">Smart Parking AI</h1>
      <p className="text-white/80 text-center mb-12">Intelligent Parking Management</p>

      {/* Loading Indicator */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Version */}
      <div className="absolute bottom-8 text-white/60 text-sm">v1.0.0</div>
    </div>
  );
}
