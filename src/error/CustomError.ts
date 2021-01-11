export interface ErrorSerializer {
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