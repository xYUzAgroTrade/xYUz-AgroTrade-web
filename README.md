# xYUz AgroTrade Web

Plataforma web de trading de commodities agricolas. React 19 + Vite + Tailwind CSS.

## Acesso de Teste

```
Email: dev@xyuz.com.br
Senha: xyuz2026!
MFA:   qualquer codigo de 6 digitos (ex: 123456)
```

## Rodar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

Requer API rodando em `http://localhost:3000` (xYUz-AgroTrade-api).

> **Pagamentos:** o front fala **sempre com o xYUz-AgroTrade-api**, nunca direto com a
> Yupay. Quem decide usar a orquestracao Yupay ou o simulador e o `-api` (via
> `YUPAY_ENABLED`). Assim o front fica desacoplado da camada de pagamento.

## Build de Producao

```bash
npm run build     # Gera dist/
npm run preview   # Preview local do build
```

## Docker

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.xyuz-agrotrade.com \
  --build-arg VITE_WS_BASE_URL=wss://ws.xyuz-agrotrade.com \
  -t xyuz-web .

docker run -p 8080:8080 xyuz-web
```

Container roda nginx como usuario nao-root na porta 8080 com:
- Headers de seguranca (CSP, HSTS, X-Frame-Options)
- Healthcheck em /health
- Config runtime via /config.json (injetado pelo orquestrador)

## Telas

| Tela | Funcao |
|------|--------|
| Dashboard | Precos real-time, grafico candlestick, market cards |
| Trading | Boleta de ordens (BUY/SELL), order book, historico |
| Advisory Feed | Artigos de inteligencia de mercado (API: `/v1/advisory/articles`) |
| Reports | Relatorios para download (API: `/v1/advisory/reports`) |
| Fundamental | Calculadora de paridade FOB/CBOT, oferta e demanda |
| Deposit | Gerar PIX para deposito de margem |
| Investor Profile | Suitability, limites operacionais |
| Settings | Configuracoes, credenciais (metadados), logout |

## Checklist para Producao

- [x] Build passa (0 erros TS; lint com 2 warnings cosmeticos de fast-refresh)
- [ ] npm audit sem vulnerabilidades (ha alertas em deps transitivas — revisar antes do go-live)
- [x] Segredos removidos do bundle
- [x] Dockerfile seguro (nao-root, headers, healthcheck)
- [x] strict: true no tsconfig
- [x] API client com auto-refresh de token
- [x] WebSocket com reconexao + fallback
- [x] Error boundary global
- [x] React Router com rotas protegidas
- [x] CI/CD GitHub Actions
- [ ] Testes unitarios (prioridade: ledger, auth, orders)
- [ ] Testes e2e (caminho critico: login → deposito → trade)
- [ ] Acessibilidade (contraste WCAG AA, roles semanticos)

## Stack

- React 19 + TypeScript 6
- Vite 8 (bundler: Rolldown)
- Tailwind CSS 4
- React Router 7
- OxLint
