# Use a lightweight Node.js base image
FROM node:20-alpine AS base

# Install dependencies and set up the environment
RUN apk add --no-cache curl bash libc6-compat && \
    addgroup -g 1001 -S quranaz-user && \
    adduser -S quranaz-user -u 1001

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm


# Dependencies Layer (Optimize Caching)
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

FROM dependencies AS builder
COPY . .

ARG ENV_FILE
RUN echo "$ENV_FILE" | base64 -d > .env.production
RUN pnpm run build

# Production Image (Final)
FROM base AS production

# Set up work directory and copy built assets
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=quranaz-user:quranaz-user /app/.next/standalone ./
COPY --from=builder --chown=quranaz-user:quranaz-user /app/.next/static ./.next/static
COPY --from=dependencies /app/node_modules ./node_modules

# Set permissions
RUN chown -R quranaz-user:quranaz-user /app

# Switch to non-root user
USER quranaz-user

# Expose port
EXPOSE ${PORT}

# Run migrations and start the app
CMD ["node", "server.js"]