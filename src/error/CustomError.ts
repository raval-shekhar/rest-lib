export interface ErrorSerializer {
  statusCode: number;
  message: string;
  errors?: any[];
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string | undefined) {
    super(message);
    Object.setPrototypeOf(this, CustomError);
  }
  abstract serializeError(): ErrorSerializer;
}