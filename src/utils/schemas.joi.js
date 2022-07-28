import Joi from 'joi';

export const NODE_ENV_schema = Joi.string().valid('local', 'development', 'production').required();

export const signupSchema = Joi.object().keys({
  account: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginBodySchema = Joi.object().keys({
  account: Joi.string().required(),
  password: Joi.string().required(),
});
