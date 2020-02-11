import { initTracer as initJaegerTracer, TracingConfig, TracingOptions, JaegerTracer, ZipkinB3TextMapCodec } from 'jaeger-client';
import { FORMAT_HTTP_HEADERS } from 'opentracing';

let tracer:JaegerTracer;
export function initTracer(serviceName: string): JaegerTracer {
  const config: TracingConfig = {
    serviceName,
    sampler: {
      type: 'const',
      param: 1,
    },
    reporter: {
      logSpans: true,
      agentHost: 'jaeger-agent.istio-system',
      agentPort: 6832,
    },
  };
  const options: TracingOptions = {
    logger: {
      info: (msg) => {
        console.log('INFO ', msg); //eslint-disable-line
      },
      error: (msg) => {
        console.log('ERROR', msg); //eslint-disable-line
      },
    },
  };

  tracer = initJaegerTracer(config, options);
  const codec = new ZipkinB3TextMapCodec({ urlEncoding: true });
  tracer.registerInjector(FORMAT_HTTP_HEADERS, codec);
  tracer.registerExtractor(FORMAT_HTTP_HEADERS, codec);
  return tracer;
}

export function getTracer() {
  return tracer;
}
