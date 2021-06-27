import * as mongoose from 'mongoose';

import VersioningRepository from '../../versionable/VersioningRepository';
import IUserModel from './IModel';
import { userModel } from './model';

export default class UserRepository extends VersioningRepository<
  IUserModel,
  mongoose.Model<IUserModel>
> {
  constructor() {
    super(userModel);
  }

  public async getQuery(options: any): Promise<IUserModel[]> {
    console.log('User - Get query: ', options);
    return super.getAll(options, {});
  }

  public async create(options: any): Promise<IUserModel> {
    console.log('UserRepository - Create: ');
    return super.create(options);
  }
}
