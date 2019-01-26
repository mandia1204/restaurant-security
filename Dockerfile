FROM node:7.8.0

WORKDIR /var/www

# Install app dependencies
COPY ./src/package.json /var/www

RUN npm install

EXPOSE 3001
CMD [ "npm", "start" ]
