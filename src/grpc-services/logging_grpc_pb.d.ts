// package: logging
// file: logging.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as logging_pb from "./logging_pb";

interface ILoggingServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    logInfo: ILoggingServiceService_ILogInfo;
}

interface ILoggingServiceService_ILogInfo extends grpc.MethodDefinition<logging_pb.Log, logging_pb.Empty> {
    path: string; // "/logging.LoggingService/LogInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<logging_pb.Log>;
    requestDeserialize: grpc.deserialize<logging_pb.Log>;
    responseSerialize: grpc.serialize<logging_pb.Empty>;
    responseDeserialize: grpc.deserialize<logging_pb.Empty>;
}

export const LoggingServiceService: ILoggingServiceService;

export interface ILoggingServiceServer {
    logInfo: grpc.handleUnaryCall<logging_pb.Log, logging_pb.Empty>;
}

export interface ILoggingServiceClient {
    logInfo(request: logging_pb.Log, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
    logInfo(request: logging_pb.Log, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
    logInfo(request: logging_pb.Log, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class LoggingServiceClient extends grpc.Client implements ILoggingServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public logInfo(request: logging_pb.Log, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
    public logInfo(request: logging_pb.Log, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
    public logInfo(request: logging_pb.Log, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: logging_pb.Empty) => void): grpc.ClientUnaryCall;
}
