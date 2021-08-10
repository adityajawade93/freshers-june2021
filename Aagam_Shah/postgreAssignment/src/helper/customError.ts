export class CError extends Error {
    status: number;
    constructor(message: string, status = 404) {
      super(message);
      this.message = message;
      this.status = status;
    }
  }