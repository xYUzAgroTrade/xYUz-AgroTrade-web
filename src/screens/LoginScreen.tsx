// src/screens/LoginScreen.tsx
import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedLgpd, setAcceptedLgpd] = useState(false);
  const [step, setStep] = useState<'CREDENTIALS' | 'COMPLIANCE'>('CREDENTIALS');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setStep('COMPLIANCE');
    } else {
      alert("Por favor, preencha os dados da conta master xYUz.");
    }
  };

  const handleFinalSubmit = () => {
    if (!acceptedLgpd) {
      alert("É obrigatório aceitar os termos de LGPD e Tutorial para acessar a mesa.");
      return;
    }
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-3xl font-black tracking-wider text-white">xYUz</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold block w-max mx-auto">AGROTRADE DESK</span>
        </div>

        {step === 'CREDENTIALS' ? (
          /* ETAPA 1: Credenciais de Acesso */
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">E-mail Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operador@xyuz.com"
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Chave de Segurança</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black py-3 rounded-xl shadow-lg text-xs transition-colors mt-2 cursor-pointer"
            >
              AVANÇAR PARA TERMOS OPERACIONAIS →
            </button>

            <div className="text-center pt-2">
              <button 
                type="button"
                onClick={onNavigateToRegister}
                className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Solicitar Abertura de Conta Comercial
              </button>
            </div>
          </form>
        ) : (
          /* ETAPA 2: Aceite LGPD + Tutorial Obrigatório */
          <div className="space-y-5">
            <div className="text-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">// GOVERNANÇA, LGPD & TUTORIAL</h3>
            </div>

            {/* Painel do Tutorial / Documento Legal Integrado */}
            <div className="space-y-4 text-[11px] leading-relaxed text-gray-300 max-h-48 overflow-y-auto bg-[#0B0F17] p-4 rounded-xl border border-gray-800 font-mono">
              <p className="text-emerald-400 font-bold">[TUTORIAL_01] WS REALTIME TICKERS</p>
              <p className="text-gray-400">As cotações de Soja, Milho e Café no Mercado Global atualizam sozinhas via barramento WebSocket contínuo a cada 1.5s.</p>
              
              <p className="text-emerald-400 font-bold">[TUTORIAL_02] CÂMARA MULTI-PSP FISERV</p>
              <p className="text-gray-400">As ordens da Mesa são roteadas e orquestradas dinamicamente pelo HUB Fiserv buscando o menor custo de liquidação interbancária.</p>

              <p className="text-emerald-400 font-bold">[TERMOS_LGPD] LEI 13.709/18</p>
              <p className="text-gray-400">Ao assinar a certidão abaixo, você concorda com o tratamento criptografado de dados fiscais de ordens físicas para fins exclusivos de auditoria em conformidade com as diretrizes do Banco Central do Brasil.</p>
            </div>

            {/* Checkbox de Consentimento */}
            <label className="flex items-start space-x-3 bg-[#0B0F17] p-3 rounded-xl border border-gray-800 cursor-pointer">
              <input 
                type="checkbox" 
                checked={acceptedLgpd}
                onChange={(e) => setAcceptedLgpd(e.target.checked)}
                className="mt-0.5 accent-emerald-500 h-4 w-4 rounded"
              />
              <span className="text-xs text-gray-300 leading-tight">Declaro que realizei o tutorial e dou consentimento para o tratamento de dados de trading sob as regras LGPD.</span>
            </label>

            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => setStep('CREDENTIALS')}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                ← VOLTAR
              </button>
              <button 
                onClick={handleFinalSubmit}
                className={`flex-1 font-black py-3 rounded-xl text-xs transition-all shadow-lg cursor-pointer ${
                  acceptedLgpd ? 'bg-emerald-500 text-[#0B0F17] shadow-emerald-500/10' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                ENTRAR NA MESA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
