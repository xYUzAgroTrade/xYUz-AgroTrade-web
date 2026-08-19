// src/App.tsx
import { useState, useEffect } from 'react';
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
import { getAccessToken, clearTokens } from './services/apiClient';

function AppContent() {
  // Autenticacao real: verifica se ha token valido na sessao
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getAccessToken();
  });
  const [currentRoute, setCurrentRoute] = useState<string>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Verificar token ao montar (restaurar sessao)
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setCurrentRoute('login');
    setActiveTab('dashboard');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentRoute('app');
  };

  if (!isAuthenticated) {
    if (currentRoute === 'register') {
      return <RegisterScreen onNavigateToLogin={() => setCurrentRoute('login')} />;
    }
    return (
      <LoginScreen 
        onLoginSuccess={handleLoginSuccess} 
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
