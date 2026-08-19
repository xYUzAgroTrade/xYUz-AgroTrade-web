// src/components/dashboard/OrderHistory.tsx
import type React from 'react';
import { useTrade } from '../../context/TradeContext';

export const OrderHistory: React.FC = () => {
  const { orders } = useTrade();

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// TRILHA DE ORDENS EXECUTADAS (MESA MASTER)</h3>
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0B0F17] text-gray-400 border-b border-gray-800">
              <tr>
                <th className="p-4">ID_ORDEM</th>
                <th className="p-4">COMMODITY</th>
                <th className="p-4">TIPO</th>
                <th className="p-4">VOLUME</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-300">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500 italic">[Aviso] Nenhuma operação registrada na sessão ativa.</td>
                </tr>
              ) : (
                orders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-gray-900/30 transition-colors">
                    <td className="p-4 text-emerald-400 font-bold">{ord.id}</td>
                    <td className="p-4 text-white font-sans font-semibold">{ord.asset}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-black text-[10px] ${ord.type === 'BUY' || ord.type === 'COMPRA' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {ord.type}
                      </span>
                    </td>
                    <td className="p-4 font-bold">{ord.lots} t</td>
                    <td className="p-4 text-gray-400">{ord.status}</td>
                    <td className="p-4 text-gray-500">{ord.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
