import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import { upload } from '../../middlewares/uploadImage';
import userController from './UserController';
import validation from './validation';

const router = Router();

router.route('/').post(
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        next({ message: err, type: 'BadRequestError' });
      }
      next();
    });
  },
  ...validationHandler(validation.signUp),
  userController.signUp,
);

router
  .route('/login')
  .post(...validationHandler(validation.login), userController.login);

export default router;
