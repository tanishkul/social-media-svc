import { checkSchema, validationResult } from 'express-validator/check';

import IError from '../errors/IError';
import UnprocessableError from '../errors/UnprocessableError';

export const validationHandler = (validator) => {
  return [
    checkSchema(validator),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Inside Controller Handler', errors);
        next(new UnprocessableError(errors.array() as IError[]));
      }
      next();
    },
  ];
};
