import 'dotenv/config';
import { NODE_ENV_schema } from '../utils/validation.js';

const envVars = process.env;

NODE_ENV_schema.validateAsync(envVars.NODE_ENV)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// console.log(envVars);

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  sequelize: {
    local: {
      username: envVars.LOCAL_DB_USERNAME,
      password: envVars.LOCAL_DB_PASSWORD,
      database: envVars.LOCAL_DB_DATABASE,
      host: envVars.LOCAL_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00',
    },
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
