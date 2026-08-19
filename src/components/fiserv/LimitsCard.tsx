// src/components/fiserv/LimitsCard.tsx
import type React from 'react';
import { useTrade } from '../../context/TradeContext';

export const LimitsCard: React.FC = () => {
  const { balance } = useTrade();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 shadow-md">
        <span className="text-[10px] font-bold text-gray-400 uppercase block font-mono">// DISPONÍVEL P/ SAQUE</span>
        <strong className="text-base font-mono text-white block mt-1">R$ {(balance * 0.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
      </div>
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 shadow-md">
        <span className="text-[10px] font-bold text-yellow-500 uppercase block font-mono">// RETIDO EM TRAVAS (10%)</span>
        <strong className="text-base font-mono text-yellow-400 block mt-1">R$ {(balance * 0.1).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
      </div>
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 shadow-md">
        <span className="text-[10px] font-bold text-emerald-400 uppercase block font-mono">// LIMITE DIÁRIO FISERV</span>
        <strong className="text-base font-mono text-emerald-400 block mt-1">R$ 5.000.000,00</strong>
      </div>
    </div>
  );
};
