// src/components/common/GlassCard.tsx
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    // Alterado de bg-white/70 para bg-[#111827] (Cinza Escuro Premium)
    <div className={`bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};
