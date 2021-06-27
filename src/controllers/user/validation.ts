import { RequestParameter } from '../../libs/constants';
import { checkType } from '../../libs/utilities';

const signUp = {
  email: {
    custom: {
      errorMessage: 'email is invalid!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide email!',
    },
    in: [RequestParameter.BODY],
    isEmail: true,
  },
  name: {
    custom: {
      errorMessage: 'name should be string!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide name!',
    },
    in: [RequestParameter.BODY],
  },
  password: {
    custom: {
      errorMessage: 'password should be string!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide password!',
    },
    in: [RequestParameter.BODY],
  },
};

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  signUp,
});
