// src/screens/ProfileScreen.tsx
import React from 'react';
import { CredentialCard } from '../components/fiserv/CredentialCard';
import { WhitelistIpManager } from '../components/fiserv/WhitelistIpManager';
import { securityExport } from '../services/SecurityExportService'; // Importação adicionada

export const ProfileScreen: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        <div className="flex-1 w-full space-y-6">
          <CredentialCard />
          
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-4">// GOVERNANÇA DE SEGURANÇA (MFA)</h3>
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex justify-between items-center">
              <div>
                <strong className="text-sm text-white block">Autenticação de Dois Fatores (MFA Token)</strong>
                <span className="text-xs text-gray-400">Proteção via token dinâmico ativa no dispositivo do operador.</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-black uppercase">ATIVADO</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <WhitelistIpManager />
        </div>
      </div>

      <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// SECURITY AUDIT TRAIL (TRILHA DE GOVERNANÇA COESI)</h3>
          <div className="text-[11px] font-mono text-gray-400 space-y-2 bg-[#0B0F17] p-4 rounded-xl border border-gray-800">
            <p><span className="text-emerald-400">[16:24]</span> Handshake TLS 1.3 estabelecido com sucesso com endpoint Fiserv HUB.</p>
            <p><span className="text-emerald-400">[15:10]</span> Assinatura de webhook validada via criptografia simétrica HMAC-SHA256.</p>
            <p><span className="text-yellow-400">[11:02]</span> Tentativa de requisição bloqueada: IP 192.168.4.12 não listado em Whitelist.</p>
          </div>
        </div>
        
        {/* Ação Real de Exportação de Planilha COESI vinculada */}
        <button 
          onClick={() => securityExport.exportSecurityLogCsv()}
          className="w-full sm:w-max bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors mt-4 cursor-pointer"
        >
          EXPORTAR LOG DE SEGURANÇA (CSV)
        </button>
      </div>
    </div>
  );
};
