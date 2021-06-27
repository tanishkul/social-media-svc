import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
  constructor(options: any, collections: any) {
    const versionedOptions = Object.assign(
      {
        deletedAt: {
          required: false,
          type: Date,
        },
        originalId: {
          required: true,
          type: String,
        },
      },
      options,
    );
    super(versionedOptions, collections);
  }
}

export default VersionableSchema;
