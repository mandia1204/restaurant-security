// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var notification_pb = require('./notification_pb.js');

function serialize_notification_NotificationRequest(arg) {
  if (!(arg instanceof notification_pb.NotificationRequest)) {
    throw new Error('Expected argument of type notification.NotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_NotificationRequest(buffer_arg) {
  return notification_pb.NotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notification_NotificationResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationResponse)) {
    throw new Error('Expected argument of type notification.NotificationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_NotificationResponse(buffer_arg) {
  return notification_pb.NotificationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationService = exports.NotificationService = {
  sendNotification: {
    path: '/notification.Notification/SendNotification',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationRequest,
    responseType: notification_pb.NotificationResponse,
    requestSerialize: serialize_notification_NotificationRequest,
    requestDeserialize: deserialize_notification_NotificationRequest,
    responseSerialize: serialize_notification_NotificationResponse,
    responseDeserialize: deserialize_notification_NotificationResponse,
  },
};

exports.NotificationClient = grpc.makeGenericClientConstructor(NotificationService);
