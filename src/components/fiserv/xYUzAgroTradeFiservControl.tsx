// src/components/fiserv/xYUzAgroTradeFiservControl.tsx
import React, { useState } from 'react';
import { pspList as initialPsps } from '../../mocks/fiservHubMock';

export const xYUzAgroTradeFiservControl: React.FC = () => {
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
    <div className="w-full bg-[#1A365D]/5 p-4 rounded-xl border border-[#1A365D]/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-xyuz-navy tracking-wide uppercase">Orquestração Multi-PSP xYUz-AgroTrade</h3>
        <span className="text-xs bg-xyuz-blue text-white px-2 py-0.5 rounded-full font-mono">Fiserv HUB Cloud</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {psps.map(psp => (
          <div key={psp.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-xyuz-dark">{psp.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                psp.healthStatus === 'ONLINE' ? 'bg-green-100 text-green-800' :
                psp.healthStatus === 'LATENCY_HIGH' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {psp.healthStatus}
              </span>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-xyuz-slate">
              <span>Taxa MDR: {(psp.pixMdrTax * 100).toFixed(2)}%</span>
              <span className="text-gray-400 text-[10px]">{psp.type}</span>
            </div>

            <button 
              onClick={() => togglePspHealth(psp.id)}
              className="mt-3 text-left text-[11px] text-xyuz-blue hover:underline font-medium"
            >
              Simular Instabilidade (Failover)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
