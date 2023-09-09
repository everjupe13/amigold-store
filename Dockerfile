ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}

ENV NODE_ENV=production

WORKDIR /src

COPY package.json .

RUN npm install --production=false
COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]