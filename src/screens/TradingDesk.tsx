import type React from 'react';
// Corrija a importação para o novo nome com X maiúsculo
import { XYUzBoletaTrading } from '../components/dashboard/XYUzBoletaTrading';

export const TradingDesk: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* ... restante do código do header ... */}

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-xyuz-navy">Mesa de Operações e Liquidação</h1>
          <p className="text-sm text-xyuz-slate">Orquestração de ativos físicos e controle de contingência para múltiplos provedores bancários parceiros.</p>
        </div>

        {/* Mude aqui também para a tag começar com X maiúsculo */}
        <XYUzBoletaTrading />
      </main>
    </div>
  );
};
