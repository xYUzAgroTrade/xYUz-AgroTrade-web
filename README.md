# xYUz-AgroTrade Desk 📈🌾

> **Plataforma Web Institucional e Mesa de Operações Avançada para Orquestração, Fixação e Liquidação de Ativos Físicos de Commodities Agrícolas.**

O **xYUz-AgroTrade Desk** é uma solução corporativa de alta fidelidade desenvolvida em React, TypeScript e Tailwind CSS v4. O sistema foi projetado especificamente para atuar como uma mesa operacional unificada (Trading Desk) para cooperativas agroindustriais, tradings e corretores de commodities, integrando em um único ecossistema inteligência de mercado, gestão de riscos operacionais e liquidação financeira instantânea.

---

## 🚀 Para que Serve o Sistema?

A plataforma resolve o gargalo de fragmentação na comercialização de grãos e derivativos no agronegócio brasileiro, servindo para:

1. **Orquestração Multi-PSP (Fiserv HUB):** Centraliza e gerencia em tempo real múltiplos provedores de serviços de pagamento (Bancos e Adquirentes parceiros), roteando faturamentos via PIX pelo menor custo MDR interbancário e aplicando inteligência de *failover* (contingência automatizada) caso algum banco parceiro fique offline.
2. **Fixação e Travas de Preços:** Permite a originação e fechamento de contratos físicos de commodities (Soja FOB Santos, Milho Paranaguá, Café Arábica Tipo 6) diretamente por boletas de alocação de margem de garantia (10%).
3. **Cálculo de Paridade de Exportação (FAS/FOB):** Incorpora ferramentas matemáticas para converter cotações internacionais da Bolsa de Chicago (CBOT - US\$ por Bushel) para moeda e pesos locais (BRL por saca de 60kg), descontando prêmios de embarque, fretes internos e custos de elevação portuária.
4. **Governança e Trilha de Auditoria (COESI):** Mantém conformidade estrita com as regulamentações do Banco Central do Brasil e LGPD, registrando de forma imutável logs de segurança, acessos de IPs por Whitelist, tokens simétricos HMAC e chaves criptográficas mTLS.

---

## 📦 Arquitetura Estrutural do Projeto

O ecossistema foi arquitetado mantendo simetria absoluta com as jornadas de negócios e componentes mapeados no aplicativo móvel:

```text
xYUz-AgroTrade-web/
├── .env                  # Variáveis de ambiente locais (CORS, IPs e chaves)
├── .env.example          # Template global para distribuição de credenciais
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Layout.tsx             # Grid mestre com Sidebar responsiva
│   │   │   └── TabBarNavigation.tsx   # Menu de atalhos flutuantes para Mobile
│   │   └── dashboard/
│   │       ├── AnimatedBrandLogo.tsx  # Indicador de pulsação e conexão ativa
│   │       ├── CandlestickChart.tsx   # Gráfico OHLC vetorial nativo em SVG
│   │       ├── CoffeeOrderBook.tsx    # Spreads monoespaçados de alta latência
│   │       ├── FobParitySimulator.tsx # Calculadora portuária de exportação
│   │       ├── MarketCard.tsx         # Ticker compactado de ativos em tempo real
│   │       ├── OrderBook.tsx          # Profundidade de mercado estilo Bloomberg
│   │       └── OrderHistory.tsx       # Tabela de Ledger de ordens executadas
│   ├── fiserv/                        # Módulos de Adquirencia e Segurança HUB
│   │   ├── BrokerageNotePrint.tsx     # Certidão física otimizada para impressão PDF
│   │   ├── CredentialCard.tsx         # Alternador de Sandbox/Produção e chaves HMAC
│   │   ├── InvoiceHistoryTable.tsx    # Histórico de Aportes Pix gerados
│   │   ├── KycProfileData.tsx         # Central de conformidade cadastral (KYB)
│   │   ├── LimitsCard.tsx             # Monitor de saldos livres e margens retidas
│   │   ├── WhitelistIpManager.tsx     # Controle de subredes autorizadas no firewall
│   │   └── xYUzAgroTradeFiservControl.tsx # Dashboard de monitoramento mTLS multi-bancos
│   ├── context/
│   │   └── TradeContext.tsx           # Context API global (Estado, LGPD e Notícias)
│   ├── mocks/
│   │   └── fiservHubMock.ts           # Simulador assíncrono de Webhooks da Fiserv
│   ├── screens/                       # Telas que compõem os fluxos do app
│   │   ├── AdvisoryFeedScreen.tsx     # Feed integrado com APIs de notícias reais do IBGE
│   │   ├── AdvisoryReportsScreen.tsx  # Módulo de download de XMLs de NF-e e PDFs
│   │   ├── DashboardView.tsx          # Painel central de trading ao vivo
│   │   ├── DepositScreen.tsx          # Tela de emissão de BRCode Pix e Custódia
│   │   ├── FundamentalAnalysisScreen.tsx # Indicadores macroeconômicos globais
│   │   ├── InvestorProfileScreen.tsx  # Questionário KYC e emissão de notas fiscais
│   │   ├── LoginScreen.tsx            # Gateway de acesso com termos legais e tutorial
│   │   ├── OnboardingScreen.tsx       # Barreira de aceites regulatórios e onboarding
│   │   └── ProfileScreen.tsx          # Central de chaves criptográficas mTLS e logs
│   ├── services/
│   │   ├── SecurityExportService.ts   # Motor gerador de Certificados SSL e planilhas CSV
│   │   └── WebSocketService.ts        # Simulador de streams e ticks de mercado futuros
│   ├── index.css                      # Estilos globais e variáveis de temas do Tailwind v4
│   └── main.tsx                       # Ponto de entrada mestre do ecossistema React
├── vite.config.ts                     # Compilador de alta performance baseado em Rolldown
└── package.json                       # Dependências e scripts de automação
```

---

## ⚡ Tecnologias Utilizadas

*   **React 19 & TypeScript:** Construção da interface baseada em tipagem estrita de contratos.
*   **Vite & Rolldown:** Empacotador e motor de compilação rápida de módulos.
*   **Tailwind CSS v4:** Design System fluido otimizado através da injeção nativa de variáveis de tema diretamente no arquivo CSS, eliminando configurações redundantes.
*   **SVG Vetorial:** Renderização nativa de gráficos Candlestick de alta performance sem sobrecarga ou travamentos de GPU de hardware.

---

## 🛠️ Instruções de Instalação e Execução

Siga o passo a passo diretamente no terminal do seu computador para rodar a aplicação localmente:

### 1. Clonar o Repositório e Acessar a Pasta
```bash
git clone <url-do-seu-repositorio>
cd xYUz-AgroTrade-web
```

### 2. Instalar as Dependências do Projeto
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e configure os endpoints operacionais conforme o arquivo de exemplo:
```bash
cp .env.example .env
```
*Abra o arquivo `.env` gerado e certifique-se de manter o subdomínio correto da API de notícias do IBGE para evitar bloqueios de segurança do navegador (CORS):*
```env
VITE_API_AGRO_NEWS=https://ibge.gov.br
```

### 4. Executar em Ambiente de Desenvolvimento (Com limpeza de Cache)
Para rodar o projeto forçando o Vite a pulverizar pré-bundles e registrar os tokens de cores do Tailwind v4 e as variáveis de ambiente sem lixo de memória RAM, utilize a flag `--force`:
```bash
npm run dev -- --force
```

A aplicação abrirá no endereço local padrão indicado no terminal (normalmente `http://localhost:5173`).

---

## 🛡️ Camada de Segurança e Certificações Disponíveis

A plataforma conta com um motor gerador em memória de arquivos de auditoria e segurança estruturados prontos para fechar o contrato com o backend:
*   **Aba "Chaves Operacionais" -> Baixar Certificado SSL (.crt):** Gera e exporta dinamicamente em tempo real um certificado público no padrão **X.509 (PEM)** necessário para estabelecer o canal de comunicação segura bidirecional (*mTLS*) com o barramento da Fiserv.
*   **Aba "Chaves Operacionais" -> Exportar Log de Segurança (CSV):** Monta e efetua o download de uma planilha real contendo as assinaturas criptográficas **HMAC-SHA256** e as ocorrências do Firewall no padrão exigido pelas trilhas de conformidade do Banco Central.
*   **Aba "Perfil & KYC" -> Gerar PDF da Nota de Corretagem:** Dispara o motor de impressão nativo do sistema operacional através de uma folha de estilos CSS (`@media print`) calibrada para extrair relatórios sem os menus da tela, gerando um PDF corporativo limpo em fundo branco com as ordens em tempo real.



🚀 Como Testar e Subir o seu Contêiner LocalmenteCaso você tenha o Docker Desktop instalado na sua máquina, você pode validar o empacotamento executando estes dois comandos no PowerShell:

# 1. Compila a imagem Docker associando a tag da marca
docker build -t xyuz-agrotrade-web .

# 2. Inicializa o contêiner mapeando a porta 80 do Nginx para a porta 8080 do seu navegador
docker run -d -p 8080:80 --name xyuz_mesa_operacional xyuz-agrotrade-web
