FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Install build dependencies for native modules and esbuild
RUN apk add --no-cache libc6-compat

# Install app dependencies
COPY package*.json ./
RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 3000 3001 3002

CMD [ "npm","run","dev" ]