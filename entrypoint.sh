#!/bin/sh
set -e
node /server/index.js &
exec nginx -g 'daemon off;'
