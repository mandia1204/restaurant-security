if (process.env.NODE_ENV === 'development') {
	require('dotenv').config(); //eslint-disable-line
}

const url = `mongodb://${process.env.ADMIN_DB_USER}:${process.env.ADMIN_DB_PASSWORD}@localhost:27017`;
const config = {
  mongodb: {
    url,
    databaseName: 'restaurant_security',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
};

// Return the config as a promise
module.exports = config;
