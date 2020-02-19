import { Span, globalTracer, FORMAT_HTTP_HEADERS } from 'opentracing';
import grpc from 'grpc';
import { Request } from 'express';

const INCOMING_HEADERS = ['x-request-id', 'x-b3-flags', 'x-ot-span-context'];

export const addJaegerHeaders = (headers: Record<string, string>, meta: grpc.Metadata) => {
  Object.keys(headers).forEach((k) => {
    meta.add(k, headers[k]);
  });
};

export const getForwardHeaders = (span: Span | undefined, req: Request) => {
  const headers: Record<string, string> = {};
  const tracer = globalTracer();
  if (span) {
    tracer.inject(span.context(), FORMAT_HTTP_HEADERS, headers);
  }

  INCOMING_HEADERS.forEach((h) => {
    const header = req.get(h);
    if (header) {
      headers[h] = header;
    }
  });
  return headers;
};
