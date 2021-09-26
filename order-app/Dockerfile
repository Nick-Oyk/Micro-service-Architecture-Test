FROM node:latest

WORKDIR /setel-assignment/order-app

COPY package.json yarn.lock ormconfig.json ./ 

RUN yarn --pure-lockfile

COPY . .

EXPOSE 3001

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]