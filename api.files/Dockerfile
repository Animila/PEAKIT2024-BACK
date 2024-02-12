FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8900

RUN chmod -R 777 /app/storage

CMD ["npm","run", "start"]