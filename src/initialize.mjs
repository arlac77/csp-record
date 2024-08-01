import {
  ServiceHTTP,
  CTXBodyParamInterceptor
} from "@kronos-integration/service-http";
import { ServiceCSP } from "./service-csp.mjs";



/*

{
  "csp-report": {
    "blocked-uri": "http://example.com/css/style.css",
    "disposition": "report",
    "document-uri": "http://example.com/signup.html",
    "effective-directive": "style-src-elem",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-to /_/csp-reports",
    "referrer": "",
    "status-code": 200,
    "violated-directive": "style-src-elem"
  }
}

*/

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
