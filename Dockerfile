FROM node:18-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN yarn install
COPY client/ ./
RUN yarn run build



FROM node:18-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN yarn install
COPY server/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["yarn", "run", "start"]