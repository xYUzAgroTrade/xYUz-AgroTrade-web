// src/App.tsx
import React, { useState } from 'react';
import { Layout } from './components/common/Layout';
import { DashboardView } from './screens/DashboardView';
import { AdvisoryFeedScreen } from './screens/AdvisoryFeedScreen';
import { AdvisoryReportsScreen } from './screens/AdvisoryReportsScreen';
import { FundamentalAnalysisScreen } from './screens/FundamentalAnalysisScreen';
import { InvestorProfileScreen } from './screens/InvestorProfileScreen';
import { DepositScreen } from './screens/DepositScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { XYUzBoletaTrading } from './components/dashboard/XYUzBoletaTrading';
import { TradeProvider } from './context/TradeContext';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Bypass ativo para visualização direta
  const [currentRoute, setCurrentRoute] = useState<string>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRoute('login');
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    if (currentRoute === 'register') {
      return <RegisterScreen onNavigateToLogin={() => setCurrentRoute('login')} />;
    }
    return (
      <LoginScreen 
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setCurrentRoute('app');
        }} 
        onNavigateToRegister={() => setCurrentRoute('register')}
      />
    );
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'trading' && <XYUzBoletaTrading />}
      {activeTab === 'feed' && <AdvisoryFeedScreen />}
      {activeTab === 'reports' && <AdvisoryReportsScreen />}
      {activeTab === 'analysis' && <FundamentalAnalysisScreen />}
      {activeTab === 'profile' && <InvestorProfileScreen />}
      {activeTab === 'deposit' && <DepositScreen />}
      {activeTab === 'settings' && <ProfileScreen />}
    </Layout>
  );
}

export default function App() {
  return (
    <TradeProvider>
      <AppContent />
    </TradeProvider>
  );
}
