FROM oven/bun:alpine AS base

WORKDIR /app

FROM base AS build

ENV BUN_INSTALL_CACHE_DIR=/bun/cache

COPY package.json bun.lock /app/

RUN bun install --frozen-lockfile --ignore-scripts

COPY . /app

RUN --mount=type=cache,id=bun,target=/bun/cache bun run build

FROM base
COPY --from=build /app/dist /app/dist

COPY ./tasks/healthcheck.js ./tasks/healthcheck.js

USER bun

ENV NODE_ENV=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

HEALTHCHECK CMD ["bun", "run", "tasks/healthcheck.js"]

ENTRYPOINT [ "bun", "run", "./dist/server/entry.mjs" ]
