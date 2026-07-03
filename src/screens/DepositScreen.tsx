// src/screens/DepositScreen.tsx
import React, { useState } from 'react';
import { useTrade } from '../context/TradeContext';
import { LimitsCard } from '../components/fiserv/LimitsCard';
import { InvoiceHistoryTable } from '../components/fiserv/InvoiceHistoryTable';

interface InvoiceLog {
  txid: string;
  amount: string;
  status: 'LIQUIDADO' | 'PENDENTE' | 'EXPIRADO';
  date: string;
}

export const DepositScreen: React.FC = () => {
  const { setBalance } = useTrade();
  const [inputValue, setInputValue] = useState('50000');
  const [pixString, setPixString] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTxid, setCurrentTxid] = useState('');
  const [history, setHistory] = useState<InvoiceLog[]>([]);

  const handleGeneratePixInvoice = () => {
    if (Number(inputValue) <= 0) return;
    setLoading(true);
    setPixString('');

    setTimeout(() => {
      const generatedTxid = `TXID${Math.floor(100000 + Math.random() * 900000)}`;
      // String real padronizada do formato EMV BRCode Pix gerado via Fiserv
      const mockPixString = `://pix25610019xyuzagrotradefiservhub.com.br5204000053039865408${Number(inputValue).toFixed(2)}5802BR5920xYUz AgroTrade Desk6009Sao Paulo62070503***63047A8F`;
      
      setPixString(mockPixString);
      setCurrentTxid(generatedTxid);
      setLoading(false);

      // Insere na lista histórica com status PENDENTE aguardando processamento do webhook
      setHistory(prev => [
        { txid: generatedTxid, amount: inputValue, status: 'PENDENTE', date: new Date().toLocaleDateString('pt-BR') },
        ...prev
      ]);
    }, 600);
  };

  const handleConfirmMockLiquidation = () => {
    setBalance(prev => prev + Number(inputValue));
    
    // Simula o Webhook Inbound atualizando o status do registro de PENDENTE para LIQUIDADO
    setHistory(prev => prev.map(inv => inv.txid === currentTxid ? { ...inv, status: 'LIQUIDADO' } : inv));
    
    alert(`Confirmação Inbound recebida! O Webhook Fiserv liquidou o Pix e creditou R$ ${Number(inputValue).toLocaleString('pt-BR')} na conta de garantias.`);
    setPixString('');
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      {/* Bloco 1: Limites e Saldos */}
      <LimitsCard />

      {/* Bloco 2: Painel Principal de Geração de QR Code e Cobrança */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        {/* Formulário Operacional */}
        <div className="w-full lg:w-96 bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// EMISSÃO CUSTÓDIA</h3>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Valor do Aporte de Garantia (BRL)</label>
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button 
            onClick={handleGeneratePixInvoice}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black py-3 rounded-xl shadow-lg mt-8 text-xs transition-colors cursor-pointer"
          >
            {loading ? 'SOLICITANDO BRCODE JUNTO A FISERV...' : 'GERAR COPIA E COLA / REGISTRAR PIX'}
          </button>
        </div>

        {/* Display do QR Code / Resposta do Gateway */}
        <div className="flex-1 w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl min-h-[220px] flex flex-col justify-center items-center text-center">
          {pixString ? (
            <div className="w-full space-y-4">
              <div className="w-24 h-28 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-gray-100 border-4 border-dashed border-emerald-500 rounded-lg flex items-center justify-center text-[10px] text-[#0B0F17] font-black font-mono">xYUz PIX</div>
              </div>
              
              <div className="space-y-1.5 text-left">
                <label className="block text-[9px] font-bold text-gray-400 uppercase font-sans">BRCode String (Cópia e Cola)</label>
                <textarea 
                  readOnly 
                  value={pixString}
                  className="w-full h-12 bg-[#0B0F17] border border-gray-800 rounded-xl p-2 text-[10px] font-mono text-emerald-400 resize-none focus:outline-none"
                />
              </div>

              <button 
                onClick={handleConfirmMockLiquidation}
                className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Simular Confirmação Bancária (Disparar Webhook)
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-gray-500">
              <span className="text-xl block font-mono">⚙️</span>
              <p className="text-xs italic max-w-xs mx-auto">Insira o montante comercial desejado para gerar a linha digitável criptografada do Pix corporativo.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bloco 3: Tabela de Ledger e Conciliação */}
      <div className="w-full">
        <InvoiceHistoryTable invoices={history} />
      </div>
    </div>
  );
};
