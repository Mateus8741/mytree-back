FROM node:20-slim

# Atualizar o sistema e instalar pacotes necessários, incluindo o cliente PostgreSQL
RUN apt-get update -y && apt-get install -y openssl postgresql-client && apt-get clean

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .

RUN npm run db:generate && npm run build

# Copiar o script de inicialização
COPY --chown=node:node start.sh ./

# Usar o script start.sh como comando padrão
CMD ["./start.sh"]
