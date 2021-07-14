# Base image
FROM node:12.18.4


# Create and set app directory
ARG dir=/usr/src/app
RUN mkdir -p $dir
WORKDIR $dir

# Copy source files
COPY . $dir

# Install dependencies
RUN yarn

# NextJs public variables are weird...
RUN grep '^NEXT_PUBLIC_.*$' $dir/.aptible.env > .env.production

# Build
RUN yarn build

# Expost
EXPOSE 3000

RUN node ./helpers/sequelize.js&

# Start app
CMD ["yarn", "start"]
