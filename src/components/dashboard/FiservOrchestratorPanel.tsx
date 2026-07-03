// src/components/dashboard/FiservOrchestratorPanel.tsx
import React, { useState } from 'react';
import { pspList as initialPsps } from '../../mocks/fiservHubMock';

export const FiservOrchestratorPanel: React.FC = () => {
  const [psps, setPsps] = useState(initialPsps);

  const togglePspHealth = (id: string) => {
    setPsps(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus: typeof p.healthStatus = p.healthStatus === 'ONLINE' ? 'OFFLINE' : p.healthStatus === 'OFFLINE' ? 'LATENCY_HIGH' : 'ONLINE';
        return { ...p, healthStatus: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="w-full bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-2xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 w-full">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// ORQUESTRAÇÃO MULTI-PSP xYUz-AGROTRADE</h3>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">Fiserv HUB</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {psps.map(psp => (
          <div key={psp.id} className="bg-[#0B0F17] border border-gray-800 p-4 rounded-xl flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs text-white">{psp.name}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                psp.healthStatus === 'ONLINE' ? 'bg-green-500/10 text-green-400' :
                psp.healthStatus === 'LATENCY_HIGH' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {psp.healthStatus}
              </span>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>MDR: {(psp.pixMdrTax * 100).toFixed(2)}%</span>
              <span className="uppercase text-[9px] font-bold text-gray-600">{psp.type}</span>
            </div>

            <button 
              onClick={() => togglePspHealth(psp.id)}
              className="mt-3 text-left text-[10px] text-emerald-400 hover:text-emerald-300 font-bold font-mono transition-colors cursor-pointer"
            >
              Simular Contingência
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
