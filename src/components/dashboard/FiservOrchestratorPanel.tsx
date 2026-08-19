// src/components/dashboard/FiservOrchestratorPanel.tsx
import type React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../services/apiClient';

interface ConnectorStatus {
  id: string;
  displayName: string;
  enabled: boolean;
  healthStatus: string;
  capabilities: string[];
  isAggregator: boolean;
}

export const FiservOrchestratorPanel: React.FC = () => {
  const [connectors, setConnectors] = useState<ConnectorStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnectors();
    // Refresh a cada 30s
    const interval = setInterval(loadConnectors, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadConnectors = async () => {
    try {
      const response = await api.getConnectors();
      setConnectors(response.data);
    } catch {
      // Fallback se API indisponivel
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-2xl animate-pulse">
        <div className="h-4 bg-gray-800 rounded w-48 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-gray-800 rounded-xl" />
          <div className="h-24 bg-gray-800 rounded-xl" />
          <div className="h-24 bg-gray-800 rounded-xl" />
        </div>
      </div>
    );
  }

  const enabledConnectors = connectors.filter(c => c.enabled);

  return (
    <div className="w-full bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-2xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 w-full">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// CONECTORES PSP ATIVOS</h3>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
          {enabledConnectors.length} ativo(s)
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {enabledConnectors.map(connector => (
          <div key={connector.id} className="bg-[#0B0F17] border border-gray-800 p-4 rounded-xl flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs text-white">{connector.displayName}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                connector.healthStatus === 'ONLINE' ? 'bg-green-500/10 text-green-400' :
                connector.healthStatus === 'DEGRADED' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {connector.healthStatus}
              </span>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {connector.capabilities.slice(0, 3).map(cap => (
                <span key={cap} className="text-[8px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded font-mono">
                  {cap}
                </span>
              ))}
            </div>

            {connector.isAggregator && (
              <span className="mt-2 text-[9px] text-emerald-400 font-mono font-bold">HUB MULTI-PSP</span>
            )}
          </div>
        ))}

        {enabledConnectors.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500 text-xs">
            Nenhum conector ativo. Configure via ENV vars.
          </div>
        )}
      </div>
    </div>
  );
};
