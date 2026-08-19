// src/screens/OnboardingScreen.tsx
import type React from 'react';
import { useTrade } from '../context/TradeContext';

export const OnboardingScreen: React.FC = () => {
  const { setLgpdAccepted, setTutorialCompleted } = useTrade();

  const handleAcceptTerms = () => {
    setLgpdAccepted(true);
    setTutorialCompleted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#111827] border border-gray-800 rounded-2xl p-8 space-y-6 text-white shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-3xl font-black tracking-wider text-white">xYUz-<span className="text-emerald-400">AgroTrade</span></span>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">// TERMOS DE USO & GOVERNANÇA LGPD</h3>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-gray-300 max-h-60 overflow-y-auto bg-[#0B0F17] p-4 rounded-xl border border-gray-800 font-mono">
          <p className="text-emerald-400 font-bold">// CLÁUSULA 1: TRATAMENTO DE DADOS COMERCIAIS</p>
          <p className="text-gray-400">Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a plataforma xYUz-AgroTrade coleta e processa dados cadastrais de pessoas jurídicas e fiscais exclusivamente para fins de compliance regulatório (KYC/KYB) e roteamento de ordens junto ao ecossistema Fiserv.</p>
          
          <p className="text-emerald-400 font-bold">// CLÁUSULA 2: SEGURANÇA E ARMAZENAMENTO</p>
          <p className="text-gray-400">Todos os dados de transações financeiras e ordens executadas são criptografados com o algoritmo AES-256 e salvos de forma imutável para trilhas de auditoria interbancária.</p>
        </div>

        <button 
          onClick={handleAcceptTerms}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black py-3 rounded-xl shadow-lg text-xs transition-colors cursor-pointer"
        >
          LI, COMPREENDI E ACEITO OS TERMOS DA LGPD
        </button>
      </div>
    </div>
  );
};
