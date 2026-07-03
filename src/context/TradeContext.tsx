// src/context/TradeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
}

interface TradeContextType {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  news: NewsArticle[];
  loadingNews: boolean;
  orders: any[];
  addOrder: (order: any) => void;
  lgpdAccepted: boolean;
  setLgpdAccepted: (val: boolean) => void;
  tutorialCompleted: boolean;
  setTutorialCompleted: (val: boolean) => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(500000.00);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [lgpdAccepted, setLgpdAccepted] = useState<boolean>(true); 
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(true);

  useEffect(() => {
    // PROTEÇÃO MESTRE: Dados mockados locais e estáticos para evitar requisições de rede e erros de CORS
    setNews([
      {
        id: 101,
        title: "Complexo Portuário de Santos registra alta no escoamento de grãos da safra corrente",
        summary: "Os terminais de granéis vegetais operam em capacidade otimizada, mudando as projeções dos prêmios FOB para contratos futuros de Soja.",
        url: "https://embrapa.br",
        publishedAt: new Date().toLocaleDateString('pt-BR')
      },
      {
        id: 102,
        title: "B3 registra ajuste técnico nas posições de Milho spot após pregão matutino",
        summary: "Fechamento de posições por grandes cooperativas agroindustriais provoca oscilação controlada nas cotações.",
        url: "https://ibge.gov.br",
        publishedAt: new Date().toLocaleDateString('pt-BR')
      }
    ]);
    setLoadingNews(false);
  }, []);

  const addOrder = (order: any) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <TradeContext.Provider value={{ 
      balance, setBalance, news, loadingNews, orders, addOrder,
      lgpdAccepted, setLgpdAccepted, tutorialCompleted, setTutorialCompleted 
    }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) throw new Error('useTrade deve ser utilizado com um TradeProvider');
  return context;
};
