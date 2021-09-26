FROM node:latest

WORKDIR /setel-assignment/api-gateway

COPY package.json yarn.lock ./ 

RUN yarn --pure-lockfile

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]