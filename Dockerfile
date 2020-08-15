FROM circleci/node:lts

WORKDIR /ssebot
COPY ./package.json /ssebot/package.json
RUN npm install --loglevel warn

COPY ./ /ssebot

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
