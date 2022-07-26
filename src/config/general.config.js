import 'dotenv/config';
import { NODE_ENV_schema } from '../utils/validation.js';
const envVars = process.env;

NODE_ENV_schema.validateAsync(envVars.NODE_ENV)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// console.log(envVars);
const config = {
  env: envVars.NODE_ENV,
  sequelize: {
    local: {},
    development: {},
    production: {},
  },
  mongoose: {
    local: {},
    development: {},
    production: {},
  },
};

export default config;
