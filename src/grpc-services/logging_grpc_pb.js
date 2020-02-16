// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var logging_pb = require('./logging_pb.js');

function serialize_logging_Empty(arg) {
  if (!(arg instanceof logging_pb.Empty)) {
    throw new Error('Expected argument of type logging.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_logging_Empty(buffer_arg) {
  return logging_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_logging_Log(arg) {
  if (!(arg instanceof logging_pb.Log)) {
    throw new Error('Expected argument of type logging.Log');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_logging_Log(buffer_arg) {
  return logging_pb.Log.deserializeBinary(new Uint8Array(buffer_arg));
}


var LoggingServiceService = exports.LoggingServiceService = {
  logInfo: {
    path: '/logging.LoggingService/LogInfo',
    requestStream: false,
    responseStream: false,
    requestType: logging_pb.Log,
    responseType: logging_pb.Empty,
    requestSerialize: serialize_logging_Log,
    requestDeserialize: deserialize_logging_Log,
    responseSerialize: serialize_logging_Empty,
    responseDeserialize: deserialize_logging_Empty,
  },
};

exports.LoggingServiceClient = grpc.makeGenericClientConstructor(LoggingServiceService);
