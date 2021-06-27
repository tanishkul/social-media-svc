import * as mongoose from 'mongoose';

import IUserModel from './IModel';
import UserSchema from './schema';

export const userSchema = new UserSchema(
  {
    _id: String,
  },
  {
    collection: 'user',
    versionKey: false,
  },
);

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'user',
  userSchema,
  'user',
  true,
);
