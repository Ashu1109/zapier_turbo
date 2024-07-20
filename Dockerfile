FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Install app dependencies
COPY package*.json ./

RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 3000 3001

CMD [ "pnpm","run","dev" ]
