import grpc from 'grpc';
import config from 'config';
import { LoggingServiceClient } from '../grpc-services/logging_grpc_pb';

const client = new LoggingServiceClient(config.get('loggingUrl'), grpc.credentials.createInsecure());

export default client;
