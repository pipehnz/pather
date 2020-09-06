FROM node:12.16.3-alpine

WORKDIR /app

COPY *.json .

RUN npm install && \
    npm start