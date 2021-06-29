import * as mongoose from 'mongoose';

import IPostModel from './IModel';
import PostSchema from './schema';

export const postSchema = new PostSchema(
  {
    _id: String,
  },
  {
    collection: 'post',
    versionKey: false,
  },
);

export const postModel: mongoose.Model<IPostModel> = mongoose.model<IPostModel>(
  'post',
  postSchema,
  'post',
  true,
);
