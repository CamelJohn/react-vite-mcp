#!/bin/bash

rm -rf .build

tsc

chmod 755 .build/cli.js
chmod 755 .build/server.js

cp -r templates .build/templates

mkdir -p .build/database
rsync -av --exclude='*.ts' database/ .build/database/

tsc --project tsconfig.database.json