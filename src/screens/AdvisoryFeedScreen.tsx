// src/screens/AdvisoryFeedScreen.tsx
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTrade } from '../context/TradeContext';
import { GlassCard } from '../components/common/GlassCard';
import { api } from '../services/apiClient';

interface FeedArticle {
  id: string | number;
  tag?: string;
  title: string;
  summary: string;
  author?: string;
  url: string;
  publishedAt: string;
}

export const AdvisoryFeedScreen: React.FC = () => {
  // Fallback: notícias locais do contexto (robustez se a API falhar).
  const { news, loadingNews } = useTrade();

  const [articles, setArticles] = useState<FeedArticle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.getAdvisoryArticles(20);
        if (!alive) return;
        setArticles(res.data.map((a) => ({
          id: a.id,
          tag: a.tag,
          title: a.title,
          summary: a.summary ?? a.excerpt,
          author: a.author,
          url: a.url ?? '#',
          publishedAt: a.publishedAt
        })));
      } catch {
        // API indisponível: cai no conteúdo local do contexto.
        if (alive) setUsingFallback(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const items: FeedArticle[] = articles ?? news.map((n) => ({
    id: n.id, title: n.title, summary: n.summary, url: n.url, publishedAt: n.publishedAt
  }));
  const isLoading = loading && loadingNews && !articles;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-white">Advisory &amp; Intelligence Feed</h2>
        <p className="text-xs text-gray-400 mt-1">
          {usingFallback
            ? 'Exibindo dados locais de contingência (feed offline).'
            : 'Research de mercado servido pela API xYUz-AgroTrade (/v1/advisory).'}
        </p>
      </div>

      {isLoading ? (
        <div className="text-xs text-emerald-400 animate-pulse font-mono">[LOG] Sincronizando canais...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <GlassCard key={item.id} className="p-0 overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
                  <span>FONTE: {item.tag ? item.tag : 'INTERNAL_DESK'}</span>
                  <span>{item.publishedAt}</span>
                </div>

                <h3 className="text-base font-bold text-white hover:text-emerald-300 transition-colors leading-snug">
                  <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-normal">{item.summary}</p>
              </div>

              <div className="px-6 py-3 bg-[#0B0F17] border-t border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-mono font-bold">
                  {item.author ? item.author.toUpperCase() : 'RELEVÂNCIA: CRÍTICA'}
                </span>
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
