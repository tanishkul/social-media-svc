import * as mongoose from 'mongoose';

import VersioningRepository from '../../versionable/VersioningRepository';
import IPostModel from '../post/IModel';
import { postModel } from '../post/model';

// @ts-ignore
export default class PostRepository extends VersioningRepository<
  IPostModel,
  mongoose.Model<IPostModel>
> {
  constructor() {
    super(postModel);
  }

  public async getQuery(options: any): Promise<IPostModel[]> {
    console.log('PostRepository - Get query: ', options);
    return super.getAll(options, {});
  }

  public async create(options: any): Promise<IPostModel> {
    console.log('PostRepository - Create: ', options);
    return super.create(options);
  }

  public async update(options: any): Promise<IPostModel> {
    console.log('PostRepository - Update: ', options);
    return super.update(options);
  }

  public async delete(options: any): Promise<IPostModel> {
    console.log('PostRepository - Delete: ', options);
    return super.remove(options.id);
  }
}
