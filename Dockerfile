# Base image
FROM node:12.18.4

# Create and set app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# Copy source files
COPY . .

# NextJs public variables are weird...
RUN cat /usr/src/app/.aptible.env

# Build
RUN yarn build
EXPOSE 3000

# Running the app
CMD ["yarn", "start"]

# Set ENV variables separately