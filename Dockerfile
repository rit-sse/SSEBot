FROM node:carbon

WORKDIR /slackbot
COPY ./package.json /slackbot/package.json
RUN npm install --loglevel warn

COPY ./ /slackbot

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
