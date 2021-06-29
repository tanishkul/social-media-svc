import * as mongoose from 'mongoose';

import { generateObjectId, leanObject } from '../../libs/utilities';
import { IQueryBaseCreate, IQueryBaseUpdate } from '../entities';

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

  protected async update(options: IQueryBaseUpdate): Promise<D> {
    try {
      console.log('BaseRepository - Update:', JSON.stringify(options));

      console.log('Searching for previous valid object...', options.originalId);

      console.log('Invalidating previous valid object...');
      const invalidData = await this.invalidate(options.originalId);
      if (invalidData) {
        const newInstance = Object.assign({}, invalidData, options);
        newInstance['_id'] = generateObjectId();
        delete newInstance.id;
        delete newInstance.updatedAt;
        delete newInstance.deletedAt;

        console.log('Created new object...', newInstance);

        const result = await this.modelType.create({
          ...newInstance,
        });

        return this.assignId(leanObject(result.toObject()));
      }
    } catch (error) {
      throw error;
    }
  }

  protected async remove(
    id: string,
  ): Promise<D> {
    const result = await this.invalidate(id);
    if (result) {
      return result;
    }
    return undefined;
  }

  protected async invalidate(id: string): Promise<D> {
    const now = new Date();
    console.log('invalidate document', id);

    const criteria = {
      deletedAt: undefined,
      originalId: {
        $in: id,
      },
    };
    return await this.modelType
    // @ts-ignore
      .findOneAndUpdate(criteria, { deletedAt: now }, { new: true })
      .lean();
  }

  protected assignId(result: any) {
    if (result && result.originalId && result.id !== result.originalId) {
      result.id = result.originalId;
    }
    return result;
  }
}
