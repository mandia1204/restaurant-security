import config from 'config';
import { NotificationClient } from '../grpc-services/notification_grpc_pb';
import getNotificationClientCredentials from './getNotificationClientCredentials';
import Logger from '../util/logger';
import DebugNamespaces from '../util/debugNameSpaces';

const logger = Logger(DebugNamespaces.grpc);
logger.info(`connecting to notification service, url: ${config.get('notificationUrl')}`);
const client = new NotificationClient(config.get('notificationUrl'), getNotificationClientCredentials());

export default client;
