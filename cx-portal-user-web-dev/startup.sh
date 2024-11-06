#!/bin/bash
# It assume installed nginx
# CAUTION!!!!: it remove origin nginx.conf
ln -Tfs /usr/share/zoneinfo/Asia/Seoul /etc/localtime 2>&1 || true

# ROOT=/home/abacus/containerd/eggw-v2-admin
mkdir -p /logs/web/nginx_lguservice/access-log
mkdir -p /logs/web/nginx_lguservice/error-log
mkdir -p /var/log/nginx/

# for logrotate
# service cron start

echo 'server start'
/svc/web/nginx_lguservice/sbin/nginx -g 'daemon off;'
#/svc/web/nginx_lguservice/sbin
