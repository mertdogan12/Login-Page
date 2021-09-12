FROM node as build-deps
WORKDIR /usr/src/app
ENV REACT_APP_AUTHSERVER_URL=https://api.mert.nrw/authServer/
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:latest
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
