// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  database: {
    userName: process.env.SECURITY_DB_USER,
    password: process.env.SECURITY_DB_PASSWORD,
    dbName: 'restaurant_security',
    port: 27017,
    hostName: 'security-db',
  },
  loggingUrl: 'logging-app:5051',
  baseDir: path.join(__dirname, '..'),
  auth: {
    issuer: 'security.mattcompany.com',
    audience: 'restaurant.mattcompany.com',
    accessToken: {
      jwtSecret: process.env.SECURITY_ACCESS_TOKEN_SECRET,
      exp: { amount: 3, unit: 'hour' },
    },
    refreshToken: {
      jwtSecret: process.env.SECURITY_REFRESH_TOKEN_SECRET,
      exp: { amount: 1, unit: 'month' },
    },
    jwtSession: {
      session: false,
    },
  },
};
