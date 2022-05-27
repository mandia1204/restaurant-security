// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  database: {
    userName: process.env.SECURITY_DB_USER,
    password: process.env.SECURITY_DB_PASSWORD,
    dbName: 'restaurant_security',
    port: 27017,
    hostName: 'localhost',
  },
  loggingUrl: 'logging:5051',
  notificationUrl: 'notification:5052',
  baseDir: path.join(__dirname, '..'),
  tracingEnabled: false,
  notificationEnabled: false,
  cacheEnabled: false,
  redis: {
    host: 'security-app-cache',
    port: 6379,
  },
  auth: {
    useRsa: true,
    useKms: true,
    kmsId: process.env.KMS_ID,
    issuer: 'security.mattcompany.com',
    audience: ['restaurant.mattcompany.com', 'lambda-authorizer.com'],
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
