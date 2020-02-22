// package: notification
// file: notification.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as notification_pb from "./notification_pb";

interface INotificationService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendNotification: INotificationService_ISendNotification;
}

interface INotificationService_ISendNotification extends grpc.MethodDefinition<notification_pb.NotificationRequest, notification_pb.NotificationResponse> {
    path: string; // "/notification.Notification/SendNotification"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<notification_pb.NotificationRequest>;
    requestDeserialize: grpc.deserialize<notification_pb.NotificationRequest>;
    responseSerialize: grpc.serialize<notification_pb.NotificationResponse>;
    responseDeserialize: grpc.deserialize<notification_pb.NotificationResponse>;
}

export const NotificationService: INotificationService;

export interface INotificationServer {
    sendNotification: grpc.handleUnaryCall<notification_pb.NotificationRequest, notification_pb.NotificationResponse>;
}

export interface INotificationClient {
    sendNotification(request: notification_pb.NotificationRequest, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
    sendNotification(request: notification_pb.NotificationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
    sendNotification(request: notification_pb.NotificationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
}

export class NotificationClient extends grpc.Client implements INotificationClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sendNotification(request: notification_pb.NotificationRequest, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
    public sendNotification(request: notification_pb.NotificationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
    public sendNotification(request: notification_pb.NotificationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: notification_pb.NotificationResponse) => void): grpc.ClientUnaryCall;
}
