#!/bin/bash
# Automation deploy script for Web-world

cd /var/www/waveworld
git pull

# Install dependencies and build client
cd /var/www/waveworld/Client
npm install
npm run build

# Install dependencies and restart backend
cd /var/www/waveworld/Server
npm install
pm2 restart webworld-backend

echo "Deployment successful!"
