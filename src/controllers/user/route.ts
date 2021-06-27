import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import { upload } from '../../middlewares/upload';
import userController from './UserController';
import validation from './validation';

const router = Router();

router
  .route('/')
  .post(
    upload,
    ...validationHandler(validation.signUp),
    userController.signUp,
  );

router
  .route('/login')
  .post(
    // upload,
    ...validationHandler(validation.login),
    userController.login,
  );

export default router;
