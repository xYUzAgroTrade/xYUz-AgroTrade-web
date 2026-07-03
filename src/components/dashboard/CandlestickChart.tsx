// src/components/dashboard/CandlestickChart.tsx
import React from 'react';

export const CandlestickChart: React.FC = () => {
  const data = [
    { x: 20,  open: 164.10, close: 164.50, high: 164.80, low: 163.90 },
    { x: 60,  open: 164.50, close: 163.90, high: 164.60, low: 163.70 },
    { x: 100, open: 163.90, close: 164.20, high: 164.40, low: 163.50 },
    { x: 140, open: 164.20, close: 164.80, high: 165.10, low: 164.00 },
    { x: 180, open: 164.80, close: 164.50, high: 165.00, low: 164.30 },
  ];

  const scaleY = (val: number) => 180 - (val - 163) * 60;

  return (
    <div className="space-y-4 w-full bg-xyuz-card border border-gray-800 p-6 rounded-2xl shadow-xl text-white">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">// GRÁFICO TÉCNICO (VETORIAL NATIVO)</h3>
      <div className="w-full bg-xyuz-bg rounded-xl p-4 border border-gray-800 flex justify-center">
        <svg viewBox="0 0 200 200" className="w-full max-h-48 overflow-visible">
          <line x1="0" y1="40" x2="200" y2="40" stroke="#374151" strokeWidth="0.75" strokeDasharray="3" />
          <line x1="0" y1="120" x2="200" y2="120" stroke="#374151" strokeWidth="0.75" strokeDasharray="3" />
          
          {data.map((candle, idx) => {
            const isGreen = candle.close >= candle.open;
            const bodyTop = scaleY(Math.max(candle.open, candle.close));
            const bodyBottom = scaleY(Math.min(candle.open, candle.close));
            const bodyHeight = Math.max(bodyBottom - bodyTop, 3);
            const color = isGreen ? '#10B981' : '#EF4444';

            return (
              <g key={idx}>
                <line x1={candle.x} y1={scaleY(candle.high)} x2={candle.x} y2={scaleY(candle.low)} stroke={color} strokeWidth="1.5" />
                <rect x={candle.x - 6} y={bodyTop} width="12" height={bodyHeight} fill={color} rx="1" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
