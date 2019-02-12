#!/bin/sh
# Reload server with new configuration settings.
pm2 delete write-always
npm run deploy-prod
