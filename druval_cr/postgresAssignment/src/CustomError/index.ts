/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class CError extends Error {
  status: number;
  constructor(message: string, status = 404) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
