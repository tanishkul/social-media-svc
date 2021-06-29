import { NextFunction, Request, Response } from 'express';

import { SUCCESS_MSG } from '../../libs/constants';
import successHandler from '../../middlewares/successHandler';
import { PostService } from '../../services';

class PostController {
  public static getInstance() {
    if (!PostController.instance) {
      PostController.instance = new PostController();
    }

    return PostController.instance;
  }
  private static instance: PostController;
  private postService: PostService;

  private constructor() {
    this.postService = new PostService();
  }

  public async create(req: any, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    const file = req.file;
    const { id } = req.user;

    try {
      const post = await PostController.getInstance().postService.createPost({
        description,
        image: file,
        title,
        userId: id,
      });

      console.log('Post created------', post);

      return res.send(successHandler(SUCCESS_MSG.CREATE, post));
    } catch (err) {
      next(err);
    }
  }

  public async getAll(req: any, res: Response, next: NextFunction) {
    try {
      const post = await PostController.getInstance().postService.findPost({});

      console.log('get Post------', post);
      if (!post.length) {
        return res.send(successHandler('No post available', post));
      }
      return res.send(successHandler(SUCCESS_MSG.GET, post));
    } catch (err) {
      next(err);
    }
  }

  public async getPostById(req: any, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = await PostController.getInstance().postService.findPost({
        originalId: id,
      });

      console.log('Check if post exists----', post);
      if (!post.length) {
        throw {
          message: 'No post exist with this id!',
          type: 'BadRequestError',
        };
      }

      return res.send(successHandler(SUCCESS_MSG.GET, post));
    } catch (err) {
      next(err);
    }
  }

  public async update(req: any, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    const file = req.file;
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
      const dataToUpdate = JSON.parse(
        JSON.stringify({
          description,
          image: file,
          title,
        }),
      );

      const getPost = await PostController.getInstance().postService.findPost({
        originalId: id,
      });

      if (!getPost) {
        throw {
          message: 'No post exist with this id!',
          type: 'BadRequestError',
        };
      }

      if (getPost[0].userId !== userId) {
        throw {
          message: 'Not authorized to update this post!',
          type: 'UnauthorizedError',
        };
      }
      console.log('Update post----', id, dataToUpdate);
      const post = await PostController.getInstance().postService.updatePost({
        originalId: id,
        ...dataToUpdate,
      });

      return res.send(successHandler(SUCCESS_MSG.UPDATE, post));
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
      const getPost = await PostController.getInstance().postService.findPost({
        originalId: id,
      });

      if (!getPost) {
        throw {
          message: 'No post exist with this id!',
          type: 'BadRequestError',
        };
      }

      if (getPost[0].userId !== userId) {
        throw {
          message: 'Not authorized to delete this post!',
          type: 'UnauthorizedError',
        };
      }
      const post = await PostController.getInstance().postService.deletePost({
        id,
      });

      console.log('Check if post exists----', post);

      return res.send(successHandler(SUCCESS_MSG.DELETE, post));
    } catch (err) {
      next(err);
    }
  }
}

export default PostController.getInstance();
