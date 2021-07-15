FROM node:latest

WORKDIR /home/mert/Login-Page

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
