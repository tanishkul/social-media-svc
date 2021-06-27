import { StatusCodes } from '../../libs/constants';
import IResponse, { IData, IMetadata } from './IResponse';

export default class InternalServerErrorResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  // tslint:disable-next-line:no-null-keyword
  constructor(data: IData = null, message: string = '') {
    this.data = data;
    this.metadata = {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      timestamp: new Date(),
    };
  }
}
