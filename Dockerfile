FROM node:18-alpine

LABEL author "yeonje seo"
LABEL description "REST API WAS based on nodejs, express"

WORKDIR /app

COPY package*.json ./
COPY src ./src

RUN npm i -g pm2
RUN npm i mysql2 --save
RUN npm i

CMD ["npm", "run", "dev"]
