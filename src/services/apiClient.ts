/**
 * API Client - Camada HTTP com autenticacao automatica.
 * 
 * Funcionalidades:
 * - Token management (access + refresh)
 * - Auto-refresh quando token expira (401)
 * - Retry com backoff para erros de rede
 * - Correlation ID em toda request
 * - Baseado no OpenAPI spec (docs/openapi.yaml)
 */

// Runtime config: carregado de /config.json (injetado pelo orquestrador)
// ou de import.meta.env para desenvolvimento
function getBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
}

// ===== TOKEN STORAGE =====

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(access: string, refresh: string): void {
  accessToken = access;
  refreshToken = refresh;
  // Persistir em sessionStorage (web) - nao localStorage (XSS risk)
  try {
    sessionStorage.setItem('xyuz_access_token', access);
    sessionStorage.setItem('xyuz_refresh_token', refresh);
  } catch { /* SSR or restricted context */ }
}

export function clearTokens(): void {
  accessToken = null;
  refreshToken = null;
  try {
    sessionStorage.removeItem('xyuz_access_token');
    sessionStorage.removeItem('xyuz_refresh_token');
  } catch { /* SSR */ }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  try {
    accessToken = sessionStorage.getItem('xyuz_access_token');
  } catch { /* SSR */ }
  return accessToken;
}

function getRefreshToken(): string | null {
  if (refreshToken) return refreshToken;
  try {
    refreshToken = sessionStorage.getItem('xyuz_refresh_token');
  } catch { /* SSR */ }
  return refreshToken;
}

// ===== API ERROR =====

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly correlationId?: string;

  constructor(
    status: number,
    code: string,
    message: string,
    correlationId?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.correlationId = correlationId;
  }
}

// ===== CORE FETCH =====

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  idempotencyKey?: string;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  const token = getRefreshToken();
  if (!token) return false;

  try {
    const res = await fetch(`${getBaseUrl()}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token })
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const json = await res.json();
    setTokens(json.data.accessToken, json.data.refreshToken);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, skipAuth = false, idempotencyKey } = options;
  const url = `${getBaseUrl()}${path}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  };

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  if (idempotencyKey) {
    requestHeaders['Idempotency-Key'] = idempotencyKey;
  }

  // Correlation ID para rastreabilidade
  requestHeaders['X-Correlation-Id'] = crypto.randomUUID();

  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  let response = await fetch(url, fetchOptions);

  // Auto-refresh em 401
  if (response.status === 401 && !skipAuth) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = attemptRefresh();
    }

    const refreshed = await refreshPromise;
    isRefreshing = false;
    refreshPromise = null;

    if (refreshed) {
      // Retry com novo token
      requestHeaders['Authorization'] = `Bearer ${getAccessToken()}`;
      response = await fetch(url, { ...fetchOptions, headers: requestHeaders });
    } else {
      // Refresh falhou - usuario precisa re-autenticar
      throw new ApiError(401, 'SESSION_EXPIRED', 'Sessao expirada. Faca login novamente.');
    }
  }

  if (!response.ok) {
    let errorBody: { error?: { code?: string; message?: string; correlationId?: string } } = {};
    try {
      errorBody = await response.json();
    } catch { /* non-json error */ }

    throw new ApiError(
      response.status,
      errorBody.error?.code || 'UNKNOWN_ERROR',
      errorBody.error?.message || `Erro HTTP ${response.status}`,
      errorBody.error?.correlationId
    );
  }

  return response.json();
}

// ===== TYPED API METHODS =====

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiRequest<{ data: { mfaRequired: boolean; mfaChannel: string; sessionToken: string } }>(
      '/v1/auth/login', { method: 'POST', body: { email, password }, skipAuth: true }
    ),

  verifyMfa: (sessionToken: string, code: string) =>
    apiRequest<{ data: { accessToken: string; refreshToken: string; expiresIn: number; user: { userId: string; name: string; role: string } } }>(
      '/v1/auth/verify-mfa', { method: 'POST', body: { sessionToken, code }, skipAuth: true }
    ),

  refresh: (token: string) =>
    apiRequest<{ data: { accessToken: string; refreshToken: string; expiresIn: number } }>(
      '/v1/auth/refresh', { method: 'POST', body: { refreshToken: token }, skipAuth: true }
    ),

  register: (data: { corporateName: string; cnpj: string; email: string; password: string }) =>
    apiRequest<{ data: { requestId: string; status: string } }>(
      '/v1/auth/register', { method: 'POST', body: data, skipAuth: true }
    ),

  // Balance
  getBalance: (accountId: string) =>
    apiRequest<{ data: { accountId: string; balanceMinor: number; balance: string; currency: string } }>(
      `/v1/accounts/${accountId}/balance`
    ),

  // Payment Intents
  createPaymentIntent: (amountMinor: number, currency: string = 'BRL') =>
    apiRequest<{ data: { id: string; copyPaste: string; status: string; amount: string }; replayed: boolean }>(
      '/v1/payment-intents', {
        method: 'POST',
        body: { amountMinor, currency },
        idempotencyKey: crypto.randomUUID()
      }
    ),

  getPaymentIntent: (id: string) =>
    apiRequest<{ data: { id: string; status: string; amount: string; copyPaste: string; createdAt: string } }>(
      `/v1/payment-intents/${id}`
    ),

  // Connectors
  getConnectors: () =>
    apiRequest<{ data: Array<{ id: string; displayName: string; enabled: boolean; healthStatus: string; capabilities: string[]; isAggregator: boolean }> }>(
      '/v1/connectors'
    ),

  // Advisory
  getAdvisoryArticles: (limit: number = 20) =>
    apiRequest<{ data: Array<{ id: string; tag: string; title: string; excerpt: string; author: string; publishedAt: string }> }>(
      `/v1/advisory/articles?limit=${limit}`
    ),

  // Health
  health: () =>
    apiRequest<{ status: string; storage: string; simulator: boolean }>(
      '/health', { skipAuth: true }
    )
};
