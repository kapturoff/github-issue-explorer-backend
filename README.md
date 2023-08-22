# github-issue-explorer-backend
Бэкенд для [Github Issue Explorer](https://github.com/kapturoff/github-issue-explorer-frontend).

Для запуска необходимо предварительно установить на компьютер `docker` и `docker-compose`. Внутри контейнера бэкенд автоматически транспилируется из TS в JS, а с помощью `docker-compose` запускается mongodb.

## Запуск проекта
Запуск описывается вместе с запуском фронтенда

1. Клонируем репозитории
```sh
> git clone git@github.com:kapturoff/github-issue-explorer-frontend.git
> git clone git@github.com:kapturoff/github-issue-explorer-backend.git
```

2. Собираем и запускаем бэкенд, дожидаемся компиляции репозитория
```sh
> cd github-issue-explorer-backend/
> docker-compose up -d
```

3. Переходим во фронтенд и запускаем его. В стандартный `.env` фронтенда уже добавлена переменная с адресом сервера, запущенном на localhost, так что,
если в `github-issue-explorer-backend/docker-compose.yml` ничего не менялось, дополнительные настройки для `.env` не нужны
```sh
> cd ../github-issue-explorer-frontend/
> npm run start
```

Эта же команда должна открыть и фронт в браузере. Если этого не произошло, то найти его можно по адресу: http://localhost:3000.

## Screenshots

![image](https://github.com/kapturoff/github-issue-explorer-backend/assets/56651670/dd72363d-03cf-46e9-99cc-98d7f1407cc1)

![image](https://github.com/kapturoff/github-issue-explorer-backend/assets/56651670/f0194253-af05-48f1-be5f-3b9d2dce9b2a)

![image](https://github.com/kapturoff/github-issue-explorer-backend/assets/56651670/1ffb2f07-4c9d-4729-a2e4-013c49e62dd7)

