#!/bin/bash
echo start!

sudo rm /etc/nginx/sites-enabled/mbti.conf
sudo ln -s /etc/nginx/sites-available/mbti.conf /etc/nginx/sites-enabled/mbti.conf

# permision error
sudo chmod -R 777 /root/mbti_frontend/

sudo nginx
sudo service nginx status

echo end!

tail -f /var/log/nginx/error.log