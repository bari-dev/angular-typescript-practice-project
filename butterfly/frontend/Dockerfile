FROM node:20.11.0 AS build
WORKDIR /
COPY . .
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 80
CMD ["ng", "serve", "--host", "0.0.0.0"]

