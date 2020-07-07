#!/bin/bash
export NODE_ENV=production
export DEBUG=app:*
export SECURITY_DB_USER=matt
export SECURITY_DB_PASSWORD=1234
export SECURITY_ACCESS_TOKEN_SECRET=mysecret123
export SECURITY_REFRESH_TOKEN_SECRET=mysecret324
cd /home/ec2-user/app/
whoami
npm run serve
