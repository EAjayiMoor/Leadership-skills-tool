FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:24-bookworm-slim AS builder
WORKDIR /app
ARG SOURCE_COMMIT=unknown
ENV NEXT_TELEMETRY_DISABLED=1 NEXT_STANDALONE=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public \
    && node -e "require('fs').writeFileSync('public/_deployment.json', JSON.stringify({sourceCommit: process.env.SOURCE_COMMIT}))" \
    && npm run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ARG SOURCE_COMMIT=unknown
LABEL org.opencontainers.image.source="https://github.com/EAjayiMoor/Leadership-skills-tool" \
      org.opencontainers.image.revision=$SOURCE_COMMIT
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=8080
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
EXPOSE 8080
CMD ["node", "server.js"]
