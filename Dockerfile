FROM node:latest

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
RUN yarn add react-scripts@3.0.1 -g

CMD ["yarn", "start"]