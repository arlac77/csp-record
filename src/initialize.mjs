import {
  ServiceHTTP,
  CTXBodyParamInterceptor
} from "@kronos-integration/service-http";
import { ServiceCSP } from "./service-csp.mjs";

export default async function initialize(sp) {
  const POST = {
    method: "POST",
    interceptors: new CTXBodyParamInterceptor()
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
