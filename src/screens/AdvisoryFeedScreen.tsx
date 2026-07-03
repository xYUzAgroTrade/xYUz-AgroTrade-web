// src/screens/AdvisoryFeedScreen.tsx
import React from 'react';
import { useTrade } from '../context/TradeContext';
import { GlassCard } from '../components/common/GlassCard';

export const AdvisoryFeedScreen: React.FC = () => {
  const { news, loadingNews } = useTrade();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-white">Advisory & Intelligence Feed</h2>
        <p className="text-xs text-gray-400 mt-1">Dados estáveis via contingência de dados locais da plataforma xYUz-AgroTrade.</p>
      </div>

      {loadingNews ? (
        <div className="text-xs text-emerald-400 animate-pulse font-mono">[LOG] Sincronizando canais...</div >
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <GlassCard key={item.id} className="p-0 overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
                  <span>FONTE: INTERNAL_DESK</span>
                  <span>{item.publishedAt}</span>
                </div>
                
                {/* Título em Branco Puro */}
                <h3 className="text-base font-bold text-white hover:text-emerald-300 transition-colors leading-snug">
                  <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                </h3>
                
                {/* Descrição em Cinza Claro Legível */}
                <p className="text-xs text-gray-300 leading-relaxed font-normal">{item.summary}</p>
              </div>
              
              <div className="px-6 py-3 bg-[#0B0F17] border-t border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-mono font-bold">RELEVÂNCIA: CRÍTICA</span>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline font-bold transition-colors">
                  Ler Análise Completa →
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
