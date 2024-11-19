FROM node:20.11.0
WORKDIR /
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["yarn", "dev"]
