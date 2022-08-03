FROM ubuntu:18.04

LABEL author "yeonje seo"
LABEL description "REST API WAS based on nodejs, express"

RUN apt-get update
RUN apt-get install -y git curl build-essential redis redis-server
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN git clone -b main --single-branch https://github.com/yeonjeseo/easy_express_boilerplate

WORKDIR /easy_express_boilerplate

COPY ./.env ./

RUN npm i
RUN npm i mysql2 --save
RUN npm i -g pm2

RUN redis-server --daemonize yes
