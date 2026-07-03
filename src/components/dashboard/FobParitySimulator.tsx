// src/components/dashboard/FobParitySimulator.tsx
import React, { useState } from 'react';

export const FobParitySimulator: React.FC = () => {
  const [premium, setPremium] = useState<number>(1.25);
  const [elevation, setElevation] = useState<number>(4.50);

  return (
    <div className="space-y-4 w-full bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl text-white">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// SIMULADOR DE PARIDADE FOB PORTO</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Prêmio de Embarque (US¢/bu)</label>
          <input 
            type="number" step="0.01" value={premium} onChange={(e) => setPremium(Number(e.target.value))}
            className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl px-4 py-2.5 font-mono text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Gasto de Elevação (BRL/t)</label>
          <input 
            type="number" step="0.10" value={elevation} onChange={(e) => setElevation(Number(e.target.value))}
            className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl px-4 py-2.5 font-mono text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
        <span>Preço de Exportação Calculado:</span>
        <span className="text-emerald-400 font-bold text-base">BRL {((12.45 + premium) * 5.15 * 2.2046 + elevation).toFixed(2)} / t</span>
      </div>
    </div>
  );
};
