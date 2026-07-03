// src/components/dashboard/AuditSummaryCard.tsx
import React from 'react';

export const AuditSummaryCard: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl w-full text-white">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono mb-4">
        // RETENÇÃO FISCAL DE DOCUMENTOS (COESI)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-[#0B0F17] p-4 rounded-xl border border-gray-800">
          <span className="text-gray-500 block text-[10px] uppercase font-bold mb-1">Notas de Fixação Ativas</span>
          <strong className="text-white text-base">42 Arquivos</strong>
        </div>
        <div className="bg-[#0B0F17] p-4 rounded-xl border border-gray-800">
          <span className="text-gray-500 block text-[10px] uppercase font-bold mb-1">Status de Armazenamento</span>
          <strong className="text-emerald-400 text-base">100% SINC</strong>
        </div>
        <div className="bg-[#0B0F17] p-4 rounded-xl border border-gray-800">
          <span className="text-gray-500 block text-[10px] uppercase font-bold mb-1">Prazo de Retenção Legal</span>
          <strong className="text-white text-base">5 Anos (Mínimo)</strong>
        </div>
      </div>
    </div>
  );
};
