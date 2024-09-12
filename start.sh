#!/bin/sh

# Definir a variável de ambiente para a URL do banco de dados no Docker (pg)
export DATABASE_URL="postgresql://docker:docker@pg:5432/mytree"

# Esperar o serviço de banco de dados estar pronto antes de executar as migrações
until pg_isready -h pg -p 5432 -U docker
do
  echo "Esperando o banco de dados ficar pronto..."
  sleep 2
done

# Rodar as migrações usando DATABASE_DOCKER_URL
npm run db:migrate

# Agora iniciar a aplicação
npm run start
