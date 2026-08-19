// src/components/common/TabBarNavigation.tsx
import type React from 'react';

interface TabBarNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabBarNavigation: React.FC<TabBarNavigationProps> = ({ activeTab, setActiveTab }) => {
  const shortItems = [
    { id: 'dashboard', icon: '📈' },
    { id: 'trading', icon: '💼' },
    { id: 'feed', icon: '📑' },
    { id: 'deposit', icon: '💳' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-gray-800 px-6 py-2 flex justify-between items-center z-40 shadow-2xl">
      {shortItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-500/20 border border-emerald-500/30' : 'opacity-50'}`}
        >
          <span className="text-lg">{item.icon}</span>
        </button>
      ))}
    </div>
  );
};
