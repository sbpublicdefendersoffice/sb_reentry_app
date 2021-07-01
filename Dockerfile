# Base image
FROM node:12.18.4

# Create and set app directory
ARG dir=/usr/src/app
RUN mkdir -p $dir
WORKDIR $dir

# Add injected .env file
ADD .aptible.env .

# Copy source files
COPY /components .
COPY /constants .
COPY /documents .
COPY /helpers .
COPY /hooks .
COPY /pages .
COPY /public .
COPY /styles .
COPY /types .
COPY /ui .
COPY .babelrc .
COPY next-env.d.ts .
COPY next.config.js .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

# Install dependencies
RUN yarn

# NextJs public variables are weird...
RUN grep '^NEXT_PUBLIC_.*$' $dir/.aptible.env > .env.production

# Build
RUN yarn build

# Expost
EXPOSE 3000

# Start app
CMD ["yarn", "start"]
