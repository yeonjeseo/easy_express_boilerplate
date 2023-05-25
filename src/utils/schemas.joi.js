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

const sampleShcema = Joi.object().keys({
  phone: Joi.object().keys({
    mobile: Joi.object().keys({
      countryCode: Joi.number().required(),
      number: Joi.string().required(),
    })
  }),
 email: Joi.when('phone', {
   is: Joi.object().exist(),
   then: Joi.forbidden(),
   otherwise: Joi.string().required()
 }) 
});
