# ===== Build =====
FROM node:22-slim AS build

RUN corepack enable

WORKDIR /app

ENV PNPM_HOME=/pnpm-store
ENV PATH=$PNPM_HOME:$PATH
ENV PNPM_STORE_PATH=/pnpm-store

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}


COPY package.json pnpm-lock.yaml* ./

RUN pnpm config set registry https://registry.npmjs.org/

RUN --mount=type=cache,target=/pnpm-store \
    pnpm install --frozen-lockfile --network-concurrency=16 --fetch-timeout=600000 \
    && pnpm approve-builds esbuild

COPY . ./

RUN pnpm build

FROM node:22-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app


RUN apt-get update && apt-get install -y --no-install-recommends tini \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/.output ./

EXPOSE 3000

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server/index.mjs"]
