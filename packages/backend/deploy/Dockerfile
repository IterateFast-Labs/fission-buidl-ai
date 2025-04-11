###################################
# Builder Stage
###################################
FROM node:22 AS builder

WORKDIR /builder

COPY package.json ./
COPY . .

RUN corepack enable pnpm
RUN pnpm install
RUN pnpm build

###################################
# Runner Stage
###################################
FROM node:22-alpine AS runner

WORKDIR /app

ARG NODE_ENV
ARG VERSION

ENV NODE_ENV=$NODE_ENV
ENV VERSION=$VERSION
ENV DEVOPS_VERSION=$NODE_ENV-$VERSION

COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/package.json ./


EXPOSE 3000

CMD ["node", "dist/index.js"]
