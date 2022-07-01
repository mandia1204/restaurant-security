import fs from 'fs';
import grpc from 'grpc';
import path from 'path';
import config from 'config';

const baseDir: string = config.get('baseDir');

const getNotificationClientCredentials = () => {
  const certPath = path.join(baseDir, 'cert');
  const caCert = fs.readFileSync(path.join(certPath, 'ca.crt'));
  const clientKey = fs.readFileSync(path.join(certPath, 'client.key'));
  const clientCert = fs.readFileSync(path.join(certPath, 'client.crt'));

  return grpc.credentials.createSsl(caCert, clientKey, clientCert);
};

export default getNotificationClientCredentials;
