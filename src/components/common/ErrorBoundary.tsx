import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    // TODO: Enviar para servico de observabilidade (Sentry, DataDog, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Erro inesperado</h1>
            <p className="text-gray-400 text-sm">
              Ocorreu um problema na plataforma. Nossa equipe foi notificada.
            </p>
            <p className="text-xs text-gray-600 font-mono bg-gray-900 p-3 rounded-lg">
              {this.state.error?.message ?? 'Erro desconhecido'}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="bg-emerald-500 text-black font-bold px-6 py-2 rounded-lg text-sm"
            >
              Recarregar plataforma
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
