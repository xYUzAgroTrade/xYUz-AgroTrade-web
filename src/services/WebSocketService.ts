// src/services/WebSocketService.ts

export interface MarketTick {
  code: string;
  price: number;
  change: string;
  up: boolean;
}

type OnTickCallback = (tick: MarketTick) => void;

class WebSocketServiceMock {
  private listeners: OnTickCallback[] = [];
  private intervalId: any = null;

  public connect(onTick: OnTickCallback) {
    // Evita registrar o mesmo escutador se ele já estiver na lista
    if (!this.listeners.includes(onTick)) {
      this.listeners.push(onTick);
    }
    
    // Se o intervalo já estiver rodando, não cria outro duplicado
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      const codes = ['SOJA-FOB', 'MILHO-PR', 'CAFE-AR'];
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      
      const basePrices: Record<string, number> = { 'SOJA-FOB': 164.50, 'MILHO-PR': 62.10, 'CAFE-AR': 1120.00 };
      const fluctuation = (Math.random() - 0.48) * (randomCode === 'CAFE-AR' ? 5 : 0.8);
      const newPrice = basePrices[randomCode] + fluctuation;
      const isUp = fluctuation > 0;

      const tick: MarketTick = {
        code: randomCode,
        price: newPrice,
        change: `${isUp ? '+' : ''}${(fluctuation * 100 / basePrices[randomCode]).toFixed(2)}%`,
        up: isUp
      };

      // Dispara o evento apenas se houver escutadores ativos
      if (this.listeners.length > 0) {
        this.listeners.forEach(callback => {
          try {
            callback(tick);
          } catch (e) {
            // Silencia falhas se o componente já tiver sido desmontado
          }
        });
      }
    }, 1500);
  }

  // Remove um escutador específico de forma segura quando a tela fecha
  public disconnect(onTick: OnTickCallback) {
    this.listeners = this.listeners.filter(callback => callback !== onTick);
    
    if (this.listeners.length === 0 && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const wsService = new WebSocketServiceMock();
