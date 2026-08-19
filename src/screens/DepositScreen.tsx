// src/screens/DepositScreen.tsx
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTrade } from '../context/TradeContext';
import { LimitsCard } from '../components/fiserv/LimitsCard';
import { InvoiceHistoryTable } from '../components/fiserv/InvoiceHistoryTable';
import { api } from '../services/apiClient';

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
  const [pollingStatus, setPollingStatus] = useState<string>('');
  const [history, setHistory] = useState<InvoiceLog[]>([]);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleGeneratePixInvoice = async () => {
    const amountBrl = Number(inputValue);
    if (amountBrl <= 0) return;

    setLoading(true);
    setPixString('');
    setPollingStatus('');

    try {
      const amountMinor = Math.round(amountBrl * 100);
      const response = await api.createPaymentIntent(amountMinor, 'BRL');
      const intent = response.data;

      setPixString(intent.copyPaste);

      // Adicionar ao historico como PENDENTE
      const txid = intent.id.slice(0, 12).toUpperCase();
      setHistory(prev => [
        { txid, amount: inputValue, status: 'PENDENTE', date: new Date().toLocaleDateString('pt-BR') },
        ...prev
      ]);

      // Iniciar polling de status (a cada 3 segundos)
      setPollingStatus('Aguardando pagamento...');
      startPolling(intent.id, txid, amountBrl);

    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Erro ao gerar PIX';
      setPollingStatus(`Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (paymentIntentId: string, txid: string, amountBrl: number) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    let attempts = 0;
    const maxAttempts = 120; // 6 minutos (120 * 3s)

    pollingRef.current = setInterval(async () => {
      attempts++;

      if (attempts > maxAttempts) {
        // Expirou
        if (pollingRef.current) clearInterval(pollingRef.current);
        setPollingStatus('PIX expirado. Gere um novo.');
        setHistory(prev => prev.map(inv => inv.txid === txid ? { ...inv, status: 'EXPIRADO' } : inv));
        setPixString('');
        return;
      }

      try {
        const response = await api.getPaymentIntent(paymentIntentId);
        const status = response.data.status;

        if (status === 'SUCCEEDED') {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setPollingStatus('Pagamento confirmado!');
          setHistory(prev => prev.map(inv => inv.txid === txid ? { ...inv, status: 'LIQUIDADO' } : inv));
          setBalance(prev => prev + amountBrl);
          setPixString('');
        } else if (status === 'FAILED' || status === 'EXPIRED') {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setPollingStatus(status === 'EXPIRED' ? 'PIX expirado.' : 'Pagamento falhou.');
          setHistory(prev => prev.map(inv => inv.txid === txid ? { ...inv, status: 'EXPIRADO' } : inv));
          setPixString('');
        } else {
          setPollingStatus(`Aguardando pagamento... (${attempts * 3}s)`);
        }
      } catch {
        // Erro de rede no polling - continua tentando
        setPollingStatus(`Verificando... (tentativa ${attempts})`);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      <LimitsCard />

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Formulario */}
        <div className="w-full lg:w-96 bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// DEPOSITO PIX</h3>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Valor do Aporte (BRL)</label>
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button 
            onClick={() => void handleGeneratePixInvoice()}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black py-3 rounded-xl shadow-lg mt-8 text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'GERANDO PIX...' : 'GERAR PIX COPIA E COLA'}
          </button>
        </div>

        {/* QR Code / Status */}
        <div className="flex-1 w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl min-h-[220px] flex flex-col justify-center items-center text-center">
          {pixString ? (
            <div className="w-full space-y-4">
              <div className="w-24 h-28 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-gray-100 border-4 border-dashed border-emerald-500 rounded-lg flex items-center justify-center text-[10px] text-[#0B0F17] font-black font-mono">xYUz PIX</div>
              </div>
              
              <div className="space-y-1.5 text-left">
                <label className="block text-[9px] font-bold text-gray-400 uppercase font-sans">BRCode PIX (Copia e Cola)</label>
                <textarea 
                  readOnly 
                  value={pixString}
                  className="w-full h-16 bg-[#0B0F17] border border-gray-800 rounded-xl p-2 text-[10px] font-mono text-emerald-400 resize-none focus:outline-none"
                />
              </div>

              {pollingStatus && (
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">{pollingStatus}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-gray-500">
              {pollingStatus ? (
                <p className="text-sm font-medium text-emerald-400">{pollingStatus}</p>
              ) : (
                <>
                  <span className="text-xl block font-mono">⚙️</span>
                  <p className="text-xs italic max-w-xs mx-auto">Insira o valor desejado para gerar o PIX de deposito de margem.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <InvoiceHistoryTable invoices={history} />
      </div>
    </div>
  );
};
