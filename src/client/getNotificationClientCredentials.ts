import fs from 'fs';
import grpc from 'grpc';
import path from 'path';

const getNotificationClientCredentials = () => {
  const certPath = path.join(__dirname, '../cert');
  const caCert = fs.readFileSync(path.join(certPath, 'ca.crt'));
  const clientKey = fs.readFileSync(path.join(certPath, 'client.key'));
  const clientCert = fs.readFileSync(path.join(certPath, 'client.crt'));

  return grpc.credentials.createSsl(caCert, clientKey, clientCert);
};

export default getNotificationClientCredentials;
