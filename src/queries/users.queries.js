import db from '../models/mysql/index.js';

export const selectUserByAccount = (account, t) =>
  db.sequelize.query(`SELECT * FROM Users WHERE account='${account}'`, {
    type: db.QueryTypes.SELECT,
    raw: true,
    transaction: t,
  });

export const insertUser = (account, name, t) =>
  db.sequelize.query(`INSERT INTO Users(account, name) VALUES('${account}', '${name}')`, {
    type: db.QueryTypes.INSERT,
    raw: true,
    transaction: t,
  });

export const findUserByPk = async (id, t) => db.Users.findByPk(id, { transaction: t });
