FROM php:8.2-fpm

# Устанавливаем fcgi для healthcheck
RUN apt-get update && apt-get install -y libfcgi-bin && rm -rf /var/lib/apt/lists/*

# Устанавливаем необходимые php библиотеки
RUN docker-php-ext-install pdo_mysql
RUN pecl install xdebug-3.4.7 && docker-php-ext-enable xdebug

# Настраиваем worker pull
COPY .docker/php/php-fpm-healthcheck.conf /usr/local/etc/php-fpm.d/zz-healthcheck.conf

# Копируем cpmposer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Копируем скрипт установки миграций
COPY .docker/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
