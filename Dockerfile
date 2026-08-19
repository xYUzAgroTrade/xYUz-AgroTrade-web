# ===================================================================
# ETAPA 1: Compilacao (Build Stage)
# ===================================================================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variaveis de build NAO-SENSIVEIS injetadas pelo CI/CD via --build-arg
# NUNCA inclua secrets, tokens ou chaves HMAC aqui (Vite inlineia no JS publico)
ARG VITE_API_BASE_URL=http://localhost:3000
ARG VITE_WS_BASE_URL=ws://localhost:3000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_WS_BASE_URL=$VITE_WS_BASE_URL

RUN npm run build

# ===================================================================
# ETAPA 2: Servidor Web (Production Stage)
# ===================================================================
FROM nginx:alpine AS production

# Seguranca: rodar nginx como usuario nao-root
RUN adduser -D -H -u 1001 -s /sbin/nologin appuser && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appuser /var/run/nginx.pid

# Configuracao nginx com headers de seguranca
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Headers de seguranca \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-Frame-Options "DENY" always; \
    add_header Referrer-Policy "no-referrer" always; \
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always; \
    add_header Content-Security-Policy "default-src '"'"'self'"'"'; script-src '"'"'self'"'"'; style-src '"'"'self'"'"' '"'"'unsafe-inline'"'"'; img-src '"'"'self'"'"' data: https:; connect-src '"'"'self'"'"' https://*.xyuz-agrotrade.com wss://*.xyuz-agrotrade.com; font-src '"'"'self'"'"';" always; \
    \
    # SPA fallback \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache de assets estaticos \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Runtime config (injetado pelo orquestrador em deploy) \
    location = /config.json { \
        expires -1; \
        add_header Cache-Control "no-store, no-cache, must-revalidate"; \
    } \
    \
    # Healthcheck endpoint \
    location = /health { \
        access_log off; \
        return 200 "ok"; \
        add_header Content-Type text/plain; \
    } \
    \
    # Pagina de erro \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Ajustar nginx.conf para escutar em porta nao-privilegiada
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i '/^user/d' /etc/nginx/nginx.conf

# Copiar artefatos de build
COPY --from=build /app/dist /usr/share/nginx/html

# Criar pagina 50x.html
RUN echo '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Erro</title></head><body><h1>Servico temporariamente indisponivel</h1></body></html>' > /usr/share/nginx/html/50x.html

# Criar config.json placeholder (substituido em runtime pelo orquestrador)
RUN echo '{"apiBaseUrl":"","wsBaseUrl":"","environment":"production"}' > /usr/share/nginx/html/config.json

# Rodar como usuario nao-root
USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
