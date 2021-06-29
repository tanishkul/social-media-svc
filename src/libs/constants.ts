export const SWAGGER_URL = '/api-docs';
export const API_PREFIX = '/api';

export const ABOUT = {
  description: 'Social Media Service API with Swagger',
  in: 'Headers',
  name: 'Authorization',
  title: 'Social-Media-svc API',
  type: 'apiKey',
};

// Listing of Environments
export enum EnvVars {
  TEST = 'test',
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}

export enum SUCCESS_MSG {
  CREATE = 'Post created successfully',
  REGISTER_USER = 'User registered successfully',
  LOGIN_USER = 'User loggedIn successfully',
  UPDATE = 'Post updated successfully',
  DELETE = 'Post deleted successfully',
  GET = 'Post fetched successfully',
}

export enum RequestParameter {
  PARAMS = 'params',
  BODY = 'body',
  QUERY = 'query',
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export declare type Nullable<T> = T | null;
