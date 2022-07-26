import Joi from 'joi';

export const NODE_ENV_schema = Joi.string().valid('local', 'development', 'production').required();
