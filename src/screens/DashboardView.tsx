// src/screens/DashboardView.tsx
import React, { useState, useEffect } from 'react';

export const DashboardView: React.FC = () => {
  const [prices, setPrices] = useState({
    soja: 164.50,
    milho: 62.10,
    cafe: 1120.00
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        soja: prev.soja + (Math.random() - 0.49) * 0.4,
        milho: prev.milho + (Math.random() - 0.49) * 0.2,
        cafe: prev.cafe + (Math.random() - 0.49) * 2
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const candleData = [
    { x: 25,  open: 164.10, close: 164.50, high: 164.80, low: 163.90 },
    { x: 65,  open: 164.50, close: 163.90, high: 164.60, low: 163.70 },
    { x: 105, open: 163.90, close: 164.20, high: 164.40, low: 163.50 },
    { x: 145, open: 164.20, close: 164.80, high: 165.10, low: 164.00 },
    { x: 185, open: 164.80, close: 164.50, high: 165.00, low: 164.30 },
  ];

  return (
    <div className="w-full text-white space-y-6">
      
      {/* Grid de Cartões de Commodities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Card Soja */}
        <div className="bg-xyuz-card-light border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block mb-1">SOJA-FOB</span>
              <h4 className="text-sm font-bold text-white font-sans">Soja FOB Santos</h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400">+1.50%</span>
          </div>
          <div className="mt-4">
            <span className="text-xl font-mono font-black text-white">BRL {prices.soja.toFixed(2)}</span>
          </div>
        </div>

        {/* Card Milho */}
        <div className="bg-xyuz-card-light border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block mb-1">MILHO-PR</span>
              <h4 className="text-sm font-bold text-white font-sans">Milho Paranaguá</h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400">-0.80%</span>
          </div>
          <div className="mt-4">
            <span className="text-xl font-mono font-black text-white">BRL {prices.milho.toFixed(2)}</span>
          </div>
        </div>

        {/* Card Café */}
        <div className="bg-xyuz-card-light border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-2xl min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider block mb-1">CAFE-AR</span>
              <h4 className="text-sm font-bold text-white font-sans">Café Arábica Tipo 6</h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400">+2.10%</span>
          </div>
          <div className="mt-4">
            <span className="text-xl font-mono font-black text-white">BRL {prices.cafe.toFixed(2)}</span>
          </div>
        </div>

      </div>

      {/* Gráfico Vetorial SVG */}
      <div className="bg-xyuz-card border border-gray-800 p-6 rounded-2xl shadow-xl w-full">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono mb-4">// GRÁFICO TÉCNICO (VETORIAL NATIVO)</h3>
        <div className="w-full bg-xyuz-bg rounded-xl p-4 border border-gray-800 flex justify-center">
          <svg viewBox="0 0 210 200" className="w-full max-h-48 overflow-visible">
            <line x1="0" y1="40" x2="210" y2="40" stroke="#374151" strokeWidth="0.75" strokeDasharray="3" />
            <line x1="0" y1="120" x2="210" y2="120" stroke="#374151" strokeWidth="0.75" strokeDasharray="3" />
            {candleData.map((candle, idx) => {
              const isGreen = candle.close >= candle.open;
              const bodyTop = 170 - (Math.max(candle.open, candle.close) - 163) * 50;
              const bodyBottom = 170 - (Math.min(candle.open, candle.close) - 163) * 50;
              const color = isGreen ? '#10B981' : '#EF4444';
              return (
                <g key={idx}>
                  <line x1={candle.x} y1={170 - (candle.high - 163) * 50} x2={candle.x} y2={170 - (candle.low - 163) * 50} stroke={color} strokeWidth="1.5" />
                  <rect x={candle.x - 6} y={bodyTop} width="12" height={Math.max(bodyBottom - bodyTop, 4)} fill={color} rx="1" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

    </div>
  );
};
