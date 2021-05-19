FROM nginx:1.20.0-alpine

ARG REACT_APP_DISCORD_BOT_CLIENT_ID

ENV GENERATE_SOURCEMAP=false
ENV HOST=0.0.0.0
ENV PORT=3000

RUN apk add --update nodejs npm

WORKDIR /app

COPY package*.json ./
COPY lerna.json ./

RUN npm ci

COPY packages ./packages

RUN npm run packages:ci

ENV NODE_ENV=production

RUN npm run packages:build

COPY . .

RUN cp -R /app/packages/static/build/. /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/dashboard
RUN cp -R /app/packages/dashboard/build/. /usr/share/nginx/html/dashboard

RUN rm /etc/nginx/conf.d/default.conf
RUN cp nginx.conf /etc/nginx/conf.d/default.conf
