module.exports = {
  database: {
    userName: 'security_user',
    password: '1234',
    dbName: 'restaurant_security',
    port: 27017,
    hostName: 'security-db',
  },
  auth: {
    jwtSecret: 'Th1s1sth3endBeatuf@frieND823762873',
    jwtRefreshSecret: 'NoOneTrustth1sh881%',
    issuer: 'security.mattcompany.com',
    audience: 'restaurant.mattcompany.com',
    jwtSession: {
      session: false,
    },
  },
};
