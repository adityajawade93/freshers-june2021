/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const handle = (promise: Promise<any>) => {
  return promise.then((data) => [data, undefined]).catch((error) => Promise.resolve([undefined, error]));
};
