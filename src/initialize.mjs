import {
  ServiceHTTP,
  CTXBodyParamInterceptor
} from "@kronos-integration/service-http";
import { ServiceCSP } from "./service-csp.mjs";

export default async function initialize(sp) {
  const interceptors = new CTXBodyParamInterceptor();
  interceptors.typeDecoders = Object.assign(
    { "application/csp-report": interceptors.typeDecoders["application/json"] },
    interceptors.typeDecoders,
    {}
  );

  const POST = {
    method: "POST",
    interceptors
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
    csp: {
      type: ServiceCSP
    }
  });
}
