FROM node:15.12.0-alpine

WORKDIR /app

RUN apk add --update-cache \
  make \
  g++ \
  gcc \
  bash \
  python

COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
RUN yarn install

CMD ["yarn", "start:dev"]