FROM nginx:1.21.6-alpine

# COPY [hostOS 경로] [컨테이너 경로]
COPY build/. /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf