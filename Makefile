.PHONY: serve up down build rebuild migrate seed fresh logs shell db-shell

# Запуск контейнеров
serve:
	docker compose up

up:
	docker compose up -d

down:
	docker compose down

# Сборка
build:
	docker compose build

rebuild:
	docker compose build --no-cache

# База данных
migrate:
	docker compose exec php-fpm php artisan migrate

seed:
	docker compose exec php-fpm php artisan db:seed

fresh:
	docker compose exec php-fpm php artisan migrate:fresh --seed

rollback:
	docker compose exec php-fpm php artisan migrate:rollback

# Логи
logs:
	docker compose logs -f

logs-php:
	docker compose logs -f php-fpm

logs-db:
	docker compose logs -f db

# Shell доступ
shell:
	docker compose exec php-fpm bash

db-shell:
	docker compose exec db mysql -u app_user -papp_password app_db

# Artisan команды
artisan:
	docker compose exec php-fpm php artisan $(cmd)

# Очистка
clean:
	docker compose down -v
	docker system prune -f
