import { NextFunction } from 'express';
import Joi from 'joi';
import { ValidationError } from '../error/ValidationError';
import Pick from '../utils/pick';

export const Validate = (schema) => (req: Request, res: Response, next: NextFunction) => {
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