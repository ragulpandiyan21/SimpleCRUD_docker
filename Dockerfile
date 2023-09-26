FROM node:latest

ENV MONGO_DB_USERNAME=ragul \
    MONGO_DB_PWD=mypassword


WORKDIR /simplecrud

COPY package.json /simplecrud/

RUN npm install

COPY . /simplecrud/

EXPOSE 3000

CMD ["node", "index.js"]