import db from '../models/mysql/index.js';

export const selectUserByAccount = (account, t) =>
  db.sequelize.query(`SELECT * FROM Users WHERE account='${account}'`, {
    type: db.QueryTypes.SELECT,
    raw: true,
    transaction: t,
  });

export const insertUser = (account, name, password, t) =>
  db.Users.create({ account, name, password }, { transaction: t });

export const findUserByPk = async (id, t) => db.Users.findByPk(id, { transaction: t });

export const findUserByAccount = (account, t) => db.Users.findOne({ where: { account } });
