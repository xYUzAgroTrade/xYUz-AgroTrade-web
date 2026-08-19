/**
 * React Router - Rotas protegidas com auth guard.
 * 
 * Estrutura:
 * /login     - tela de login (publica)
 * /register  - cadastro (publica)
 * /app/*     - plataforma (protegida por ProtectedRoute)
 * 
 * Deep linking e historico de browser funcionam.
 * Code splitting via lazy() quando necessario.
 */
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from './services/apiClient';
import App from './App';

// Guard de rota autenticada
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getAccessToken();
  const location = useLocation();

  if (!token) {
    // Redireciona para login preservando a rota desejada
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Router principal (usado no main.tsx)
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas publicas */}
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/register" element={<RegisterRedirect />} />

        {/* Rota protegida: plataforma completa */}
        <Route path="/*" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

// Componentes de redirect (se ja autenticado, vai para app)
function LoginRedirect() {
  const token = getAccessToken();
  if (token) return <Navigate to="/" replace />;
  // Renderiza o App que ja tem a logica de login integrada
  return <App />;
}

function RegisterRedirect() {
  const token = getAccessToken();
  if (token) return <Navigate to="/" replace />;
  return <App />;
}
