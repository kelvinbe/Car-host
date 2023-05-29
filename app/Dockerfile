FROM node:lts-alpine AS base

# Pass down env variabls

# Firebase env variables
ARG NEXT_PUBLIC_apiKey
ENV NEXT_PUBLIC_apiKey=$NEXT_PUBLIC_apiKey
ARG NEXT_PUBLIC_appId
ENV NEXT_PUBLIC_appId=$NEXT_PUBLIC_appId
ARG NEXT_PUBLIC_messagingSenderId
ENV NEXT_PUBLIC_messagingSenderId=$NEXT_PUBLIC_messagingSenderId
ARG NEXT_PUBLIC_storageBucket
ENV NEXT_PUBLIC_storageBucket=$NEXT_PUBLIC_storageBucket
ARG NEXT_PUBLIC_projectId
ENV NEXT_PUBLIC_projectId=$NEXT_PUBLIC_projectId
ARG NEXT_PUBLIC_authDomain
ENV NEXT_PUBLIC_authDomain=$NEXT_PUBLIC_authDomain

# Google Maps API key
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# APP
ARG NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverages output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]