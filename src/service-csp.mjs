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
        default: true,
        receive: async report => {
          this.info(JSON.stringify(report));
        }
      }
    };
  }
}

export default ServiceCSP;
