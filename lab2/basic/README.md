# Лабораторная работа №2

## Dockerfile

### 1. Bad practice
```dockerfile
FROM node:latest

USER root

WORKDIR /app

COPY . .

RUN npm i

CMD ["node", "server.js"]
```

### 2. Best practice
```dockerfile
FROM node:22-slim

RUN useradd -m appuser

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
```

## Containers

### 1. Не ограничивать ресурсы контейнера
Без ограничения ресурсов контейнер может забрать все доступные ресурсы хоста, 
что урежет производительность других запущенных на данном хосте контейнеров
```shell
docker run --memory="256m" --cpus="0.5" app
```

### 2. Запускать контейнер с root-правами
Запуск контейнеров от пользователя root — это серьёзная уязвимость безопасности, поэтому 
желательно всегда запускать контейнер с минимальными провами, которые нужны для работы.
```shell
docker run --user 1001 app
```