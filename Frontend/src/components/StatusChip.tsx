import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface StatusChipProps {
  status: 'success' | 'warning' | 'error';
  label: string;
  className?: string;
}

export default function StatusChip({ status, label, className = '' }: StatusChipProps) {
  const variants = {
    success: {
      bg: 'bg-[#4CAF50]/10',
      text: 'text-[#4CAF50]',
      icon: <CheckCircle className="w-4 h-4" />,
    },
    warning: {
      bg: 'bg-[#FFC107]/10',
      text: 'text-[#FFC107]',
      icon: <AlertCircle className="w-4 h-4" />,
    },
    error: {
      bg: 'bg-[#E53935]/10',
      text: 'text-[#E53935]',
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  const variant = variants[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${variant.bg} ${variant.text} ${className}`}
    >
      {variant.icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
