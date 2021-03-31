FROM node:15.12.0-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

CMD ["yarn", "dev"]