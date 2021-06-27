import VersionableSchema from '../../versionable/VersionableSchema';

export default class UserSchema extends VersionableSchema {
  constructor(options: any, collections: any) {
    const baseSchema = {
      ...options,
      email: {
        required: true,
        type: String,
      },
      image: {
        contentType: String,
        data: Buffer,
        id: String,
      },
      name: {
        required: true,
        type: String,
      },
      password: {
        required: true,
        type: String,
      },
    };
    super(baseSchema, collections);
  }
}
