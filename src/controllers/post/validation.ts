import { RequestParameter } from '../../libs/constants';
import { checkType, isValidObjectId } from '../../libs/utilities';

const createPost = {
  description: {
    custom: {
      errorMessage: 'description should be string!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    in: [RequestParameter.BODY],
  },
  title: {
    custom: {
      errorMessage: 'title is invalid!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide title!',
    },
    in: [RequestParameter.BODY],
  },
};

const getAllPost = {};

const getPost = {
  id: {
    custom: {
      errorMessage: 'BAD_ID_FORMAT',
      options: (id: string) => isValidObjectId(id),
    },
    exists: {
      errorMessage: 'Please Provide id',
    },
    in: [RequestParameter.PARAMS],
  },
};

const updatePost = {
  description: {
    custom: {
      errorMessage: 'description should be string!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    in: [RequestParameter.BODY],
  },
  id: {
    custom: {
      errorMessage: 'BAD_ID_FORMAT',
      options: (id: string) => isValidObjectId(id),
    },
    exists: {
      errorMessage: 'Please Provide id',
    },
    in: [RequestParameter.PARAMS],
  },
  title: {
    custom: {
      errorMessage: 'title is invalid!',
      options: (value: string) => {
        return checkType(value, 'string');
      },
    },
    exists: {
      errorMessage: 'Please Provide title!',
    },
    in: [RequestParameter.BODY],
  },
};

const deletePost = {
  id: {
    custom: {
      errorMessage: 'BAD_ID_FORMAT',
      options: (id: string) => isValidObjectId(id),
    },
    exists: {
      errorMessage: 'Please Provide id',
    },
    in: [RequestParameter.PARAMS],
  },
};

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
});
