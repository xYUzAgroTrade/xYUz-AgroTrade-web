// src/components/dashboard/LogisticRiskCard.tsx
import type React from 'react';

export const LogisticRiskCard: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl w-full text-white h-full flex flex-col justify-between">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// RELATÓRIO DE RISCO LOGÍSTICO</h3>
        <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
          <p className="text-xs text-yellow-400 leading-relaxed font-medium font-sans">
            Line-up nos portos de Paranaguá e Santos aponta fila de espera média de 18 dias para embarque de granéis vegetais. Fator de alta para o prêmio spot.
          </p>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 font-mono mt-4 uppercase">
        Atualizado: Há 5 minutos via Malha Santos
      </div>
    </div>
  );
};
