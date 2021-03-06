import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { SUCCESS_MSG } from '../../libs/constants';
import successHandler from '../../middlewares/successHandler';
import { UserService } from '../../services';

class UserController {
  public static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }
  private static instance: UserController;
  private userService: UserService;

  private constructor() {
    this.userService = new UserService();
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const file = req.file;
    try {
      const user = await UserController.getInstance().userService.findUser({
        email,
      });
      console.log('Check if user already exists----', user);
      if (user.length) {
        throw {
          message: 'User already exists!',
          type: 'BadRequestError',
        };
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      const userCreated =
        await UserController.getInstance().userService.createUser({
          email,
          image: file,
          name,
          password: passwordHashed,
        });
      console.log('User created------', userCreated);

      return res.send(
        successHandler(SUCCESS_MSG.REGISTER_USER, { name, email, image: file }),
      );
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await UserController.getInstance().userService.findUser({
        email,
      });
      console.log('Check if user exists----', user);
      if (!user.length) {
        throw {
          message: 'User not exist!',
          type: 'BadRequestError',
        };
      }

      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        throw {
          message: 'Incorrect Password!',
          type: 'BadRequestError',
        };
      }

      const payload = {
        user: {
          id: user[0].originalId,
        },
      };

      const token = await jwt.sign(payload, 'randomString', {
        expiresIn: 10000,
      });
      return res.send(
        successHandler(SUCCESS_MSG.LOGIN_USER, {
          email: user[0].email,
          id: user[0].originalId,
          name: user[0].name,
          token,
        }),
      );
    } catch (err) {
      next(err);
    }
  }
}

export default UserController.getInstance();
