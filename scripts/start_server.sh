#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/app/
pm2 start pm2.config.js
