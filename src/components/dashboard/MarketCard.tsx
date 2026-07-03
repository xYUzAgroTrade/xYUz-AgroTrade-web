// src/components/dashboard/MarketCard.tsx
import React from 'react';

interface MarketCardProps {
  name: string;
  code: string;
  price: string;
  change: string;
  up: boolean;
}

export const MarketCard: React.FC<MarketCardProps> = ({ name, code, price, change, up }) => {
  return (
    // Atualizado para bg-xyuz-card-light e border-gray-800 para contraste máximo
    <div className="bg-xyuz-card border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl min-h-[140px] w-full text-white">
      <div className="flex justify-between items-start w-full">
        <div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block mb-1">{code}</span>
          <h4 className="text-sm font-bold text-white font-sans">{name}</h4>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
          up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {change}
        </span>
      </div>
      <div className="mt-6 flex justify-between items-end w-full">
        <span className="text-xl font-mono font-black text-white">{price}</span>
        <span className="text-[10px] text-gray-500 font-bold font-sans uppercase">/ t</span>
      </div>
    </div>
  );
};
