// package: notification
// file: notification.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class NotificationRequest extends jspb.Message { 
    getTemplateCode(): string;
    setTemplateCode(value: string): void;

    clearParametersList(): void;
    getParametersList(): Array<Parameter>;
    setParametersList(value: Array<Parameter>): void;
    addParameters(value?: Parameter, index?: number): Parameter;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotificationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NotificationRequest): NotificationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotificationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotificationRequest;
    static deserializeBinaryFromReader(message: NotificationRequest, reader: jspb.BinaryReader): NotificationRequest;
}

export namespace NotificationRequest {
    export type AsObject = {
        templateCode: string,
        parametersList: Array<Parameter.AsObject>,
    }
}

export class NotificationResponse extends jspb.Message { 
    getResult(): string;
    setResult(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NotificationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NotificationResponse): NotificationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NotificationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NotificationResponse;
    static deserializeBinaryFromReader(message: NotificationResponse, reader: jspb.BinaryReader): NotificationResponse;
}

export namespace NotificationResponse {
    export type AsObject = {
        result: string,
    }
}

export class Parameter extends jspb.Message { 
    getParameterName(): string;
    setParameterName(value: string): void;

    getParameterValue(): string;
    setParameterValue(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Parameter.AsObject;
    static toObject(includeInstance: boolean, msg: Parameter): Parameter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Parameter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Parameter;
    static deserializeBinaryFromReader(message: Parameter, reader: jspb.BinaryReader): Parameter;
}

export namespace Parameter {
    export type AsObject = {
        parameterName: string,
        parameterValue: string,
    }
}
