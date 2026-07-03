// src/components/dashboard/PriceAlertModal.tsx
import React, { useState } from 'react';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ isOpen, onClose }) => {
  const [triggerPrice, setTriggerPrice] = useState('165.00');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-4 text-white shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
          <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-widest">// DISPARAR ALERTA DE VOLATILIDADE</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-white font-bold text-sm">✕</button>
        </div>
        
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Preço Alvo de Gatilho (BRL)</label>
            <input 
              type="number" step="0.01" value={triggerPrice}
              onChange={(e) => setTriggerPrice(e.target.value)}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">O ecossistema disparará um sinal acústico e uma notificação via Webhook assim que o preço spot atingir o patamar indexado.</p>
        </div>

        <button 
          onClick={() => {
            alert(`Gatilho de proteção travado em BRL ${triggerPrice}`);
            onClose();
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black py-2.5 rounded-xl text-xs transition-colors shadow-lg"
        >
          ATIVAR MONITORAMENTO
        </button>
      </div>
    </div>
  );
};
