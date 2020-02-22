import config from 'config';
import { NotificationClient } from '../grpc-services/notification_grpc_pb';
import getNotificationClientCredentials from './getNotificationClientCredentials';

const client = new NotificationClient(config.get('notificationUrl'), getNotificationClientCredentials());

export default client;
