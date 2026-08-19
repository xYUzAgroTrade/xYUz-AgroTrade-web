// src/components/dashboard/CoffeeOrderBook.tsx
import type React from 'react';

export const CoffeeOrderBook: React.FC = () => {
  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="border-b border-gray-800 pb-2">
        <h4 className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">// SPREAD SPOT - CAFÉ ARÁBICA</h4>
      </div>
      <div className="flex justify-between text-red-400 bg-red-500/5 p-2 rounded border border-red-500/10">
        <span>VENDEDOR (ASK) - Cooperativa Guaxupé</span>
        <span>BRL 1.122,00</span>
      </div>
      <div className="flex justify-between text-emerald-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
        <span>COMPRADOR (BID) - Exportadora Importadora S.A.</span>
        <span>BRL 1.120,00</span>
      </div>
    </div>
  );
};
