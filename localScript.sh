#!/bin/bash
set -e

echo "Pulling from git..."
git pull origin dev
echo "Installing dependencies..."
pnpm install
echo "Migrating database..."
pnpm prisma migrate dev

echo "Done!"
