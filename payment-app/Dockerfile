FROM node:latest

WORKDIR /setel-assignment/payment-app

COPY package.json yarn.lock ./ 

RUN yarn --pure-lockfile

COPY . .

EXPOSE 3002

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]