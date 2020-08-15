FROM circleci/node:lts

WORKDIR /ssebot

COPY ./package.json /gdfghgfdh/package.json
RUN npm install --loglevel warn

COPY ./ /gdfghgfdh

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
