FROM node:latest

WORKDIR ~/Login-Page

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
