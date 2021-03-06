// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  timeout: 5 * 60 * 1000,
  refreshTokenTimeout: 120000,
  webSocketHost: {
    get() {
      if (window && window.location.host.includes('localhost')) {
        return 'ws://localhost:8080'
      }
      return 'ws://192.168.1.20:8080'
    },
    toString() {
      return this.get();
    }
  },
  backendHost: {
    get() {
      if (window && window.location.host.includes('localhost')) {
        return 'http://localhost:8080'
      }
      return 'http://192.168.1.20:8080'
    },
    toString() {
      return this.get();
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
