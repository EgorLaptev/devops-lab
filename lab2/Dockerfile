FROM node:22-slim

RUN useradd -m appuser

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]