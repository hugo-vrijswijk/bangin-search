FROM node:22-alpine AS base

WORKDIR /app

FROM base AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Add pnpm
COPY ./package.json ./package.json
ENV COREPACK_DEFAULT_TO_LATEST=0
RUN corepack install

COPY . /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=build /app/dist /app/dist

COPY ./tasks/healthcheck.js ./tasks/healthcheck.js

ENV NODE_ENV=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

HEALTHCHECK CMD ["node", "tasks/healthcheck.js"]

CMD [ "node", "./dist/server/entry.mjs" ]
