FROM dhi.io/node:26-alpine-dev AS build

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

RUN npm install -g corepack && corepack enable
ENV HUSKY=0

COPY . /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

FROM dhi.io/node:26-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist

COPY ./tasks/healthcheck.js ./tasks/healthcheck.js

ENV NODE_ENV=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD ["node", "tasks/healthcheck.js"]

CMD ["node", "./dist/server/entry.mjs"]
