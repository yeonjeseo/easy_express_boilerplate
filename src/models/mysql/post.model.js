export default (sequelize, DataTypes) =>
  sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        AutoIncrement: true,
        comment: '주 식별자',
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '게시물 주인 id',
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '게시물 제목',
      },
    },
    { sequelize, tableName: 'posts', timestamps: true, charset: 'utf8', collation: 'utf8_general_ci' }
  );
