@echo off
REM Скрипт для наполнения БД

echo Applying database seeding...
docker exec laravel php /app/artisan db:seed

if %errorlevel% equ 0 (
    echo Seed applied successfully!
) else (
    echo Failed to apply seed!
)
pause