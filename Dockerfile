FROM node:14-slim

ARG REACT_APP_DISCORD_BOT_CLIENT_ID

ENV GENERATE_SOURCEMAP=false
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
