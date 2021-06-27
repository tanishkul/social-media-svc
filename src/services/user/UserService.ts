import UserRepository from '../../repositories/business/user/repository';

class UserService {
  private userRepository: UserRepository;

  public constructor() {
    this.userRepository = new UserRepository();
  }

  public async findUser(query: any) {
    console.log('findUser:::', query);
    const user = await this.userRepository.getQuery(query);
    return user;
  }

  public async createUser(query: any) {
    console.log('createUser:::', query);
    const user = await this.userRepository.create(query);
    return user;
  }
}

export default UserService;
