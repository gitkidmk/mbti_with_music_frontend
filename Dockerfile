FROM dockermkkang/mbti_frontend:0.4

# COPY [hostOS 경로] [컨테이너 경로]
COPY build/. /root/mbti_frontend/
COPY start.sh /

# ADD는 COPY와는 다르게 원격 파일 다운로드 기능 수행

# container에서 생성된 데이터 hostOS /var/lib/docker/volumes에 저장
# VOLUME ["/var/log/nginx/"]

RUN chmod +x /start.sh

CMD ["/start.sh"]