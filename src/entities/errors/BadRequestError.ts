import { StatusCodes } from '../../libs/constants';
import APIError from './APIError';
import IError from './IError';

export default class BadRequestError extends APIError {
  constructor(errors: IError[]) {
    super(errors[0] ? errors[0].msg : 'Bad Request', StatusCodes.BAD_REQUEST, errors, BadRequestError.name);
  }
}
