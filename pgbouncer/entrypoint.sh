#!/bin/sh
set -e

export RAQAMLIAVLOD_DATABASE_NAME="$(cat /run/secrets/raqamliavlod_postgres_database)"
export RAQAMLIAVLOD_DATABASE_USERNAME="$(cat /run/secrets/raqamliavlod_postgres_username)"
export RAQAMLIAVLOD_DATABASE_PASSWORD="$(cat /run/secrets/raqamliavlod_postgres_password)"

export DB_HOST="${DB_HOST:-postgres}"
export DB_PORT="${DB_PORT:-5432}"

cat <<EOF > /etc/pgbouncer/pgbouncer.ini
[databases]
${RAQAMLIAVLOD_DATABASE_NAME} = host=${DB_HOST} port=${DB_PORT} dbname=${RAQAMLIAVLOD_DATABASE_NAME} user=${RAQAMLIAVLOD_DATABASE_USERNAME} password=${RAQAMLIAVLOD_DATABASE_PASSWORD}

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = plain
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20
EOF

echo "\"${RAQAMLIAVLOD_DATABASE_USERNAME}\" \"${RAQAMLIAVLOD_DATABASE_PASSWORD}\"" \
  > /etc/pgbouncer/userlist.txt

exec "$@"
