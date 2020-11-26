FROM node:12.18

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY ./ ./

CMD ["npm","start"]