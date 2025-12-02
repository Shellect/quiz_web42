#!/bin/sh
set -e

# Миграции (--force для production без подтверждения)
php artisan migrate --force

# Сидирование только для dev
if [ "$APP_ENV" = "local" ] || [ "$APP_ENV" = "development" ]; then
    php artisan db:seed --force
fi

# Запуск основного процесса (CMD из Dockerfile или аргументы)
exec "$@"

