#!/bin/bash
# Скрипт для наполнения БД

echo "Applying database seeding..."
docker exec laravel php /app/artisan db:seed

if [ $? -eq 0 ]; then
    echo "Seed applied successfully!"
else
    echo "Failed to apply seed!"
fi
