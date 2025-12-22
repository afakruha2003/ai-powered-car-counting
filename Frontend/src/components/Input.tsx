import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  fullWidth = true,
  className = '',
}: InputProps) {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && <label className="block text-sm text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full px-4 ${icon ? 'pl-10' : ''} py-3 rounded-[12px] border border-gray-200 focus:border-[#3D5AFE] focus:outline-none focus:ring-2 focus:ring-[#3D5AFE]/20 transition-all bg-white`}
        />
      </div>
    </div>
  );
}
