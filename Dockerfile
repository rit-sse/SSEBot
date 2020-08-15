FROM circleci/node:lts

RUN echo $HOME
RUN pwd
RUN ls
RUN ls $HOME

RUN mkdir $HOME/ssebot
WORKDIR $HOME/ssebot

RUN ls $HOME
RUN ls $HOME/ssebot

COPY ./package.json $HOME/ssebot/package.json
RUN npm install --loglevel warn

COPY ./ $HOME/ssebot

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
