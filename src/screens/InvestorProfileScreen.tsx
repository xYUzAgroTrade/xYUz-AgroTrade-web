// src/screens/InvestorProfileScreen.tsx
import React, { useState } from 'react';
import { KycProfileData } from '../components/fiserv/KycProfileData';
import { BrokerageNotePrint } from '../components/fiserv/BrokerageNotePrint';

export const InvestorProfileScreen: React.FC = () => {
  const [suitability] = useState('Hedger Comercial / Agronegócio');

  const handlePrintPDF = () => {
    // Dispara o motor nativo do navegador convertendo a folha de estilos CSS para PDF
    window.print();
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      {/* Bloco 1: Cadastro Institucional KYB */}
      <KycProfileData />

      {/* Bloco 2: Ação Superior de Exportação */}
      <div className="flex justify-end no-print w-full">
        <button 
          onClick={handlePrintPDF}
          className="bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg cursor-pointer"
        >
          📄 GERAR PDF DA NOTA DE CORRETAGEM
        </button>
      </div>

      {/* Bloco 3: Certidão de Notas Vinculada */}
      <div className="w-full">
        <BrokerageNotePrint suitability={suitability} />
      </div>
    </div>
  );
};
