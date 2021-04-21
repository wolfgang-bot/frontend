FROM node:14-slim

ARG REACT_APP_DISCORD_BOT_CLIENT_ID

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
