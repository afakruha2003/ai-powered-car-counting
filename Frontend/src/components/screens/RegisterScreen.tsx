import { useState } from 'react';
import { Mail, Lock, Building2, User } from 'lucide-react';
import Button from '../Button';
import Input from '../Input';
import { useAuth } from '../../hooks';

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export default function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, loading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLocalError(null);

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      await register({ name, email, password });
      onRegister();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="h-full bg-gradient-to-br from-[#3D5AFE] to-[#536DFE] p-6 flex flex-col">
      {/* Header */}
      <div className="mt-[60px] mb-[-44px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-[12px] flex items-center justify-center">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white font-normal">Create Account</h1>
            <p className="text-white/80 text-sm">Autopark Owner Portal</p>
          </div>
        </div>
        <p className="text-white/90">Register to start managing your parking facility</p>
      </div>

      {/* Register Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-xl flex-1 mx-[0px] my-[70px] px-[24px] py-[48px]">
        {/* Form */}
        <div className="space-y-4 mb-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={setName}
            icon={<User className="w-5 h-5" />}
          />
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
            placeholder="Create a password (min 6 characters)"
            value={password}
            onChange={setPassword}
            icon={<Lock className="w-5 h-5" />}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            icon={<Lock className="w-5 h-5" />}
          />
        </div>

        {/* Error Message */}
        {displayError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px]">
            <p className="text-sm text-red-600">{displayError}</p>
          </div>
        )}

        {/* Register Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleRegister}
          disabled={loading || !name || !email || !password || !confirmPassword}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button 
            className="text-sm text-[#3D5AFE] hover:underline"
            onClick={onBackToLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
