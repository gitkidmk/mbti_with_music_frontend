#!/bin/bash
set NODE_ENV=production

echo start!

npm run build

# set NODE_ENV=development

docker-compose up --build