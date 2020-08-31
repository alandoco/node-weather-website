#!/bin/bash
apt-get update -y

curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh | bash -

bash nodesource_setup.sh

apt-get install nodejs -y

apt-get install build-essential -y

apt install ncdu

node -v | grep v8

npm install -g pm2

pm2 update

export app_root=/usr/cddemo

if [ -d "$app_root" ];then
  rm -rf /usr/cddemo
  mkdir -p /usr/cddemo
else
  mkdir -p /usr/cddemo
fi