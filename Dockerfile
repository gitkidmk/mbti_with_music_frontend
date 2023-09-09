FROM nginx

# COPY [hostOS 경로] [컨테이너 경로]
COPY build/. /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/