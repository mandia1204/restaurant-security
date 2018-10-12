import config from 'config';

const getConnectionString = () => {
  const db = config.get('database');

  const {
    userName, password, port, dbName, hostName,
  } = db;

  return `mongodb://${userName}:${password}@${hostName}:${port}/${dbName}`;
};

export default getConnectionString;
