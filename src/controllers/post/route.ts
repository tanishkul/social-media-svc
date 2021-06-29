import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/uploadPost';
import postController from './PostController';
import validation from './validation';

const router = Router();

router.route('/').post(
  auth,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        next({ message: err, type: 'BadRequestError' });
      }
      next();
    });
  },
  ...validationHandler(validation.createPost),
  postController.create,
);

router
  .route('/')
  .get(
    auth,
    ...validationHandler(validation.getAllPost),
    postController.getAll,
  );

router
  .route('/:id')
  .get(
    auth,
    ...validationHandler(validation.getPost),
    postController.getPostById,
  );

router.route('/:id').put(
  auth,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        next({ message: err, type: 'BadRequestError' });
      }
      next();
    });
  },
  ...validationHandler(validation.updatePost),
  postController.update,
);

router
  .route('/:id')
  .delete(
    auth,
    ...validationHandler(validation.deletePost),
    postController.delete,
  );

export default router;
