# Use the official PHP image with FPM
FROM php:8.3-cli-alpine as php_build_stage
# Set working directory in the container
WORKDIR /var/www

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
# Install required system dependencies for Laravel and PHP extensions
RUN  apk update   \ apk upgrade  \ apk add --no-cache \
        bash \
        curl \
        wget \
        ncdu \
        procps \
        libsodium-dev \
        # Install PHP extensions
        && install-php-extensions \
        bz2 \
        pcntl \
        mbstring \
        bcmath \
        sockets \
        opcache \
        exif \
        pdo_mysql \
        zip \
        intl \
        gd

# Install Composer to manage Laravel dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Copy the Laravel application files
COPY . .

# Install PHP dependencies using Composer
RUN composer install --no-interaction --prefer-dist

FROM node:22-alpine as npm_build_stage
WORKDIR /var/www
COPY . .
# Install frontend dependencies (optional for Vue.js)
RUN npm install

CMD ["npm","run","build"]



# Set the entrypoint for the container (start PHP-FPM server)
FROM php_build_stage

# Expose the Laravel application port (default 8000 for local development)
EXPOSE 8000
CMD  ["/usr/local/bin/php","artisan","serve"]
