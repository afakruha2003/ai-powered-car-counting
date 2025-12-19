import React, { useState } from 'react';
import { Mail, Lock, Building2 } from 'lucide-react';
import Button from '../Button';
import Input from '../Input';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-full bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6 flex flex-col">
      {/* Header */}
      <div className="mt-[90px] mb-[-74px] mr-[0px] ml-[0px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-[12px] flex items-center justify-center">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white font-normal">Autopark Owner</h1>
            <p className="text-white/80 text-sm">Management Portal</p>
          </div>
        </div>
        <p className="text-white/90">Sign in to manage your parking facilities</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-xl flex-1 mx-[0px] my-[100px] px-[24px] py-[78px]">
        {/* Form */}
        <div className="space-y-4 mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            icon={<Mail className="w-5 h-5" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            icon={<Lock className="w-5 h-5" />}
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button className="text-sm text-[#3D5AFE] hover:underline">Forgot Password?</button>
        </div>

        {/* Login Button */}
        <Button variant="primary" fullWidth onClick={onLogin}>
          Log In
        </Button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button className="text-sm text-[#3D5AFE]">Request Access</button>
        </div>
      </div>
    </div>
  );
}