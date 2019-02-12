#!/bin/sh
# Reload server with new configuration settings.
pm2 delete test-write-always
npm run deploy-staging
