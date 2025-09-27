#!/bin/bash

rm -rf .build

# Build database first
mkdir -p .build/database-temp
npx tsc --project tsconfig.database.json
rsync -av --exclude='*.ts' database/ .build/database-temp/
mv .build/database-temp .build/database

# Then build src (which can now import from .build/database)
npx tsc --project tsconfig.json

chmod 755 .build/cli.js
chmod 755 .build/server.js

cp -r templates .build/templates