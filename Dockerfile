FROM node:22-alpine AS base

WORKDIR /app

FROM base AS base-deps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Add pnpm
COPY ./package.json ./package.json
ENV COREPACK_DEFAULT_TO_LATEST=0
RUN corepack install

COPY . /app

FROM base-deps AS prod-deps
ENV NODE_ENV=production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base-deps AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

COPY ./tasks/healthcheck.js ./tasks/healthcheck.js

ENV NODE_ENV=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

HEALTHCHECK CMD ["node", "tasks/healthcheck.js"]

CMD [ "node", "./dist/server/entry.mjs" ]
