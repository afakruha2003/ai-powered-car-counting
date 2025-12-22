import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  icon,
  fullWidth = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-[#3D5AFE] text-white hover:bg-[#536DFE] active:bg-[#3D5AFE] px-6 py-3 shadow-md',
    secondary: 'bg-transparent text-[#3D5AFE] border-2 border-[#3D5AFE] hover:bg-[#3D5AFE]/5 px-6 py-3',
    icon: 'bg-transparent text-[#3D5AFE] hover:bg-[#3D5AFE]/10 p-2 rounded-full',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${disabledClass} ${className} touch-manipulation`}
      style={{ minHeight: '44px', touchAction: 'manipulation' }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
