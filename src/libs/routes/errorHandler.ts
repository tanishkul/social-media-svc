import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableError,
} from '../../entities/errors';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
  UnprocessableResponse,
} from '../../entities/responses';
import IResponse from '../../entities/responses/IResponse';
import { EnvVars, StatusCodes } from '../../libs/constants';

export default function errorHandler(env: string) {
  return (err: any, req: any, res: any, next: any) => {
    if (env !== EnvVars.TEST) {
      console.error(err);
    }

    let response: IResponse;
    switch (err.type) {
      case UnauthorizedError.name:
        response = new UnauthorizedResponse(err.data, err.message);
        break;
      case UnprocessableError.name:
        response = new UnprocessableResponse(err.data, err.message);
        break;
      case BadRequestError.name:
        response = new BadRequestResponse(err.data, err.message);
        break;
      case NotFoundError.name:
        response = new NotFoundResponse(err.message);
        break;
      case InternalServerErrorResponse.name:
      default:
        response = new InternalServerErrorResponse(err.data, err.isPublic ? err.message : StatusCodes[err.status]);
        break;
    }

    res.locals.response = response;
    res.locals.outcome = 'failed';

    res.status(response.metadata.code).json(response);
  };
}
