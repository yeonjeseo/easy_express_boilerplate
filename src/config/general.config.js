import 'dotenv/config';
import { NODE_ENV_schema } from '../utils/validation.js';

const envVars = process.env;

/**
 * NODE_ENV 는 스크립트로 입력 받음
 * 세 개의 값 중 하나만 허용
 */
NODE_ENV_schema.validateAsync(envVars.NODE_ENV)
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  SALT_ROUND: envVars.SALT_ROUND,
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
