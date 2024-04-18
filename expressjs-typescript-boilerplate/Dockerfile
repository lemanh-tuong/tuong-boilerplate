FROM node:16

EXPOSE 3000

WORKDIR /node-app

COPY package.json ./

run yarn

COPY . .

CMD ["yarn", "build"]

CMD ["yarn", "start"]
