# Лабораторная работа №3

Хорошее и плохое написание CI/CD файла на примере yml файлов github-actions, которые лежат в папке `.github/workflows`

## Bad practice
```yaml
name: Bad Practice

on: push

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - name: copying the code
        uses: actions/checkout@v3

      - name: install Node.js
        run: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - 

      - name: install deps
        run: npm i

      - name: run Tests
        run: npm run test

  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Deploy
        env:
          API_KEY: "FJE4G-F8452-LIA0F-B7S88-JE09P"
```
### Были допущены следующие ошибки:
1. **Запуск на любой пуш (неограниченные триггеры)** — пайплайн запускается на каждое изменение, что увеличивает количество ненужных запусков, даже для незначительных изменений.
2. **Использование curl для установки Node.js** — это не лучший способ управления версиями, поскольку он не фиксирует конкретную версию Node.js, что может привести к неожиданным проблемам при обновлениях.
3. **Отсутствие кэширования зависимостей** — каждая установка зависимостей (`npm i`) выполняется заново, что замедляет процесс.
4. **Хранение секретов в коде** — секретные данные (например, `API_KEY`) записаны напрямую в коде.
5. **Отсутствие разделения этапов и тестов** — отсутствует четкое разделение на юнит-тесты, интеграционные тесты и сборку, что затрудняет масштабируемость и отладку.

## Best practice
```yaml
name: Best Practice
on:
  push:
    branches:
      - main
      - develop

jobs:
  unit_tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run Unit Tests
        run: npm run test

  integration_tests:
    runs-on: ubuntu-latest
    needs: unit_tests
    steps:
      - uses: actions/checkout@v3
      - uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run Integration Tests
        run: npm run integration-tests

  deploy:
    runs-on: ubuntu-latest
    needs: [unit_tests, integration_tests]
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Production
        env:
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
```
### Было исправлено:
1. **Ограниченные триггеры** — пайплайн запускается только на ветках `main` и `develop`, что сокращает ненужные запуски.
2. **Кэширование зависимостей** — используется кэш для `node_modules`, что ускоряет сборку и снижает нагрузку на систему.
3. **Фиксированные версии Node.js** — использование `actions/setup-node@v3` фиксирует конкретную версию Node.js, что повышает стабильность.
4. **Использование секретов** — вместо хранения чувствительных данных в коде используются `GitHub Secrets` для безопасного деплоя.
5. **Разделение этапов** — пайплайн разбит на отдельные этапы (юнит-тесты, интеграционные тесты, деплой), что делает его масштабируемым, понятным и легким для поддержки.


