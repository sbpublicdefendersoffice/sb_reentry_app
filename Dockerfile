# dependency image
FROM node:18-alpine AS DEPS

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed
RUN apk add --no-cache libc6-compat

# Create and set app directory
WORKDIR /app

# Copy stuff for deps
COPY package.json yarn.lock .aptible.env ./
COPY /documents ./documents
RUN grep '^NEXT_PUBLIC_.*$\|^POSTGRES_.*$' .aptible.env > .env.production

# Install deps
RUN yarn install --frozen-lockfile --network-timeout 100000

# =========
# build image
FROM node:18-alpine AS BUILDER

WORKDIR /app

# Copy source files
COPY . .

COPY --from=DEPS /app/node_modules ./node_modules
COPY --from=DEPS /app/documents ./documents
COPY --from=DEPS /app/.env.production ./

# .babelrc is necessary for local tests but not for deployment
# NextJs public variables need to be loaded in client at build time
RUN rm .babelrc 

RUN yarn docker-build && yarn install --prod --prefer-offline --network-timeout 100000
# =========
# runtime image
FROM node:18-alpine AS RUNNER

RUN apk add --no-cache bash

WORKDIR /app

ENV NODE_ENV production

# Copy files for runtime
COPY --from=BUILDER app/next.config.js ./
COPY --from=BUILDER app/documents ./documents
COPY --from=BUILDER app/public ./public
COPY --from=BUILDER app/.next ./.next
COPY --from=BUILDER app/node_modules ./node_modules
COPY --from=BUILDER app/package.json ./

# Expose port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]

