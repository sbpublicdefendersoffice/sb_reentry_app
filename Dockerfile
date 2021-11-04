# Build image and add bash for remote sessions
FROM node:14.18.1

# Create and set app directory
ENV dir=/usr/src/app
RUN mkdir -p $dir
WORKDIR $dir

# Copy source files
COPY . $dir

# Install dependencies

RUN yarn install --prod --frozen-lockfile --network-timeout 100000
RUN yarn add -D typescript @types/node --network-timeout 100000

# .babelrc is necessary for local tests but not for deployment
RUN rm .babelrc

# NextJs public variables need to be loaded in client at build time, and postgres variables are needed to pre-render the html at build time
RUN grep '^NEXT_PUBLIC_.*$\|^POSTGRES_.*$' $dir/.aptible.env > .env.production

# Build
RUN yarn docker-build

# Expose port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]
