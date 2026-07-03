// src/components/fiserv/CredentialCard.tsx
import React, { useState } from 'react';
import { securityExport } from '../../services/SecurityExportService'; // Importação adicionada

export const CredentialCard: React.FC = () => {
  const [environment, setEnvironment] = useState<'SANDBOX' | 'PRODUCTION'>('SANDBOX');
  const [showKey, setShowKey] = useState(false);
  const [secretKey, setSecretKey] = useState('xyuz_sandbox_secret_hmac_a1b2c3d4e5f6g7h8i9j0');

  const handleRotateKey = () => {
    const newRandomKey = `xyuz_${environment.toLowerCase()}_hmac_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setSecretKey(newRandomKey);
    alert(`[Fiserv HUB] Chave Secreta HMAC rotacionada com sucesso para o ambiente de ${environment}!`);
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-5 w-full text-white">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// AUTENTICAÇÃO FISERV GATEWAY</h3>
        
        <div className="flex rounded-lg p-0.5 bg-[#0B0F17] border border-gray-800 text-[10px]">
          <button 
            onClick={() => { setEnvironment('SANDBOX'); setSecretKey('xyuz_sandbox_secret_hmac_a1b2c3d4e5f6g7h8i9j0'); }}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${environment === 'SANDBOX' ? 'bg-emerald-500 text-[#0B0F17]' : 'text-gray-400'}`}
          >
            SANDBOX
          </button>
          <button 
            onClick={() => { setEnvironment('PRODUCTION'); setSecretKey('xyuz_live_secret_hmac_9f8e7d6c5b4a3f2e1d0c'); }}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${environment === 'PRODUCTION' ? 'bg-red-600 text-white' : 'text-gray-400'}`}
          >
            PRODUÇÃO
          </button>
        </div>
      </div>

      <div className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 block mb-1">Merchant ID (Estabelecimento):</span>
            <strong className="text-white font-sans">XYUZ_AGRO_BR_009912</strong>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">Client ID (API Client):</span>
            <strong className="text-white font-mono">cli_client_id_4f8a9b3c</strong>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-400 uppercase font-sans">Secret Key para Assinatura de Webhooks (HMAC SHA-256)</label>
          <div className="flex space-x-2">
            <input 
              type={showKey ? "text" : "password"} 
              value={secretKey} 
              readOnly
              className="flex-1 bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-emerald-400 focus:outline-none"
            />
            <button 
              onClick={() => setShowKey(!showKey)}
              className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-colors cursor-pointer"
            >
              {showKey ? 'OCULTAR' : 'EXIBIR'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            onClick={handleRotateKey}
            className="flex-1 bg-[#0B0F17] border border-gray-800 hover:border-gray-700 text-white font-bold py-2.5 rounded-xl text-xs font-sans transition-colors cursor-pointer text-center"
          >
            🔄 ROTACIONAR CHAVE SECRETA
          </button>
          
          {/* Ação Real de Exportação do Certificado .crt conectada */}
          <button 
            onClick={() => securityExport.exportMockCertificate()}
            className="flex-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white font-bold py-2.5 rounded-xl text-xs font-sans transition-colors cursor-pointer text-center"
          >
            📥 BAIXAR CERTIFICADO SSL (.CRT)
          </button>
        </div>
      </div>
    </div>
  );
};
