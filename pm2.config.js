module.exports = {
  apps: [{
    name: 'security-app',
    script: './securityApp.js',
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production',
      DEBUG: 'app:*',
      SECURITY_DB_USER: 'matt',
      SECURITY_DB_PASSWORD: '1234',
      SECURITY_ACCESS_TOKEN_SECRET: 'mysecret123',
      SECURITY_REFRESH_TOKEN_SECRET: 'mysecret324',
    },
  }],
};
