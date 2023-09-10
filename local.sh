#!/bin/sh
npm run build
docker-compose down
docker-compose up --build