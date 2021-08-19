# Base image
FROM node:12.18.4-alpine


# Create and set app directory
ARG dir=/usr/src/app
RUN mkdir -p $dir
WORKDIR $dir

# Copy source files
COPY . $dir

# Install dependencies
RUN yarn install --prod --frozen-lockfile
RUN yarn add -D typescript @types/node

# .babelrc is necessary for local tests but not for deployent
RUN rm .babelrc

# NextJs public variables need to be loaded in client at build time
# RUN grep '^NEXT_PUBLIC_.*$' $dir/.aptible.env > .env.production


# Build
RUN yarn docker-build

# Expose port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]
