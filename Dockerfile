FROM circleci/node:lts

COPY ./package.json /ssebot/package.json

WORKDIR /ssebot

RUN npm install --loglevel warn

COPY ./ /ssebot



EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
