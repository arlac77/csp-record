import { Service } from "@kronos-integration/service";

export class ServiceCSP extends Service {
  /**
   * @return {string} 'csp'
   */
  static get name() {
    return "csp";
  }

  static get endpoints() {
    return {
      ...super.endpoints,
      upload: {
        receive: "upload"
      }
    };
  }

  async upload(report) {
    this.info(JSON.stringify(report));
  }
}
