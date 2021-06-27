import * as mongoose from 'mongoose';

import { generateObjectId, leanObject } from '../../libs/utilities';
import { IQueryBaseCreate } from '../entities';

export default class VersionableRepository<
  D extends mongoose.Document,
  M extends mongoose.Model<D>
> {
  private modelType: M;
  constructor(model: M) {
    this.modelType = model;
  }

  public async create(options: IQueryBaseCreate): Promise<D> {
    console.log('BaseRepository - create:', JSON.stringify(options));
    const id = generateObjectId();

    const result = await this.modelType.create({
      ...options,
      _id: id,
      originalId: id,
    });

    return this.assignId(leanObject(result.toObject()));
  }

  protected async getAll(query: any = {}, options: any = {}): Promise<D[]> {
    options.limit = Number(options.limit) || 0;
    options.skip = Number(options.skip) || 0;
    query.deletedAt = undefined;
    console.log('getAll query: ', query);
    console.log('getAll options: ', options);
    const sort = options.sort || '';
    delete options.sort;
    query.deletedAt = { $exists: false };

    if (sort) {
      return this.modelType
        .find(query, {}, options)
        .sort(sort)
        .collation({ locale: 'en', strength: 1, caseLevel: false })
        .lean();
    }
    return this.modelType
      .find(query, {}, options)
      .collation({ locale: 'en', strength: 1 })
      .lean();
  }

  protected assignId(result: any) {
    if (result && result.originalId && result.id !== result.originalId) {
      result.id = result.originalId;
    }
    return result;
  }
}
