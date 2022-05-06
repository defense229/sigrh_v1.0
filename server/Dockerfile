FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY build.sh .
RUN yarn install
COPY . .
RUN yarn prod