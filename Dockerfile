# Base image
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Create user
RUN addgroup -g 1001 -S teklif-user && \
  adduser -S teklif-user -u 1001

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc* ./
RUN corepack enable pnpm && pnpm install

# Optionally install development dependencies (e.g., TypeScript and type definitions)
RUN pnpm add --save-exact --save-dev typescript @types/react @types/node

# Development Stage
FROM base AS development
COPY . .
RUN pnpm prisma generate
RUN chown -R teklif-user:teklif-user /app
USER teklif-user
EXPOSE ${PORT}
CMD ["pnpm", "run", "dev"]

# Build Stage
FROM base AS builder
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

# Production Stage
FROM base AS production
WORKDIR /app

# Copy only the necessary build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=teklif-user:teklif-user /app/.next/standalone ./
COPY --from=builder --chown=teklif-user:teklif-user /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Re-run Prisma generate if needed for production runtime
RUN pnpm prisma generate

USER teklif-user
EXPOSE ${PORT}
CMD ["pnpm", "run", "start"]