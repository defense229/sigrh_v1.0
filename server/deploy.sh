#!/bin/sh
yarn
./build.sh
pm2 start dist/apps/sigrh-server/apps/sigrh-server/src/main.js
pm2 start dist/apps/qrcode-generator/apps/qrcode-generator/src/main.js
pm2 start dist/apps/score-manager/apps/score-manager/src/main.js
pm2 start dist/apps/report/main.js
pm2 start dist/apps/defrecrut-ln/apps/defrecrut-ln/src/main.js