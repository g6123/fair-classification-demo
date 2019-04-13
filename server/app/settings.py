from os import environ

HOST = environ.get('APP_HOST', 'localhost')
PORT = int(environ.get('APP_PORT', '9000'))
DEVICE = environ.get('APP_DEVICE', 'cpu')
