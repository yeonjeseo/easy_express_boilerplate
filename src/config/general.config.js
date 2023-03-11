import 'dotenv/config';
import { NODE_ENV_schema } from '../utils/schemas.joi.js';

const envVars = process.env;

/**
 * NODE_ENV 는 스크립트로 입력 받음
 * 세 개의 값 중 하나만 허용
 */
NODE_ENV_schema.validateAsync(envVars.NODE_ENV)
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    console.log(process.env.NODE_ENV);
    process.exit();
  });

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  SALT_ROUND: envVars.SALT_ROUND,
  NAVER_APP_ID: envVars.NAVER_APP_ID,
  NAVER_APP_SECRET: envVars.NAVER_APP_SECRET,
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
    development: {
      username: envVars.DEV_DB_USERNAME,
      password: envVars.DEV_DB_PASSWORD,
      database: envVars.DEV_DB_DATABASE,
      host: envVars.DEV_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00'
    },
    production: {
      username: envVars.PROD_DB_USERNAME,
      password: envVars.PROD_DB_PASSWORD,
      database: envVars.PROD_DB_DATABASE,
      host: envVars.PROD_DB_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00',
    },
  },
  mongoose: {
    local: {},
    development: {},
    production: {},
  },
};

export default config;