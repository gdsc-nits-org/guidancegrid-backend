#!/bin/bash
set -e

echo "Pulling from git..."
git pull origin dev
echo "Installing dependencies..."
pnpm install
echo "Generating prisma client..."
pnpm prisma generate
echo "Migrating database..."
pnpm prisma migrate dev
echo "Building..."
pnpm run build

PROCESS_NAME="server-dev"

echo "Checking if $PROCESS_NAME is running..."
if pm2 show $PROCESS_NAME &>/dev/null; then
    # If the process exists, restart it
    echo "Restarting $PROCESS_NAME..."
    pm2 restart $PROCESS_NAME --update-env
else
    # If the process doesn't exist, start it
    echo "Starting $PROCESS_NAME..."
    pm2 start ./dist/server.js --name $PROCESS_NAME
fi