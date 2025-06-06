# Stage 1: Build
FROM node:22 AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN apt-get update && \
    apt-get install -y openssl libssl3 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:22-slim

RUN apt-get update && \
    apt-get install -y openssl libssl3 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN printenv DATABASE_URL

# Migrate DB (optional: depends if you run migrations at runtime or separately)
RUN npx prisma generate
RUN npx prisma migrate deploy

ENV NODE_ENV=production

#CMD ["npm","run","start:prod"]
CMD ["node","dist/main"]