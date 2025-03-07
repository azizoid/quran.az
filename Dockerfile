FROM node:20-alpine AS base

RUN apk add --no-cache curl bash libc6-compat && \
    addgroup -g 1001 -S quranaz-user && \
    adduser -S quranaz-user -u 1001

WORKDIR /app

RUN npm install -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

FROM dependencies AS builder
WORKDIR /app
COPY . .

ARG ENV_FILE
RUN echo "$ENV_FILE" | base64 -d > .env.production
RUN pnpm run build

FROM base AS production

WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=quranaz-user:quranaz-user /app/.next/standalone ./
COPY --from=builder --chown=quranaz-user:quranaz-user /app/.next/static ./.next/static

RUN chown -R quranaz-user:quranaz-user /app

USER quranaz-user

EXPOSE ${PORT}

CMD ["node", "server.js"]