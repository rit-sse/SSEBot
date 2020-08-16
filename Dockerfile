FROM node:12

WORKDIR /ssebot

COPY package*.json ./
ENV NODE_ENV=production
RUN npm i --loglevel warn

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
