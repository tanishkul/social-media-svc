import IVersionableDocument from '../../versionable/IVersionableDocument';

export default interface IPostModel extends IVersionableDocument {
  userId: string;
  title: string;
  image: any;
  description: string;
}
