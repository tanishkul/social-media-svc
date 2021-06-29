import PostRepository from '../../repositories/business/post/repository';

class PostService {
  private postRepository: PostRepository;

  public constructor() {
    this.postRepository = new PostRepository();
  }

  public async findPost(query: any) {
    console.log('findPost:::', query);
    const post = await this.postRepository.getQuery(query);
    return post;
  }

  public async createPost(query: any) {
    console.log('createPost:::', query);
    const post = await this.postRepository.create(query);
    return post;
  }

  public async updatePost(query: any) {
    console.log('updatePost:::', query);
    const post = await this.postRepository.update(query);
    return post;
  }

  public async deletePost(query: any) {
    console.log('deletePost:::', query);
    const post = await this.postRepository.delete(query);
    return post;
  }
}

export default PostService;
