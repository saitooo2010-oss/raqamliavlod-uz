from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
BOT_SECRET = os.environ.get("BOT_SECRET", "change-me-bot-secret")
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'no-secret')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DJANGO_DEBUG', 'false').lower() in ['y', 't', 'yes', 'true']

if DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = ['bk.raqamliavlod.uz', 'api-raqamliavlod.abdulkhafizov.uz']

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'django_cleanup',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.news',
    'apps.courses',
    'apps.accounts',
    'apps.articles',
    'apps.forum',
    'apps.contests',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('RAQAMLIAVLOD_DATABASE_NAME', 'raqamliavlod'),
            'USER': os.environ.get('RAQAMLIAVLOD_DATABASE_USERNAME', 'postgres'),
            'PASSWORD': os.environ.get('RAQAMLIAVLOD_DATABASE_PASSWORD', 'postgres'),
            'HOST': os.environ.get('PGBOUNCER_HOST', 'pgbouncer'),
            'PORT': os.environ.get('PGBOUNCER_PORT', '6432'),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators
if DEBUG:
    AUTH_PASSWORD_VALIDATORS = []
else:
    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'uz'

TIME_ZONE = 'Asia/Tashkent'

USE_I18N = True

USE_TZ = True

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

LANGUAGES = {
    'uz': "O'zbekcha"
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/assets/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_PATH = [os.path.join(BASE_DIR, 'staticfiles')]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'accounts.UserModel'

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        "https://raqamliavlod.uz",
        "https://raqamliavlod.abdulkhafizov.uz"
    ]

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True

    CSRF_TRUSTED_ORIGINS = ["https://api-raqamliavlod.abdulkhafizov.uz"]

    X_FRAME_OPTIONS = 'DENY'

    SESSION_COOKIE_AGE = 3600
    SESSION_EXPIRE_AT_BROWSER_CLOSE = True
    SESSION_SAVE_EVERY_REQUEST = True


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 8
}

SIMPLE_JWT = {
    'USER_ID_FIELD': 'guid',
    'USER_ID_CLAIM': 'login_id',
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}
