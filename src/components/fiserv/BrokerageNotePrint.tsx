// src/components/fiserv/BrokerageNotePrint.tsx
import React from 'react';
import { useTrade } from '../../context/TradeContext';

interface BrokerageNotePrintProps {
  suitability: string;
}

export const BrokerageNotePrint: React.FC<BrokerageNotePrintProps> = ({ suitability }) => {
  const { balance, orders } = useTrade();

  return (
    <div id="printable-area" className="bg-[#111827] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl text-white">
      {/* Cabeçalho da Certidão */}
      <div className="border-b border-gray-800 pb-4 flex justify-between items-center w-full">
        <div>
          <h2 className="text-lg font-bold text-white font-sans">xYUz-AgroTrade // Certidão de Relatório Comercial</h2>
          <p className="text-xs text-gray-400 font-sans mt-0.5">Extrato institucional consolidado de compliance, ordens físicas e custódia de garantias.</p>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded font-mono font-bold tracking-wider uppercase shrink-0">
          PERFIL: APROVADO
        </span>
      </div>

      {/* Dados Métricos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono border-b border-gray-800 pb-6 w-full">
        <div className="space-y-1">
          <span className="text-gray-500 block">Classificação de Risco Operacional:</span>
          <strong className="text-sm text-white font-sans font-bold">{suitability}</strong>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 block">Margem Patrimonial em Custódia:</span>
          <strong className="text-sm text-emerald-400 font-mono font-bold">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
      </div>

      {/* Histórico de Ordens Vinculado */}
      <div className="space-y-3 w-full">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">// EXTRATO DE ORDENS PROCESSADAS VIA FISERV</h3>
        <div className="border border-gray-800 rounded-xl overflow-hidden text-xs font-mono w-full">
          <div className="grid grid-cols-3 bg-[#0B0F17] p-3 text-gray-400 border-b border-gray-800 font-bold w-full">
            <span>COMMODITY</span>
            <span>VOLUME</span>
            <span>STATUS_LIQ</span>
          </div>
          {orders.length === 0 ? (
            <div className="p-4 text-center text-gray-500 italic font-sans">[Aviso] Nenhum contrato liquidado nesta sessão operacional.</div>
          ) : (
            <div className="divide-y divide-gray-800/40 w-full">
              {orders.map((o, i) => (
                <div key={i} className="grid grid-cols-3 p-3 text-gray-200 hover:bg-gray-900/10 w-full">
                  <span className="font-sans font-semibold">{o.asset}</span>
                  <span className="font-bold">{o.lots} t</span>
                  <span className="text-emerald-400 font-bold">{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
