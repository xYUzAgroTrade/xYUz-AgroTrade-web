# ===================================================================
# ETAPA 1: Compilação dos Arquivos (Build Stage)
# ===================================================================
FROM node:20-alpine AS build

# Define o diretório de trabalho interno do contêiner
WORKDIR /app

# Copia apenas os arquivos de manifesto de pacotes para otimizar o cache de camadas do Docker
COPY package*.json ./

# Instala as dependências de forma limpa e estrita para produção
RUN npm ci

# Copia todo o restante dos arquivos do projeto xYUz-AgroTrade para o contêiner
COPY . .

# Injeta as variáveis de ambiente necessárias durante a compilação do Vite
# (Substitua ou configure essas variáveis na sua esteira de CI/CD se preferir)
ENV VITE_API_AGRO_NEWS=https://ibge.gov.br
ENV VITE_FISERV_HUB_URL=https://xyuz.com.br
ENV VITE_MERCHANT_ID=XYUZ_AGRO_BR_009912
ENV VITE_CLIENT_ID=cli_client_id_4f8a9b3c

# Executa a compilação de produção para gerar a pasta 'dist' otimizada via Rolldown
RUN npm run build

# ===================================================================
# ETAPA 2: Servidor Web de Alta Performance (Production Stage)
# ===================================================================
FROM nginx:alpine AS production

# Copia os arquivos estáticos gerados na Etapa 1 para a pasta padrão de distribuição do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Injeta uma configuração customizada para o Nginx não quebrar rotas do React Router (SPA)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expõe a porta 80 padrão para tráfego HTTP HTTP na nuvem
EXPOSE 80

# Inicializa o Nginx em primeiro plano (foreground) para manter o contêiner ativo
CMD ["nginx", "-g", "daemon off;"]
