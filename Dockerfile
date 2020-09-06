FROM node:12.16.3-alpine

WORKDIR /app

COPY *.json /app/

RUN npm install 

COPY * /app/

RUN npm start