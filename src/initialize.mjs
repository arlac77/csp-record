
import {
  ServiceHTTP,
  CTXBodyParamInterceptor
} from "@kronos-integration/service-http";

export default async function initialize(sp) {
  sp.registerFactories([
    ServiceHTTP,
    CTXBodyParamInterceptor
  ]);

  const bodyParamInterceptor = new CTXBodyParamInterceptor();

  const POST = {
    method: "POST",
    interceptors: bodyParamInterceptor
  };

  await sp.declareServices({
    http: {
      type: ServiceHTTP,
      autostart: true,
      endpoints: {
        "/upload": {
          ...POST,
          connected: "service(csp).upload"
        }
      }
    },
    health: {}
  });
}
