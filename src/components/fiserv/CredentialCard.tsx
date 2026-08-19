// src/components/fiserv/CredentialCard.tsx
import type React from 'react';
import { useState } from 'react';

/**
 * Painel de credenciais do gateway Fiserv.
 * 
 * SEGURANCA: Nenhuma chave secreta (HMAC, client_secret) deve transitar pelo bundle do navegador.
 * Este componente exibe apenas metadados (ultimos 4 caracteres, data de rotacao, ambiente).
 * Toda operacao de rotacao/criacao de chave sera uma chamada autenticada ao backend.
 */

interface CredentialMetadata {
  merchantId: string;
  clientIdSuffix: string;
  secretKeySuffix: string;
  lastRotatedAt: string;
  environment: 'SANDBOX' | 'PRODUCTION';
}

// Placeholder ate integracao com API real - exibe apenas sufixos seguros
const INITIAL_METADATA: CredentialMetadata = {
  merchantId: 'XYUZ_AGRO_BR_****',
  clientIdSuffix: '****9b3c',
  secretKeySuffix: '****i9j0',
  lastRotatedAt: '2026-08-15T14:32:00Z',
  environment: 'SANDBOX'
};

export const CredentialCard: React.FC = () => {
  const [metadata, setMetadata] = useState<CredentialMetadata>(INITIAL_METADATA);
  const [rotating, setRotating] = useState(false);

  const handleRotateKey = async () => {
    setRotating(true);
    // TODO: Substituir por chamada autenticada ao backend
    // POST /v1/credentials/rotate { environment: metadata.environment }
    // Backend rotaciona a chave no cofre de segredos e retorna apenas o sufixo novo
    setTimeout(() => {
      setMetadata(prev => ({
        ...prev,
        secretKeySuffix: '****' + Math.random().toString(36).substring(2, 6),
        lastRotatedAt: new Date().toISOString()
      }));
      setRotating(false);
    }, 1200);
  };

  const handleSwitchEnvironment = (env: 'SANDBOX' | 'PRODUCTION') => {
    // TODO: Buscar metadados do ambiente selecionado via API
    // GET /v1/credentials/metadata?environment={env}
    setMetadata(prev => ({ ...prev, environment: env }));
  };

  const formattedDate = new Date(metadata.lastRotatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-5 w-full text-white">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// CREDENCIAIS GATEWAY</h3>
        
        <div className="flex rounded-lg p-0.5 bg-[#0B0F17] border border-gray-800 text-[10px]">
          <button 
            onClick={() => handleSwitchEnvironment('SANDBOX')}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${metadata.environment === 'SANDBOX' ? 'bg-emerald-500 text-[#0B0F17]' : 'text-gray-400'}`}
          >
            SANDBOX
          </button>
          <button 
            onClick={() => handleSwitchEnvironment('PRODUCTION')}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${metadata.environment === 'PRODUCTION' ? 'bg-red-600 text-white' : 'text-gray-400'}`}
          >
            PRODUCAO
          </button>
        </div>
      </div>

      <div className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 block mb-1">Merchant ID:</span>
            <strong className="text-white font-sans">{metadata.merchantId}</strong>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">Client ID:</span>
            <strong className="text-white font-mono">{metadata.clientIdSuffix}</strong>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-400 uppercase font-sans">
            Webhook Secret (HMAC SHA-256) - Apenas sufixo visivel
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-emerald-400 flex items-center justify-between">
              <span className="tracking-widest">{'*'.repeat(32)}{metadata.secretKeySuffix}</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 font-sans">
            Ultima rotacao: {formattedDate} | Chave completa disponivel apenas no cofre de segredos do backend.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            onClick={handleRotateKey}
            disabled={rotating}
            className="flex-1 bg-[#0B0F17] border border-gray-800 hover:border-gray-700 text-white font-bold py-2.5 rounded-xl text-xs font-sans transition-colors cursor-pointer text-center disabled:opacity-50"
          >
            {rotating ? 'Rotacionando...' : 'ROTACIONAR CHAVE'}
          </button>
        </div>

        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mt-2">
          <p className="text-[10px] text-amber-400 font-sans leading-relaxed">
            Chaves HMAC nunca sao exibidas no navegador. A rotacao e feita server-side 
            e o novo segredo e propagado automaticamente para o webhook receiver.
          </p>
        </div>
      </div>
    </div>
  );
};
