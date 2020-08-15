FROM circleci/node:lts

WORKDIR $HOME/ssebot
COPY ./package.json $HOME/ssebot/package.json
RUN npm install --loglevel warn

COPY ./ $HOME/ssebot

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
