FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY db/ ./db/
RUN npm ci

COPY . .
RUN npx blitz prisma migrate deploy
RUN yarn build
ENV PORT 3000
EXPOSE ${PORT}

CMD yarn start -p ${PORT}
