#!/bin/sh
echo 'Build in progress...'
npx nest build
npx nest build qrcode-generator
npx nest build score-manager
npx nest build report
npx nest build mail-push
npx nest build defrecrut-ln