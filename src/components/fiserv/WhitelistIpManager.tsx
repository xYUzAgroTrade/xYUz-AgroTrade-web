// src/components/fiserv/WhitelistIpManager.tsx
import React, { useState } from 'react';

export const WhitelistIpManager: React.FC = () => {
  const [ips, setIps] = useState<string[]>(['186.234.12.98', '201.45.198.34']);
  const [newIp, setNewIp] = useState('');

  const handleAddIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;
    
    // Validação estrita por Regex de endereço IP v4
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(newIp)) {
      alert("Formato de endereço IPv4 inválido.");
      return;
    }

    setIps(prev => [...prev, newIp]);
    setNewIp('');
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4 w-full text-white">
      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// CONTROL WHITELIST: PROV_IPS AUTHORIZED</h3>
      
      <form onSubmit={handleAddIp} className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Adicionar novo IP (Ex: 192.168.1.1)"
          value={newIp}
          onChange={(e) => setNewIp(e.target.value)}
          className="flex-1 bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
        />
        <button 
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-[#0B0F17] font-black px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          ADICIONAR IP
        </button>
      </form>

      <div className="space-y-2 pt-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase font-mono block">Endereços Habilitados na Nuvem (Firewall):</span>
        <div className="flex flex-wrap gap-2">
          {ips.map((ip, idx) => (
            <span key={idx} className="bg-[#0B0F17] border border-gray-800 text-gray-300 font-mono text-[11px] px-3 py-1 rounded-xl flex items-center space-x-2">
              <span>{ip}</span>
              <button 
                type="button"
                onClick={() => setIps(prev => prev.filter(item => item !== ip))}
                className="text-red-400 hover:text-red-500 font-bold ml-1 text-[10px] cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
