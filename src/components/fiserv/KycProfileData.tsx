// src/components/fiserv/KycProfileData.tsx
import React from 'react';

export const KycProfileData: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4 w-full text-white">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// CADASTRO INSTITUCIONAL DE LIQUIDAÇÃO (KYB)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-2">
          <p><span className="text-gray-500">Razão Social:</span> <span className="text-white font-sans font-semibold">xYUz AgroTrade e Exportação S.A.</span></p>
          <p><span className="text-gray-500">Inscrição Estadual:</span> <span className="text-white">987.654.321.110</span></p>
          <p><span className="text-gray-500">Domicílio Bancário:</span> <span className="text-white font-sans">Banco BMG (Agência 0001 / CC 99234-1)</span></p>
        </div>
        <div className="space-y-2">
          <p><span className="text-gray-500">Status Receita:</span> <span className="text-emerald-400 font-bold">REGULAR / ATIVO</span></p>
          <p><span className="text-gray-500">Vínculo de Margem:</span> <span className="text-emerald-400 font-bold">HOMOLOGADO FISERV</span></p>
          <p><span className="text-gray-500">Última Auditoria:</span> <span className="text-gray-400">{new Date().toLocaleDateString('pt-BR')}</span></p>
        </div>
      </div>
    </div>
  );
};
