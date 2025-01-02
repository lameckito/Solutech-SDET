# Setup Guide

This guide provides installation instructions for setting up the Laravel application both via CLI and Docker.
Steps:
Clone the repository [https://github.com/Solutech-Limited/booking-challenge
](https://github.com/Solutech-Limited/booking-challenge)

## Installation via CLI
### Preqest
Composer
P
```
# Install PHP dependencies
composer install

# Install front-end dependencies
npm install

# Rename .env.example to .env
cp .env.example .env

# Set up database credentials in .env file

# Run database migrations
php artisan migrate

# Seed the database with initial data
php artisan db:seed

# Serve the application on port 80
php artisan serve --port 80

# Compile front-end assets
npm run dev

# Run tests
php artisan test

# Generate API documentation
php artisan scribe:generate

# Access the API documentation at:
# http://localhost/docs/index.html

# Access the Laravel app at:
# http://localhost
```
## Installation via Docker

docker compose run php composer install
