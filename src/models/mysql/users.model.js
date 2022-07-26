export default (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        AutoIncrement: true,
        comment: '주 식별자',
      },
      account: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '계정 이름',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '123456',
      },
    },
    { sequelize, tableName: 'Users', timestamps: true, charset: 'utf8', collation: 'utf8_general_ci' }
  );
