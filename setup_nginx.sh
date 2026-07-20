#!/bin/bash
# Nginx setup script for Web-world

DOMAIN="web.waveword.in"
PORT="5001"

echo "Configuring Nginx for $DOMAIN..."

cat <<EOF > /tmp/waveworld_nginx
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        root /var/www/waveworld/Client/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo mv /tmp/waveworld_nginx /etc/nginx/sites-available/waveworld
sudo ln -sf /etc/nginx/sites-available/waveworld /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
echo "Nginx configured successfully!"
