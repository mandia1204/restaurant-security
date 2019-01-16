import grpc from 'grpc';
import config from 'config';
import * as protoLoader from '@grpc/proto-loader';

console.log('dir:', config.baseDir); // eslint-disable-line no-console
const PROTO_PATH = `${config.baseDir}/protos/logging.proto`;
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const { LoggingService } = grpc.loadPackageDefinition(packageDefinition).logging;
const client = new LoggingService(config.loggingUrl, grpc.credentials.createInsecure());
export default client;
