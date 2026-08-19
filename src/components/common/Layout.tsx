// src/components/common/Layout.tsx
import type React from 'react';
import { useTrade } from '../../context/TradeContext';
import { AnimatedBrandLogo } from '../dashboard/AnimatedBrandLogo';
import { TabBarNavigation } from './TabBarNavigation';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const { balance } = useTrade();
  
  const menuItems = [
    { id: 'dashboard', label: '📈 Mercado Global' },
    { id: 'trading', label: '💼 Mesa Avançada' },
    { id: 'feed', label: '📑 Advisory & Notícias' },
    { id: 'reports', label: '📊 Relatórios de Safra' },
    { id: 'analysis', label: '🔬 Análise Fundamental' },
    { id: 'profile', label: '👤 Perfil & KYC' },
    { id: 'deposit', label: '💳 Aporte de Margem' },
    { id: 'settings', label: '⚙️ Chaves Operacionais' },
  ];

  return (
    <div className="min-h-screen bg-xyuz-bg text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar - Menu Lateral para Desktop */}
      <aside className="w-64 bg-xyuz-card border-r border-gray-800 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          <AnimatedBrandLogo />
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-emerald-500 text-xyuz-bg shadow-lg' 
                    : 'text-gray-400 hover:bg-xyuz-card-light hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800 space-y-3">
          <div className="space-y-0.5 text-xs text-gray-500">
            <p className="text-gray-400">Margem Disponível:</p>
            <p className="text-md font-bold text-white font-mono">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onLogout(); }}
            className="w-full bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer text-center"
          >
            🚪 SAIR DA MESA
          </button>
        </div>
      </aside>

      {/* Cabeçalho Mobile */}
      <header className="md:hidden bg-xyuz-card px-6 py-4 border-b border-gray-800 flex justify-between items-center shrink-0 w-full">
        <AnimatedBrandLogo />
        <button 
          type="button" 
          onClick={(e) => { e.stopPropagation(); onLogout(); }} 
          className="text-xs bg-red-900/20 border border-red-900/30 text-red-400 px-2.5 py-1 rounded-lg font-bold cursor-pointer"
        >
          Sair
        </button>
      </header>

      {/* Área de Visualização Dinâmica */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-xyuz-card/50 backdrop-blur-md px-8 py-4 border-b border-gray-800 hidden md:flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">// {activeTab} Desk</h2>
          <div className="text-xs bg-xyuz-card-light px-3 py-1.5 rounded-lg border border-gray-700 font-mono">
            Fiserv HUB: <span className="text-emerald-400">CONNECTED</span>
          </div>
        </header>
        
        {/* Conteúdo responsivo livre de larguras rígidas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <TabBarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
