FROM node:11-alpine

WORKDIR /api

RUN npm install -g npm@latest

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start