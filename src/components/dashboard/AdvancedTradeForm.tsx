import { feedback } from '../../services/feedback';
// src/components/dashboard/AdvancedTradeForm.tsx
import type React from 'react';
import { useState } from 'react';
import { useTrade } from '../../context/TradeContext';

export const AdvancedTradeForm: React.FC = () => {
  const { balance, setBalance, addOrder } = useTrade();
  const [asset, setAsset] = useState('SOJA');
  const [lots, setLots] = useState(10);

  const handleTrade = (type: 'COMPRA' | 'VENDA') => {
    const cost = lots * 164.50;
    if (type === 'COMPRA' && cost > balance) {
      feedback.error('Margem insuficiente');
      return;
    }

    setBalance(prev => type === 'COMPRA' ? prev - cost : prev + cost);
    addOrder({
      id: Math.random().toString(36).substring(7).toUpperCase(),
      asset,
      lots,
      type,
      status: 'EXECUTADA',
      time: new Date().toLocaleTimeString()
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">// Boleta Operacional Instantânea</h3>
      <div>
        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Selecione a Commodity</label>
        <select 
          value={asset} 
          onChange={(e) => setAsset(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="SOJA">Soja FOB Santos</option>
          <option value="MILHO">Milho Moagem Paranaguá</option>
          <option value="CAFE">Café Arábica Tipo 6</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Volume de Lotes (t)</label>
        <input 
          type="number" 
          value={lots} 
          onChange={(e) => setLots(Number(e.target.value))}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button onClick={() => handleTrade('COMPRA')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl transition-colors text-xs">
          COMPRA MERCADO
        </button>
        <button onClick={() => handleTrade('VENDA')} className="bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-xl transition-colors text-xs">
          VENDA MERCADO
        </button>
      </div>
    </div>
  );
};
