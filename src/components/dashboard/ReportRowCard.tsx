// src/components/dashboard/ReportRowCard.tsx
import React from 'react';

interface ReportRowCardProps {
  title: string;
  type: string;
  size: string;
  onDownload: () => void;
}

export const ReportRowCard: React.FC<ReportRowCardProps> = ({ title, type, size, onDownload }) => {
  return (
    <div className="bg-[#111827] border border-gray-800 p-4 rounded-xl flex items-center justify-between shadow-lg transition-all hover:border-gray-700">
      <div className="flex items-center space-x-4">
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-1 rounded font-bold tracking-wider">
          {type}
        </span>
        <div>
          <h4 className="text-sm font-semibold text-white font-sans">{title}</h4>
          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">TAMANHO: {size}</span>
        </div>
      </div>
      
      <button 
        onClick={onDownload}
        className="text-xs text-emerald-400 hover:text-emerald-300 font-black font-sans transition-colors cursor-pointer"
      >
        Baixar Arquivo ↓
      </button>
    </div>
  );
};
