import _Users from './users.model.js';
import _Posts from './post.model.js';

const initModel = (sequelize, DataTypes) => {
  const Users = _Users(sequelize, DataTypes);
  const Posts = _Posts(sequelize, DataTypes);

  Users.hasMany(Posts, { foreignKey: 'user_id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  Posts.belongsTo(Users, { foreignKey: 'user_id', sourceKey: 'id' });

  return { sequelize, Users, Posts };
};

export default initModel;
