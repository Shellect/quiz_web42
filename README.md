### Quiz project

Для развертывания выполните

1. Соберите статику:
```bash
    cd frontend
    npm install
    npm run build
```

2. Создайте папку `public` и убедитесь в доступности редактирования

```bash
    mkdir public
    chmod 755 public
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
   sudo chmod -R 777 storage/logs/
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

4. Проверьте результат работы по адресу [http://localhost:8000](http://localhost:8000)