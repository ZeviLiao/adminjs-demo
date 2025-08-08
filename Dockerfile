# Multi-stage build for AdminJS app
FROM node:20-alpine AS builder

WORKDIR /app

# Prisma on Alpine needs OpenSSL
RUN apk add --no-cache openssl

# Enable Corepack so Yarn is available
RUN corepack enable

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app

# Runtime deps for Prisma client and healthcheck
RUN apk add --no-cache openssl wget

ENV NODE_ENV=production
ENV PORT=3000

# Copy runtime artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/app"]


