FROM circleci/node:lts

RUN echo $HOME
RUN pwd

WORKDIR /ssebot1
COPY ./package.json /ssebot2/package.json
RUN npm install --loglevel warn

COPY ./ /ssebot3

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
