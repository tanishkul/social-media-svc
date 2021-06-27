import * as _ from 'lodash';
import * as mongoose from 'mongoose';

export const generateObjectId = () => mongoose.Types.ObjectId();

export function leanObject<D extends any>(doc: D): D {
  try {
    if (doc && doc._id) {
      doc.id = doc._id;
      delete doc._id;
      delete doc.__v;
    }

    return doc;
  } catch (err) {
    return err;
  }
}

export function getEnumKeyOrValue(enums: any, enumKeyOrValue: any): string {
  return enums[enumKeyOrValue];
}

export const checkType = (value: any, type: string): boolean => {
  if (typeof value === type) {
    return true;
  }
  return false;
};
