// src/mocks/fiservHubMock.ts

export interface PspPartner {
  id: string;
  name: string;
  type: 'PRIMARY' | 'ALT_1' | 'ALT_2';
  healthStatus: 'ONLINE' | 'LATENCY_HIGH' | 'OFFLINE';
  pixMdrTax: number;
}

export const pspList: PspPartner[] = [
  { id: 'bmg', name: 'Banco BMG', type: 'PRIMARY', healthStatus: 'ONLINE', pixMdrTax: 0.005 },
  { id: 'itau', name: 'Itaú Unibanco', type: 'ALT_1', healthStatus: 'ONLINE', pixMdrTax: 0.007 },
  { id: 'btg', name: 'BTG Pactual', type: 'ALT_2', healthStatus: 'LATENCY_HIGH', pixMdrTax: 0.006 }
];

export interface FiservOrchestrationRequest {
  commodityId: string;
  amount: number;
  totalPrice: number;
  userPreferredPsp?: string;
}

export interface FiservStandardizedWebhook {
  transaction: {
    fiserv_id: string;
    psp_provider: string;
    internal_order_id: string;
    amount: string;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    security: {
      signature_hmac_sha256: string;
    };
  };
}

class xYUzAgroTradeFiservEngine {
  public determineBestPsp(request: FiservOrchestrationRequest): PspPartner {
    if (request.userPreferredPsp) {
      const preferred = pspList.find(p => p.id === request.userPreferredPsp && p.healthStatus === 'ONLINE');
      if (preferred) return preferred;
    }

    const healthyPsps = pspList.filter(p => p.healthStatus === 'ONLINE');
    if (healthyPsps.length === 0) {
      return pspList.find(p => p.healthStatus !== 'OFFLINE') || pspList[0];
    }

    return healthyPsps.reduce((prev, curr) => (prev.pixMdrTax < curr.pixMdrTax ? prev : curr));
  }

  public async createPixTransaction(request: FiservOrchestrationRequest): Promise<FiservStandardizedWebhook> {
    const targetPsp = this.determineBestPsp(request);
    const mockInternalOrderId = `XYUZ-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const mockFiservId = `FISERV-TX-${Math.random().toString(36).substring(7).toUpperCase()}`;

    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      transaction: {
        fiserv_id: mockFiservId,
        psp_provider: targetPsp.name.toUpperCase(),
        internal_order_id: mockInternalOrderId,
        amount: request.totalPrice.toFixed(2),
        status: 'SUCCESS',
        security: {
          signature_hmac_sha256: "hmac_valid_xyuz_agrotrade_sig_7f8a9b3c4d..."
        }
      }
    };
  }
}

export const xYUzAgroTradeFiservHub = new xYUzAgroTradeFiservEngine();
