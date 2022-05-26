module.exports = {
  database: {
    userName: process.env.SECURITY_DB_USER,
    password: process.env.SECURITY_DB_PASSWORD,
    dbName: 'restaurant_security',
    port: 27017,
    hostName: 'security-db',
  },
  loggingUrl: 'logging:5051',
  notificationUrl: 'notification:5052',
  baseDir: process.env.PWD,
  tracingEnabled: false,
  notificationEnabled: false,
  cacheEnabled: false,
  redis: {
    host: 'security-app-cache',
    port: 6379,
  },
  auth: {
    useRsa: true,
    issuer: 'security.mattcompany.com',
    audience: 'restaurant.mattcompany.com',
    accessToken: {
      jwtSecret: process.env.SECURITY_ACCESS_TOKEN_SECRET,
      exp: { amount: 30, unit: 'minutes' },
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
