### Quiz project

Для развертывания выполните

1. Соберите статику:
```bash
    cd frontend
    npm install
    npm run build
```

2. Не забудьте дать права на папку `public`

```bash
    sudo chown username:groupname public
```
3. Установите зависимости для backend:

```bash
    cd backend
    composer install
    composer dump-autoload
```

```bash
    cp .env.example .env
```

```bash
   sudo chmod 777 storage/logs/
   sudo chmod -R 777 storage/framework/
```

3. Примените миграции:
- для linux/mac:

```bash
    source ./scripts/migrate.sh
```

- для windows:

```cmd
.\scripts\migrate.bat
```

3. Поднимите контейнеры:
- для linux:
```bash
    make serve
```
- для windows
```cmd
    docker compose up -d
```