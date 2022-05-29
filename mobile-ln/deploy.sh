yarn build
chmod +x deploy/deploy.sh
pm2 start deploy/deploy.sh