# Base image
FROM node:12.18.4

ARG dir=/usr/src/app

# Create and set app directory
RUN mkdir -p $dir
ADD . $dir
WORKDIR $dir

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# Copy source files
COPY . .

# NextJs public variables are weird...
RUN grep '^NEXT_PUBLIC_.*$' $dir/.aptible.env > .env.production

# Build
RUN yarn build
EXPOSE 3000

# Running the app
CMD ["yarn", "start"]

# Set ENV variables separately