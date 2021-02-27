import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { ValidationError } from '../error/ValidationError';
import Pick from '../utils/pick';

export interface ValidationSchema {
  body?: any;
  query?: any;
  params?: any;
}
export const Validate = (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = Pick(schema, ['params', 'query', 'body']);
  const object = Pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    throw new ValidationError(error);
  }
  Object.assign(req, value);
  return next();
}