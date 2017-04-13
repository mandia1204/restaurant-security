const getConnectionString = () => {
  const uname = process.env.SECURITY_DB_USERNAME;
  const pwd = process.env.SECURITY_DB_PASSWORD;
  const port = process.env.SECURITY_DB_PORT;
  const dbname = process.env.SECURITY_DB_DATABASE;
  return `mongodb://${uname}:${pwd}@res_security_db:${port}/${dbname}`;
  //return 'mongodb://localhost:27017/users';
};

export default getConnectionString;
