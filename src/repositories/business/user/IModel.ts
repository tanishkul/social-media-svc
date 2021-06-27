import IVersionableDocument from '../../versionable/IVersionableDocument';

export default interface IUserModel extends IVersionableDocument {
  email: string;
  password: string;
  image: string;
  name: string;
}
