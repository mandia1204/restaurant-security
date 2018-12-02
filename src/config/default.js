module.exports = {
  database: {
    userName: 'security_user',
    password: '1234',
    dbName: 'restaurant_security',
    port: 27017,
    hostName: 'security-db',
  },
  auth: {
    issuer: 'security.mattcompany.com',
    audience: 'restaurant.mattcompany.com',
    accessToken: {
      jwtSecret: 'Th1s1sth3endBeatuf@frieND823762873',
      exp: { amount: 30, unit: 'minutes' },
    },
    refreshToken: {
      jwtSecret: 'NoOneTrustth1sh881%',
      exp: { amount: 1, unit: 'month' },
    },
    jwtSession: {
      session: false,
    },
  },
};
