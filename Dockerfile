FROM dockermkkang/mbti_frontend:0.3


# COPY [hostOS 경로] [컨테이너 경로]
COPY build/. /root/test/
COPY start.sh /

# ADD는 COPY와는 다르게 원격 파일 다운로드 기능 수행

RUN chmod +x /start.sh

CMD ["/start.sh"]