FROM node:carbon


WORKDIR /testdir
COPY ./package.json /testdir/package.json
RUN npm install --loglevel warn

COPY ./ /testdir

EXPOSE 3000

ENV NODE_ENV=production
RUN npm start
