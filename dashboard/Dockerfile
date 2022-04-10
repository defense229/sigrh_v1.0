FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build
CMD [ "yarn", "start:prod" ]
EXPOSE 80