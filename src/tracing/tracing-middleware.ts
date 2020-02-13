import { FORMAT_HTTP_HEADERS, SpanOptions, Tags, Span, globalTracer } from 'opentracing';
import { Request, Response, NextFunction } from 'express';
import url from 'url';

const finishSpan = (res: Response, span: Span) => () => {
  span.setTag(Tags.HTTP_STATUS_CODE, res.statusCode);
  if (res.statusCode >= 500) {
    span.setTag(Tags.ERROR, true);
    span.setTag(Tags.SAMPLING_PRIORITY, 1);
    span.log({ event: 'error', message: res.statusMessage });
  }
  span.log({ event: 'request_end' });
  span.finish();
};

const tracingMiddleware = (options = {}) => (req: Request, res: Response, next: NextFunction) => {
  const tracer = globalTracer();
  const spanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
  const spanOptions: SpanOptions = { };
  if (spanContext) {
    spanOptions.childOf = spanContext;
  }
  const { pathname } = url.parse(req.url);
  if (!pathname) {
    throw new Error('request without url');
  }
  const span = tracer.startSpan(pathname, spanOptions);
  span.log({ event: 'request_received' });
  span.log(req.headers);
  if (req.get('x-b3-traceid')) {
    span.setTag('x_b3_traceid', req.get('x-b3-traceid'));
  }
  span.setTag(Tags.HTTP_METHOD, req.method);
  span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_SERVER);
  span.setTag(Tags.HTTP_URL, req.url);

  Object.assign(req, { span });
  res.on('finish', finishSpan(res, span));

  next();
};

export default tracingMiddleware;
