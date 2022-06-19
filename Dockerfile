FROM node:16.15.1-buster-slim AS base
WORKDIR /var/www
COPY ./package*.json /var/www/
RUN npm install
COPY . .

FROM base as tester
WORKDIR /var/www
RUN npm run test && npm run tap-to-junit

FROM base AS builder
WORKDIR /var/www
ENV NODE_ENV=production
RUN npm run build

FROM node:16.15.1-alpine AS final
WORKDIR /var/www
COPY --from=base /var/www/package*.json ./
RUN npm install --production
COPY --from=builder /var/www/dist .
COPY --from=tester /var/www/report ./report
# these can be replaced by configmap/secret on deployment
ENV DEBUG=app:* NODE_ENV=production SECURITY_ACCESS_TOKEN_SECRET=abc SECURITY_REFRESH_TOKEN_SECRET=abc
EXPOSE 3001
CMD [ "npm", "run", "serve" ]
