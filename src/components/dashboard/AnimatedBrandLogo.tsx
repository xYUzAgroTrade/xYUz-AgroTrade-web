// src/components/dashboard/AnimatedBrandLogo.tsx
import React from 'react';

export const AnimatedBrandLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 select-none">
      <div className="relative flex h-3 w-3">
        {/* Efeito de pulsação verde indicando WebSocket Vivo */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-black tracking-wider text-white">xYUz</span>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold tracking-widest">AGROTRADE</span>
      </div>
    </div>
  );
};
