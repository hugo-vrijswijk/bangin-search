FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

# Add pnpm
COPY ./package.json ./package.json
ENV COREPACK_DEFAULT_TO_LATEST=0
RUN corepack install

COPY . /app

FROM base AS prod-deps
ENV NODE_ENV=production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV NODE_ENV=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD [ "node", "./dist/server/entry.mjs" ]
