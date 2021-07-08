class AppError extends Error {
  status: number;
  isOperational: boolean;
  constructor(message: any, statusCode: any) {
    super(message);
    this.status = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;