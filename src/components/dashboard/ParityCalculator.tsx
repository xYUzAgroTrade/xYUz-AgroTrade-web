// src/components/dashboard/ParityCalculator.tsx
import React, { useState } from 'react';

export const ParityCalculator: React.FC = () => {
  const [cbotBushel, setCbotBushel] = useState<number>(12.45); // US$ por Bushel em Chicago
  const [dollarExchange, setDollarExchange] = useState<number>(5.15); // Câmbio Comercial
  const [freightCost, setFreightCost] = useState<number>(18.50); // Custo logístico interno BRL/saca

  // Fórmula matemática de exportação agrocomercial unificada
  const bushelToSackFactor = 2.2046; 
  const parityFasValue = (cbotBushel * dollarExchange * bushelToSackFactor) - freightCost;

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// CALCULADORA DE PARIDADE FAS (CBOT)</h3>
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Chicago (US$/Bushel)</label>
            <input 
              type="number" step="0.01" value={cbotBushel} 
              onChange={(e) => setCbotBushel(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Câmbio Comercial (BRL)</label>
            <input 
              type="number" step="0.01" value={dollarExchange} 
              onChange={(e) => setDollarExchange(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-gray-400 block font-sans">Preço Equivalente FAS Brasil:</span>
            <strong className="text-lg font-mono text-white">R$ {parityFasValue.toFixed(2)} <span className="text-xs text-gray-500 font-sans">/ saca 60kg</span></strong>
          </div>
        </div>
      </div>
    </div>
  );
};
