FROM php:7.3-fpm-stretch

RUN apt-get update && apt-get install -qy --no-install-recommends \
    curl \
    openssl \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmagickwand-dev \
    libmcrypt-dev \
    libgmp-dev\
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    zip \
    unzip

RUN docker-php-ext-install \
    bcmath \
    ctype \
    json \
    mbstring \
    pdo \
    tokenizer \
    xml \
    pdo_mysql \
    gmp \
    intl \
    pcntl

# Install composer
ENV COMPOSER_HOME /composer
ENV PATH ./vendor/bin:/composer/vendor/bin:$PATH
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer

# Install laravel Installer
RUN composer global require laravel/installer

WORKDIR /var/www/html