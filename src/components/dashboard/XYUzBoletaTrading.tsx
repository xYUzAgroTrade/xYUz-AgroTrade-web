// src/components/dashboard/XYUzBoletaTrading.tsx
import type React from 'react';
import { useState } from 'react';
import { TradingTicketForm } from './TradingTicketForm';
import { FiservOrchestratorPanel } from './FiservOrchestratorPanel';
import { OrderHistory } from './OrderHistory';

export const XYUzBoletaTrading: React.FC = () => {
  const [transactionResult, setTransactionResult] = useState<any>(null);

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      {/* Bloco Superior: Alinhamento das duas colunas funcionais */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
        
        {/* Boleta Operacional Pura */}
        <div className="w-full lg:w-80 shrink-0">
          <TradingTicketForm onTransactionSuccess={(tx) => setTransactionResult(tx)} />
        </div>

        {/* Orquestrador Fiserv HUB Calibrado em Dark Mode */}
        <div className="flex-1 w-full">
          <FiservOrchestratorPanel />
        </div>
      </div>

      {/* Bloco Intermediário: Monitor Webhook */}
      <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl font-mono text-xs overflow-x-auto min-h-[120px]">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
          <span className="text-emerald-400 font-bold">// CÂMARA DE COMPENSAÇÃO: MONITOR GATEWAY FISERV</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        {transactionResult ? (
          <pre className="text-emerald-300 bg-[#0B0F17] p-4 rounded-xl border border-gray-800 text-xs">{JSON.stringify({ transaction: transactionResult }, null, 2)}</pre>
        ) : (
          <span className="text-gray-500 italic">[Aviso] Nenhuma ordem enviada. Submeta uma intenção de lote na boleta lateral para capturar a payload unificada...</span>
        )}
      </div>

      {/* Bloco Inferior: Ledger Histórico */}
      <div className="w-full">
        <OrderHistory />
      </div>
    </div>
  );
};
