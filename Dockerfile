FROM ubuntu:18.04

LABEL author "yeonje seo"
LABEL description "REST API WAS based on nodejs, express"



RUN apt-get update
RUN apt-get install -y git curl build-essential
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN git clone https://github.com/yeonjeseo/easy_express_boilerplate

WORKDIR /easy_express_boilerplate

COPY ./.env ./

RUN npm i
RUN npm i -g mysql2 pm2



#RUN npm i