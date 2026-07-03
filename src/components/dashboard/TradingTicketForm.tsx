// src/components/dashboard/TradingTicketForm.tsx
import React, { useState } from 'react';
import { useTrade } from '../../context/TradeContext';
import { xYUzAgroTradeFiservHub } from '../../mocks/fiservHubMock';

interface TradingTicketFormProps {
  onTransactionSuccess: (transaction: any) => void;
}

export const TradingTicketForm: React.FC<TradingTicketFormProps> = ({ onTransactionSuccess }) => {
  const { setBalance, addOrder } = useTrade();
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [amount, setAmount] = useState<number>(100);
  const [price, setPrice] = useState<number>(164.50);
  const [loading, setLoading] = useState<boolean>(false);

  const handleExecuteOrder = async () => {
    if (amount <= 0 || price <= 0) return;
    setLoading(true);

    try {
      const totalPrice = amount * price;
      const webhookResponse = await xYUzAgroTradeFiservHub.createPixTransaction({
        commodityId: 'soja-fob-santos',
        amount,
        totalPrice
      });
      
      onTransactionSuccess(webhookResponse.transaction);
      setBalance(prev => orderType === 'BUY' ? prev - totalPrice : prev + totalPrice);
      
      addOrder({
        id: webhookResponse.transaction.internal_order_id,
        asset: 'SOJA FOB SANTOS',
        lots: amount,
        type: orderType,
        status: 'EXECUTADA',
        time: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error("Erro na liquidação financeira via Fiserv HUB:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between shrink-0">
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// BOLETA OPERACIONAL</h3>
        
        <div className="flex rounded-xl p-1 bg-[#0B0F17] border border-gray-800">
          <button 
            onClick={() => setOrderType('BUY')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${orderType === 'BUY' ? 'bg-emerald-500 text-[#0B0F17]' : 'text-gray-400'}`}
          >
            COMPRA
          </button>
          <button 
            onClick={() => setOrderType('SELL')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${orderType === 'SELL' ? 'bg-red-600 text-white' : 'text-gray-400'}`}
          >
            VENDA
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Volume (Toneladas)</label>
            <input 
              type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2 text-sm font-semibold text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Preço Alvo (BRL)</label>
            <input 
              type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2 text-sm font-semibold text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal Operação:</span>
            <span className="text-white font-bold">BRL {(amount * price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleExecuteOrder} disabled={loading}
        className={`w-full py-3 mt-6 font-black rounded-xl text-xs transition-colors shadow-lg cursor-pointer ${
          loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : orderType === 'BUY' ? 'bg-emerald-500 text-[#0B0F17]' : 'bg-red-500 text-white'
        }`}
      >
        {loading ? 'ROTEANDO ORDEM FISERV...' : `DISPARAR CONTRATO DE ${orderType}`}
      </button>
    </div>
  );
};
