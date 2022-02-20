#!/bin/bash
echo start!

sudo ln -s /etc/nginx/sites-available/mbti.conf /etc/nginx/sites-enabled/mbti.conf
sudo service nginx start
sudo service nginx status

echo end!

tail -f /dev/null