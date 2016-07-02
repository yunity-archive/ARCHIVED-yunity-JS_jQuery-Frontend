#!/bin/bash

set -e

HOST=yuca.yunity.org

mkdir public
cp -R assets images pages index.html public/

echo "sending [public] to [$HOST]"

rsync -av --delete public/ deploy@$HOST:public/
