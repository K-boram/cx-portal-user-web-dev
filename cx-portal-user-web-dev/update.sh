#!/bin/bash

ROOT=/app/igsn-studio-client
SERVE_DIR=/svc/web/nginx_lguservice
# DEPLOY_DIR=/svc/web/www

# >>> update source code >>>
cd $ROOT
git fetch
git pull origin origin/feature/ixi-vue3
pnpm install
pnpm build

cp ./nginx.conf  $SERVE_DIR/conf/nginx.conf
cp -r $ROOT/dist/* $SERVE_DIR/html/
# <<< update source code <<<


# mkdir -p /etc/nginx
cp /app/igsn-studio-client/health.json /etc/nginx/health.json
