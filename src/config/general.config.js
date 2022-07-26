import 'dotenv/config';

const envVars = process.env;
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
