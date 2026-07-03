// src/components/dashboard/BalanceDemandCard.tsx
import React from 'react';

export const BalanceDemandCard: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl w-full text-white">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono mb-4">
        // BALANÇO DE OFERTA E DEMANDA (Mundial)
      </h3>
      <div className="space-y-3 text-xs font-mono">
        <div className="flex justify-between border-b border-gray-800/60 pb-2 text-gray-400">
          <span>Produção Estimada Brasil (2026/2027)</span>
          <strong className="text-white font-sans">153.5 Milhões de Toneladas</strong>
        </div>
        <div className="flex justify-between border-b border-gray-800/60 pb-2 text-gray-400">
          <span>Esmagamento Interno Projetado</span>
          <strong className="text-white font-sans">55.2 Milhões de Toneladas</strong>
        </div>
        <div className="flex justify-between border-b border-gray-800/60 pb-2 text-gray-400">
          <span>Estoques de Passagem Globais (USDA)</span>
          <strong className="text-white font-sans">102.4 Milhões de Toneladas</strong>
        </div>
      </div>
    </div>
  );
};
