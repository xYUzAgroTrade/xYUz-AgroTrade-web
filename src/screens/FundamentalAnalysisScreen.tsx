// src/screens/FundamentalAnalysisScreen.tsx
import React from 'react';
import { BalanceDemandCard } from '../components/dashboard/BalanceDemandCard';
import { LogisticRiskCard } from '../components/dashboard/LogisticRiskCard';
import { ParityCalculator } from '../components/dashboard/ParityCalculator'; // Calculadora CBOT integrada

export const FundamentalAnalysisScreen: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-white">Análise Fundamentalista Avançada</h2>
        <p className="text-xs text-gray-400 mt-1">Indicadores de oferta, demanda portuária e precificação de paridades internacionais.</p>
      </div>

      {/* Grid Superior: Balanço Mundial e Risco de Embarque */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
        <div className="lg:col-span-2 w-full">
          <BalanceDemandCard />
        </div>
        <div className="w-full">
          <LogisticRiskCard />
        </div>
      </div>

      {/* Bloco de Base: Calculadora FAS de Paridade de Chicago */}
      <div className="w-full">
        <ParityCalculator />
      </div>
    </div>
  );
};
