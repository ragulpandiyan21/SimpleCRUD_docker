FROM node:latest

WORKDIR /simplecrud

COPY package.json /simplecrud/

RUN npm install

COPY . /simplecrud/

EXPOSE 3000

CMD ["node", "index.js"]