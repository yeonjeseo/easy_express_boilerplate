import Sequelize, { QueryTypes } from 'sequelize';
import config from '../../config/general.config.js';
import User from './users.model.js';

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

const db = {};

db.sequelize = sequelize;
db.QueryTypes = QueryTypes;
db.Users = User(sequelize, DataTypes);

export default db;
