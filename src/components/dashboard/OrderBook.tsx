// src/components/dashboard/OrderBook.tsx
import React from 'react';

export const OrderBook: React.FC = () => {
  return (
    <div className="space-y-4 w-full bg-xyuz-card border border-gray-800 p-6 rounded-2xl shadow-xl text-white">
      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// LIVRO DE OFERTAS GLOBAL</h3>
      <div className="bg-xyuz-bg border border-gray-800 rounded-xl p-4 font-mono text-xs space-y-3">
        <div className="flex justify-between text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
          <span>ASK (Venda)</span>
          <span className="font-bold">BRL 164,80</span>
        </div>
        <div className="text-center py-1.5 border-y border-gray-800 text-gray-500 text-[10px] tracking-wider">
          ÚLTIMO FECHAMENTO SPOT: <span className="text-white font-bold font-mono">BRL 164,50</span>
        </div>
        <div className="flex justify-between text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
          <span>BID (Compra)</span>
          <span className="font-bold">BRL 164,50</span>
        </div>
      </div>
    </div>
  );
};
