import Sequelize, { QueryTypes } from 'sequelize';
import config from '../../config/general.config.js';
import _User from './users.model.js';
import _Post from './post.model.js';

const env = config.NODE_ENV;
const sequelizeConfig = config.sequelize[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
const { DataTypes } = Sequelize;

const User = _User(sequelize, DataTypes);
const Post = _Post(sequelize, DataTypes);

User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

sequelize.sync({ alter: true }).then(() => console.log('MySQL connected! 🐬'));

const db = {};

db.sequelize = sequelize;
db.QueryTypes = QueryTypes;
db.Users = User;
db.Posts = Post;

export default db;
