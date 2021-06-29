import VersionableSchema from '../../versionable/VersionableSchema';

export default class PostSchema extends VersionableSchema {
  constructor(options: any, collections: any) {
    const baseSchema = {
      ...options,
      description: {
        required: false,
        type: String,
      },
      image: {
        contentType: String,
        data: Buffer,
        id: String,
      },
      title: {
        required: true,
        type: String,
      },
      userId: {
        required: true,
        type: String,
      },
    };
    super(baseSchema, collections);
  }
}
