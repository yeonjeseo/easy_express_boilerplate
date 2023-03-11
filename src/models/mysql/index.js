import Sequelize, { QueryTypes } from 'sequelize';
import config from '../../config/general.config.js';
import _User from './users.model.js';
import _Post from './post.model.js';
import initModel from './associations.js';

const env = config.NODE_ENV;
const sequelizeConfig = config.sequelize[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
const { DataTypes } = Sequelize;

sequelize.sync({ alter: true }).then(() => console.log('MySQL connected! 🐬'));

const db = initModel(sequelize, DataTypes);

db.sequelize = sequelize;
db.QueryTypes = QueryTypes;

export default db;