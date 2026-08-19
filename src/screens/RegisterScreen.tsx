// src/screens/RegisterScreen.tsx
import type React from 'react';
import { useState } from 'react';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin }) => {
  const [cnpj, setCnpj] = useState('');
  const [corporateName, setCorporateName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Solicitação de cadastro encaminhada para a mesa de compliance xYUz. Análise de KYC/KYB em andamento.");
    onNavigateToLogin();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">Solicitar Credenciamento</h2>
          <p className="text-xs text-gray-400">Insira os dados cadastrais da pessoa jurídica para análise de risco portuário.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Razão Social / Cooperativa</label>
            <input 
              type="text" 
              value={corporateName}
              onChange={(e) => setCorporateName(e.target.value)}
              placeholder="Agro Industrial S.A."
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">CNPJ</label>
            <input 
              type="text" 
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0001-00"
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-[#0B0F17] font-black py-3 rounded-xl shadow-lg text-xs transition-colors mt-2"
          >
            SUBMETER DADOS PARA CERTIFICAÇÃO
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={onNavigateToLogin}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Voltar para o Acesso Direto
          </button>
        </div>
      </div>
    </div>
  );
};
